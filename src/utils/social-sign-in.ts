import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import type { AuthProvider } from '../types';

// iOS reads its client ID from GoogleService-Info.plist; the web client ID is the token audience the backend accepts.
const LOGIN_CONFIG = { webClientId: Config.GOOGLE_WEB_CLIENT_ID };
GoogleSignin.configure(LOGIN_CONFIG);
const GMAIL_SCOPE = 'https://www.googleapis.com/auth/gmail.readonly';

export type ProviderToken = { provider: AuthProvider; idToken: string; nonce?: string; name?: string };

// The native Google sheet. Only the ID token is kept; the SDK session is dropped so the next sign-in can pick another account.
async function google(): Promise<ProviderToken | null> {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    if (!isSuccessResponse(response) || !response.data.idToken) return null;
    const token = { provider: 'google' as const, idToken: response.data.idToken, name: response.data.user.name ?? undefined };
    await GoogleSignin.signOut().catch(() => undefined);
    return token;
  } catch (caught) {
    if (isErrorWithCode(caught) && (caught.code === statusCodes.SIGN_IN_CANCELLED || caught.code === statusCodes.IN_PROGRESS)) return null;
    throw caught;
  }
}

// Sign in with Apple: the library sends Apple sha256(nonce) and returns the raw nonce the backend checks.
// Apple shares the name only on the first sign-in; later sign-ins send none.
async function apple(): Promise<ProviderToken | null> {
  try {
    const response = await appleAuth.performRequest({ requestedOperation: appleAuth.Operation.LOGIN, requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL] });
    if (!response.identityToken) return null;
    const name = [response.fullName?.givenName, response.fullName?.familyName].filter(Boolean).join(' ');
    return { provider: 'apple', idToken: response.identityToken, nonce: response.nonce, name: name || undefined };
  } catch (caught) {
    if ((caught as { code?: string }).code === appleAuth.Error.CANCELED) return null;
    throw caught;
  }
}

// null when the person closes the provider sheet: they stay on the screen they started from.
export function providerSignIn(provider: AuthProvider) {
  return provider === 'google' ? google() : apple();
}

export type GmailGrant = { idToken: string; serverAuthCode: string };

// Sign in with Google and grant read-only Gmail. The backend exchanges the one-time code (web client) for the inbox.
// Only this flow asks for Gmail; plain sign-in keeps the login-only configuration. null when the sheet is closed.
export async function gmailSignIn(): Promise<GmailGrant | null> {
  // forceCodeForRefreshToken makes Google send a refresh token again for an inbox that granted access before.
  GoogleSignin.configure({ ...LOGIN_CONFIG, scopes: [GMAIL_SCOPE], offlineAccess: true, forceCodeForRefreshToken: true });
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    if (!isSuccessResponse(response) || !response.data.idToken) return null;
    // A missing code means Gmail access was not granted; the backend says so for the empty code.
    return { idToken: response.data.idToken, serverAuthCode: response.data.serverAuthCode ?? '' };
  } catch (caught) {
    if (isErrorWithCode(caught) && (caught.code === statusCodes.SIGN_IN_CANCELLED || caught.code === statusCodes.IN_PROGRESS)) return null;
    throw caught;
  } finally {
    await GoogleSignin.signOut().catch(() => undefined);
    GoogleSignin.configure(LOGIN_CONFIG);
  }
}

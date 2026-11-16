import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';
import { authorize } from 'react-native-app-auth';
import Config from 'react-native-config';

// iOS reads its client ID from GoogleService-Info.plist; the web client ID is the token audience the backend accepts.
const LOGIN_CONFIG = { webClientId: Config.GOOGLE_WEB_CLIENT_ID };
GoogleSignin.configure(LOGIN_CONFIG);
const GMAIL_SCOPE = 'https://www.googleapis.com/auth/gmail.readonly';

export type ProviderToken = { provider: 'google' | 'apple'; idToken: string; nonce?: string; name?: string; authorizationCode?: string };

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
    // authorizationCode lets the backend revoke the Apple grant when the account is deleted (guideline 5.1.1(v)).
    return { provider: 'apple', idToken: response.identityToken, nonce: response.nonce, name: name || undefined, authorizationCode: response.authorizationCode ?? undefined };
  } catch (caught) {
    if ((caught as { code?: string }).code === appleAuth.Error.CANCELED) return null;
    throw caught;
  }
}

// null when the person closes the provider sheet: they stay on the screen they started from.
export function providerSignIn(provider: 'google' | 'apple') {
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

export type OutlookGrant = { code: string; codeVerifier: string; redirectUri: string };

// Microsoft public client (no secret). The phone only gets the code: the backend exchanges it and keeps the refresh token.
const OUTLOOK_REDIRECT_URI = 'com.renewless://oauth/outlook';
const OUTLOOK_CONFIG = {
  issuer: 'https://login.microsoftonline.com/common/v2.0',
  clientId: '571797b5-9598-4c70-998e-861cee8203bc',
  redirectUrl: OUTLOOK_REDIRECT_URI,
  scopes: ['openid', 'email', 'offline_access', 'https://graph.microsoft.com/Mail.Read', 'https://graph.microsoft.com/User.Read'],
  usePKCE: true,
  skipCodeExchange: true,
  additionalParameters: { prompt: 'select_account' as const },
  serviceConfiguration: {
    authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  },
};

// The Microsoft sheet for an Outlook, Hotmail or Live inbox. null when the person closes it (like a cancelled Google sign-in).
export async function outlookSignIn(): Promise<OutlookGrant | null> {
  try {
    const result = await authorize(OUTLOOK_CONFIG);
    if (!result.authorizationCode || !result.codeVerifier) return null;
    return { code: result.authorizationCode, codeVerifier: result.codeVerifier, redirectUri: OUTLOOK_REDIRECT_URI };
  } catch (caught) {
    if (isOutlookCancel(caught)) return null;
    throw caught;
  }
}

// iOS reports a closed sheet as a user-cancel error; Android as "User cancelled flow".
function isOutlookCancel(caught: unknown) {
  const { code = '', message = '' } = (caught ?? {}) as { code?: string; message?: string };
  return /cancel/i.test(code) || /cancel/i.test(message);
}

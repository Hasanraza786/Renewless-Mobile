import { useEffect, useState } from 'react';
import { goBack } from '../../navigation/service';
import { updateProfile } from '../../redux/actions/profile-action';
import { selectUser, setProfileError } from '../../redux/slices/profile-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { Gender } from '../../types';
import { localToday } from '../../utils/dates';
import { joinPhone, splitPhone } from '../../utils/phone';

export const GENDER_OPTIONS = ['Not set', 'Female', 'Male', 'Other'] as const;
type GenderOption = (typeof GENDER_OPTIONS)[number];
const GENDER_VALUE: Record<GenderOption, Gender | null> = { 'Not set': null, Female: 'female', Male: 'male', Other: 'other' };
const genderOption = (gender: Gender | null): GenderOption => GENDER_OPTIONS.find(option => GENDER_VALUE[option] === gender) ?? 'Not set';

// Name is required; phone, date of birth and gender are optional and never block saving.
export default function useEditProfile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const saving = useAppSelector(state => state.profile.loading);
  const request_error = useAppSelector(state => state.profile.error);
  const saved_phone = splitPhone(user?.phone ?? '');
  const [form_data, setFormData] = useState({
    name: user?.name ?? '',
    // Country (ISO code) and national number; saved together as "+<dial> <number>".
    phone_country: saved_phone.country,
    phone: saved_phone.national,
    date_of_birth: user?.dateOfBirth ?? null,
    gender: genderOption(user?.gender ?? null),
  });
  const [errors, setErrors] = useState<{ name?: string; date_of_birth?: string }>({});
  const today = localToday();

  // A stale save error from an earlier visit never shows on a fresh form.
  useEffect(() => {
    dispatch(setProfileError(''));
  }, [dispatch]);

  const update = <Key extends keyof typeof form_data>(key: Key, value: (typeof form_data)[Key]) => {
    setFormData(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined }));
  };

  const onSubmit = () => {
    const name = form_data.name.trim();
    const next = {
      name: name ? undefined : 'Enter your name.',
      date_of_birth: form_data.date_of_birth && form_data.date_of_birth > today ? 'Choose a date in the past.' : undefined,
    };
    setErrors(next);
    if (next.name || next.date_of_birth) return;
    dispatch(updateProfile({ name, phone: joinPhone(form_data.phone_country, form_data.phone), dateOfBirth: form_data.date_of_birth, gender: GENDER_VALUE[form_data.gender] }, goBack));
  };

  return { user, form_data, update, errors, today, saving, request_error, onSubmit };
}

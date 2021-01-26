import React, { ReactNode } from 'react';

export const validationTexts = {
  mixedRequired: 'Required field',
  mixedDefault: 'Default field',
  stringEmail: 'Incorrect email address',
  stringUrl: 'Incorrect address',
};

export const errorsTexts = {
  general: 'Something went wrong',
  duplicateEmail: 'This email is already in use, you can log in using this email',
  emailNotVerified({ resendBtn }: { resendBtn: ReactNode }): ReactNode {
    return (
      <>
        {"Please, verify your email. If you don't have verification email you can"} {resendBtn} {'it.'}
      </>
    );
  },
  resendBtn: 'resend',
};

export const signInFormTexts = {
  email: 'Email',
  emailPlaceholder: 'Enter email',
  password: 'Password',
  passwordPlaceholder: 'Enter password',
  signInBtn: 'Sign In',
  signUp({ link }: { link: ReactNode }): ReactNode {
    return (
      <>
        {"Don't have an account yet?"} {link} {'to sign up.'}
      </>
    );
  },
  singUpLink: 'Click here',
  verifyEmailSuccess: 'Email was successfully verified',
};

export const signUpFormTexts = {
  firstName: 'First name',
  firstNamePlaceholder: 'Enter first name',
  lastName: 'Last name',
  lastNamePlaceholder: 'Enter last name',
  email: 'Email',
  emailPlaceholder: 'Enter email',
  password: 'Password',
  passwordPlaceholder: 'Enter password',
  signUpBtn: 'Sign Up',
  verifyEmail: 'Please, verify your email address',
  verifyEmailLink: 'Verify email link',
};

export const resendVerifyEmailTexts = {
  email: 'Email',
  emailPlaceholder: 'Enter email',
  resendBtn: 'Resend email',
};

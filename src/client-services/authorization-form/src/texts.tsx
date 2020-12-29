import React, { ReactNode } from 'react';

export const validationTexts = {
  mixedRequired: 'Required field',
  mixedDefault: 'Default field',
  stringEmail: 'Incorrect email address',
  stringUrl: 'Incorrect address',
};

export const errorsTexts = {
  general: 'Something went wrong',
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
};

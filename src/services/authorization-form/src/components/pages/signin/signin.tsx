import React, { ReactElement, ReactNode } from 'react';
import { Formik } from 'formik';

import { SignInStoreProvider, useSignInStore } from 'providers';
import { SignInStore } from 'stores';

export function SignIn(): ReactElement {
  const signInStore = useSignInStore();

  function renderForm(): ReactNode {}

  return (
    <div>
      <Formik initialValues={signInStore.formikValues}>{renderForm()}</Formik>
    </div>
  );
}

export function SignInPage(): ReactElement {
  return (
    <SignInStoreProvider value={new SignInStore()}>
      <SignIn />
    </SignInStoreProvider>
  );
}

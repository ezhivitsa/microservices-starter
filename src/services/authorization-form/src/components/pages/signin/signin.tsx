import React, { ReactElement, ReactNode } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';

import { FormikField, Input } from '@packages/ui';

import { SignInStoreProvider, useSignInStore } from 'providers';
import { SignInStore, FormikSignIn, FormikSignInFieldName } from 'stores';

import { validationSchema } from './validation';

export const SignIn = observer(
  (): ReactElement => {
    const signInStore = useSignInStore();

    async function handleSubmit(values: FormikSignIn, { setErrors }: FormikHelpers<FormikSignIn>): Promise<void> {
      await signInStore.signIn(values);
      setErrors(signInStore.formikErrors);
    }

    function renderError(): ReactNode {
      const { generalError } = signInStore;
      if (!generalError) {
        return null;
      }
    }

    function renderForm(): ReactNode {
      return (
        <>
          {renderError()}
          <FormikField name={FormikSignInFieldName.Email} component={Input} componentProps={{ type: 'email' }} />
          <FormikField name={FormikSignInFieldName.Password} component={Input} componentProps={{ type: 'password' }} />
        </>
      );
    }

    return (
      <div>
        <Formik initialValues={signInStore.formikValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {renderForm}
        </Formik>
      </div>
    );
  },
);

export function SignInPage(): ReactElement {
  return (
    <SignInStoreProvider value={new SignInStore()}>
      <SignIn />
    </SignInStoreProvider>
  );
}

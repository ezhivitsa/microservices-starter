import React, { ReactElement, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import { Input, InputWidth, Button, ButtonView, ButtonType, Message, MessageType, Link, useStyles } from '@packages/ui';
import { FormikField, Formik, Form as FormikForm, FormikProps } from '@packages/ui-ex';
import { FrontPaths } from '@packages/common';

import { useSignUpStore, useCreateSignUpStore, SignUpStoreProvider } from 'providers';
import { FormikSignUp, FormikSignUpFieldName } from 'stores';

import { signUpFormTexts } from 'texts';
import { mapErrorToMessage } from 'errors';

import { Form } from 'components/common/form';

import { validationSchema } from './validation';

import styles from './signup.pcss';

export const SignUp = observer((): ReactElement => {
  const b = useStyles(styles, 'signup');
  const signUpStore = useSignUpStore();

  const { signupToken, isSignUpDone, generalErrorType } = signUpStore;

  async function handleSubmit(values: FormikSignUp): Promise<void> {
    await signUpStore.signUp(values);
  }

  function renderError(): ReactNode {
    if (!generalErrorType) {
      return null;
    }

    return <Message type={MessageType.Danger} header={mapErrorToMessage[generalErrorType]} />;
  }

  function renderVerifyEmailMessage(): ReactNode {
    if (!isSignUpDone) {
      return null;
    }

    const url = signupToken ? `${FrontPaths.Auth.verifyEmailPath({ fullPath: true, token: signupToken })}` : undefined;
    return (
      <Message
        type={MessageType.Warning}
        header={signUpFormTexts.verifyEmail}
        content={
          url ? (
            <Link href={url} target="_blank">
              {signUpFormTexts.verifyEmailLink}
            </Link>
          ) : undefined
        }
      />
    );
  }

  function renderForm({ isValid }: FormikProps<FormikSignUp>): ReactNode {
    return (
      <Form>
        <FormikForm>
          {renderError()}
          {renderVerifyEmailMessage()}
          <FormikField
            name={FormikSignUpFieldName.FirstName}
            component={Input}
            componentProps={{
              label: signUpFormTexts.firstName,
              placeholder: signUpFormTexts.firstNamePlaceholder,
              width: InputWidth.Available,
              className: b('input'),
            }}
          />
          <FormikField
            name={FormikSignUpFieldName.LastName}
            component={Input}
            componentProps={{
              label: signUpFormTexts.lastName,
              placeholder: signUpFormTexts.lastNamePlaceholder,
              width: InputWidth.Available,
              className: b('input'),
            }}
          />
          <FormikField
            name={FormikSignUpFieldName.Email}
            component={Input}
            componentProps={{
              label: signUpFormTexts.email,
              placeholder: signUpFormTexts.emailPlaceholder,
              type: 'email',
              width: InputWidth.Available,
              className: b('input'),
            }}
          />
          <FormikField
            name={FormikSignUpFieldName.Password}
            component={Input}
            componentProps={{
              label: signUpFormTexts.password,
              placeholder: signUpFormTexts.passwordPlaceholder,
              type: 'password',
              width: InputWidth.Available,
              className: b('input'),
            }}
          />

          <Button view={ButtonView.Action} type={ButtonType.Submit} className={b('button')} disabled={!isValid}>
            {signUpFormTexts.signUpBtn}
          </Button>
        </FormikForm>
      </Form>
    );
  }

  return (
    <Formik initialValues={signUpStore.formikValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {renderForm}
    </Formik>
  );
});

export function SignUpPage(): ReactElement {
  return (
    <SignUpStoreProvider value={useCreateSignUpStore()}>
      <SignUp />
    </SignUpStoreProvider>
  );
}

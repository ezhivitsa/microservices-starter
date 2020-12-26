import React, { ReactElement, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, Form, FormikHelpers, FormikProps } from 'formik';

import {
  FormikField,
  Input,
  InputWidth,
  Button,
  ButtonView,
  ButtonType,
  Message,
  MessageType,
  useStyles,
} from '@packages/ui';

import { useSignUpStore, SignUpStoreProvider } from 'providers';
import { SignUpStore, FormikSignUp, FormikSignUpFieldName } from 'stores';

import { signUpFormTexts } from 'texts';

import { validationSchema } from './validation';

import styles from './signup.pcss';

export const SignUp = observer(
  (): ReactElement => {
    const b = useStyles(styles, 'signup');
    const signUpStore = useSignUpStore();

    async function handleSubmit(values: FormikSignUp, { setErrors }: FormikHelpers<FormikSignUp>): Promise<void> {
      await signUpStore.signUp(values);
      setErrors(signUpStore.formikErrors);
    }

    function renderError(): ReactNode {
      const { generalError } = signUpStore;
      if (!generalError) {
        return null;
      }

      return <Message type={MessageType.Danger} content={generalError} />;
    }

    function renderForm({ isValid }: FormikProps<FormikSignUp>): ReactNode {
      return (
        <Form>
          {renderError()}
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
        </Form>
      );
    }

    return (
      <div className={b()}>
        <Formik initialValues={signUpStore.formikValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {renderForm}
        </Formik>
      </div>
    );
  },
);

export function SignUpPage(): ReactElement {
  return (
    <SignUpStoreProvider value={new SignUpStore()}>
      <SignUp />
    </SignUpStoreProvider>
  );
}

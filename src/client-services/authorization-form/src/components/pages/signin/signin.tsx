import React, { ReactElement, ReactNode } from 'react';
import { Formik, FormikHelpers, FormikProps, Form } from 'formik';
import { observer } from 'mobx-react-lite';

import {
  Input,
  InputWidth,
  Button,
  ButtonView,
  ButtonType,
  Message,
  MessageType,
  Paragraph,
  useStyles,
} from '@packages/ui';
import { FormikField, RouterLink } from '@packages/ui-ex';

import { SignInStoreProvider, useSignInStore } from 'providers';
import { SignInStore, FormikSignIn, FormikSignInFieldName } from 'stores';

import { signInFormTexts } from 'texts';

import { signupPath } from 'components/pages/paths';

import { validationSchema } from './validation';

import styles from './signin.pcss';

export const SignIn = observer(
  (): ReactElement => {
    const b = useStyles(styles, 'signin');
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

      return <Message type={MessageType.Danger} content={generalError} />;
    }

    function renderForm({ isValid }: FormikProps<FormikSignIn>): ReactNode {
      return (
        <Form>
          {renderError()}
          <FormikField
            name={FormikSignInFieldName.Email}
            component={Input}
            componentProps={{
              label: signInFormTexts.email,
              placeholder: signInFormTexts.emailPlaceholder,
              type: 'email',
              width: InputWidth.Available,
              className: b('input'),
            }}
          />
          <FormikField
            name={FormikSignInFieldName.Password}
            component={Input}
            componentProps={{
              label: signInFormTexts.password,
              placeholder: signInFormTexts.passwordPlaceholder,
              type: 'password',
              width: InputWidth.Available,
              className: b('input'),
            }}
          />

          <Paragraph className={b('signup')}>
            {signInFormTexts.signUp({ link: <RouterLink to={signupPath} text={signInFormTexts.singUpLink} /> })}
          </Paragraph>

          <Button view={ButtonView.Action} type={ButtonType.Submit} className={b('button')} disabled={!isValid}>
            {signInFormTexts.signInBtn}
          </Button>
        </Form>
      );
    }

    return (
      <div className={b()}>
        <Formik
          initialValues={signInStore.formikValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={handleSubmit}
        >
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

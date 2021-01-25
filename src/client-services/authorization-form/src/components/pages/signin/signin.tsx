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
  Link,
  useStyles,
} from '@packages/ui';
import { FormikField, RouterLink } from '@packages/ui-ex';
import { DashboardPaths, AuthPaths, AuthorizationErrorType } from '@packages/common';

import { SignInStoreProvider, useSignInStore, useCreateSignInStore, useVerifyEmailStore } from 'providers';
import { FormikSignIn, FormikSignInFieldName } from 'stores';

import { signInFormTexts, errorsTexts } from 'texts';
import { mapErrorToMessage, mapVerifyErrorToMessage } from 'errors';

import { signupPath } from 'components/pages/paths';

import { validationSchema } from './validation';

import styles from './signin.pcss';

export const SignIn = observer(
  (): ReactElement => {
    const b = useStyles(styles, 'signin');
    const signInStore = useSignInStore();
    const verifyEmailStore = useVerifyEmailStore();

    const { generalErrorType } = signInStore;
    const { isVerifyDone } = verifyEmailStore;

    async function handleSubmit(values: FormikSignIn, { setErrors }: FormikHelpers<FormikSignIn>): Promise<void> {
      verifyEmailStore.dispose();
      await signInStore.signIn(values);

      if (signInStore.isSignedIn) {
        const params = new URLSearchParams(window.location.search);
        const returnUrl = params.get(AuthPaths.returnUrlParam);

        window.location.href = returnUrl ? returnUrl : DashboardPaths.indexPath({ fullPath: true });
      }
    }

    function handleResendClick(): void {}

    function renderVerifyEmailMessage(): ReactNode {
      if (!isVerifyDone) {
        return null;
      }

      return <Message type={MessageType.Success} header={signInFormTexts.verifyEmailSuccess} />;
    }

    function renderResetBrn(): ReactNode {
      return (
        <Link pseudo onClick={handleResendClick}>
          {errorsTexts.resendBtn}
        </Link>
      );
    }

    function renderError(): ReactNode {
      if (!generalErrorType) {
        return null;
      }

      const message =
        generalErrorType === AuthorizationErrorType.EmailNotVerified
          ? mapVerifyErrorToMessage({ resendBtn: renderResetBrn() })
          : mapErrorToMessage[generalErrorType];

      console.log(generalErrorType);

      return <Message type={MessageType.Danger} header={message} />;
    }

    function renderForm({ isValid }: FormikProps<FormikSignIn>): ReactNode {
      return (
        <Form>
          {renderVerifyEmailMessage()}
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
    <SignInStoreProvider value={useCreateSignInStore()}>
      <SignIn />
    </SignInStoreProvider>
  );
}

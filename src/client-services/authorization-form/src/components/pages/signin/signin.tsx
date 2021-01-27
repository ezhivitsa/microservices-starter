import React, { ReactElement, ReactNode } from 'react';
import { Formik, FormikProps, Form as FormikForm } from 'formik';
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
import { FrontPaths, Errors } from '@packages/common';

import {
  SignInStoreProvider,
  useSignInStore,
  useCreateSignInStore,
  useVerifyEmailStore,
  useResendVerifyEmailStore,
} from 'providers';
import { FormikSignIn, FormikSignInFieldName } from 'stores';

import { signInFormTexts, errorsTexts } from 'texts';
import { mapErrorToMessage, mapVerifyErrorToMessage } from 'errors';

import { Form } from 'components/common/form';

import { signupPath, resendVerifyEmailPath } from 'components/pages/paths';

import { validationSchema } from './validation';

import styles from './signin.pcss';

export const SignIn = observer(
  (): ReactElement => {
    const b = useStyles(styles, 'signin');
    const signInStore = useSignInStore();
    const verifyEmailStore = useVerifyEmailStore();
    const resendVerifyEmailStore = useResendVerifyEmailStore();

    const { generalErrorType } = signInStore;
    const { isVerifyDone } = verifyEmailStore;

    async function handleSubmit(values: FormikSignIn): Promise<void> {
      verifyEmailStore.dispose();
      await signInStore.signIn(values);

      if (signInStore.isSignedIn) {
        const params = new URLSearchParams(window.location.search);
        const returnUrl = params.get(FrontPaths.Auth.returnUrlParam);

        window.location.href = returnUrl ? returnUrl : FrontPaths.Dashboard.indexPath({ fullPath: true });
      }
    }

    function handleResendClick(email: string): void {
      resendVerifyEmailStore.setEmail(email);
    }

    function renderVerifyEmailMessage(): ReactNode {
      if (!isVerifyDone) {
        return null;
      }

      return <Message type={MessageType.Success} header={signInFormTexts.verifyEmailSuccess} />;
    }

    function renderResetBtn(values: FormikSignIn): ReactNode {
      return (
        <RouterLink to={resendVerifyEmailPath} onClick={() => handleResendClick(values.email)}>
          {errorsTexts.resendBtn}
        </RouterLink>
      );
    }

    function renderError(values: FormikSignIn): ReactNode {
      if (!generalErrorType) {
        return null;
      }

      const message =
        generalErrorType === Errors.AuthorizationErrorType.EmailNotVerified
          ? mapVerifyErrorToMessage({ resendBtn: renderResetBtn(values) })
          : mapErrorToMessage[generalErrorType];

      return <Message type={MessageType.Danger} header={message} />;
    }

    function renderForm({ isValid, values }: FormikProps<FormikSignIn>): ReactNode {
      return (
        <Form>
          <FormikForm>
            {renderVerifyEmailMessage()}
            {renderError(values)}
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
          </FormikForm>
        </Form>
      );
    }

    return (
      <Formik
        initialValues={signInStore.formikValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={handleSubmit}
      >
        {renderForm}
      </Formik>
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

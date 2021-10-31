import React, { ReactElement, ReactNode, useEffect } from 'react';

import { Input, InputWidth, Button, ButtonType, ButtonView, useStyles } from '@packages/ui';
import { FormikField, Formik, Form as FormikForm, FormikProps } from '@packages/ui-ex';

import { FormikResendVerifyEmail, FormikResendVerifyEmailFieldName } from 'stores';
import { useResendVerifyEmailStore } from 'providers';

import { Form } from 'components/common/form';

import { resendVerifyEmailTexts } from 'texts';

import { validationSchema } from './validation';
import styles from './resend-verify-email.pcss';

export function ResendVerifyEmailPage(): ReactElement {
  const resendVerifyEmailStore = useResendVerifyEmailStore();
  const b = useStyles(styles, 'resend-verify-email');

  const { initialValues, isSending } = resendVerifyEmailStore;

  useEffect(() => {
    return () => {
      resendVerifyEmailStore.dispose();
    };
  }, []);

  function handleResend(values: FormikResendVerifyEmail): void {
    resendVerifyEmailStore.resend(values.email);
  }

  function renderForm({ isValid }: FormikProps<FormikResendVerifyEmail>): ReactNode {
    return (
      <Form>
        <FormikForm>
          <FormikField
            name={FormikResendVerifyEmailFieldName.Email}
            component={Input}
            componentProps={{
              label: resendVerifyEmailTexts.email,
              placeholder: resendVerifyEmailTexts.emailPlaceholder,
              type: 'email',
              width: InputWidth.Available,
              className: b('input'),
            }}
          />

          <Button view={ButtonView.Action} type={ButtonType.Submit} disabled={!isValid || isSending}>
            {resendVerifyEmailTexts.resendBtn}
          </Button>
        </FormikForm>
      </Form>
    );
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleResend}>
      {renderForm}
    </Formik>
  );
}

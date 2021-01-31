import React, { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, Form as FormikForm, FormikProps } from 'formik';

import { Input, InputWidth, Button, ButtonView, ButtonType, useStyles } from '@packages/ui';
import { FormikField } from '@packages/ui-ex';

import { ForgotPasswordStoreProvider, useCreateForgotPasswordStore, useForgotPasswordStore } from 'providers';
import { FormikForgotPassword, FormikForgotPasswordFieldName } from 'stores';

import { Form } from 'components/common/form';

import { forgotPasswordTexts } from 'texts';

import { validationSchema } from './validation';
import styles from './forgot-password.pcss';

const ForgotPassword = observer(
  (): ReactElement => {
    const forgotPasswordStore = useForgotPasswordStore();
    const b = useStyles(styles, 'forgot-password');

    const { isSending } = forgotPasswordStore;

    function handleSubmit(values: FormikForgotPassword): void {
      forgotPasswordStore.sendEmail(values);
    }

    function renderForm({ isValid }: FormikProps<FormikForgotPassword>): ReactElement {
      return (
        <Form>
          <FormikForm>
            <FormikField
              name={FormikForgotPasswordFieldName.Email}
              component={Input}
              componentProps={{
                label: forgotPasswordTexts.email,
                placeholder: forgotPasswordTexts.emailPlaceholder,
                type: 'email',
                width: InputWidth.Available,
                className: b('input'),
              }}
            />

            <Button view={ButtonView.Action} type={ButtonType.Submit} disabled={!isValid || isSending}>
              {forgotPasswordTexts.sendBtn}
            </Button>
          </FormikForm>
        </Form>
      );
    }

    return (
      <Formik initialValues={{ email: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {renderForm}
      </Formik>
    );
  },
);

export function ForgotPasswordPage(): ReactElement {
  return (
    <ForgotPasswordStoreProvider value={useCreateForgotPasswordStore()}>
      <ForgotPassword />
    </ForgotPasswordStoreProvider>
  );
}

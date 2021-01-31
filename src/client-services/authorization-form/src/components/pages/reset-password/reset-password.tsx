import React, { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, Form as FormikForm, FormikProps } from 'formik';
import { useParams } from 'react-router-dom';

import { Input, InputWidth, Button, ButtonView, ButtonType, useStyles } from '@packages/ui';
import { FormikField } from '@packages/ui-ex';

import { ResetPasswordStoreProvider, useCreateResetPasswordStore, useResetPasswordStore } from 'providers';
import { FormikResetPassword, FormikResetPasswordFieldName } from 'stores';

import { Form } from 'components/common/form';

import { ResetPasswordParams } from 'components/pages/path-templates';

import { resetPasswordTexts } from 'texts';

import { validationSchema } from './validation';
import styles from './reset-password.pcss';

const ResetPassword = observer(
  (): ReactElement => {
    const resetPasswordStore = useResetPasswordStore();
    const b = useStyles(styles, 'reset-password');
    const { token } = useParams<ResetPasswordParams>();

    const { isResetting } = resetPasswordStore;

    function handleResetPassword(values: FormikResetPassword): void {
      resetPasswordStore.reset(token, values);
    }

    function renderForm({ isValid }: FormikProps<FormikResetPassword>): ReactElement {
      return (
        <Form>
          <FormikForm>
            <FormikField
              name={FormikResetPasswordFieldName.Password}
              component={Input}
              componentProps={{
                label: resetPasswordTexts.password,
                placeholder: resetPasswordTexts.passwordPlaceholder,
                type: 'password',
                width: InputWidth.Available,
                className: b('input'),
              }}
            />

            <Button view={ButtonView.Action} type={ButtonType.Submit} disabled={!isValid || isResetting}>
              {resetPasswordTexts.resetBtn}
            </Button>
          </FormikForm>
        </Form>
      );
    }

    return (
      <Formik initialValues={{ password: '' }} validationSchema={validationSchema} onSubmit={handleResetPassword}>
        {renderForm}
      </Formik>
    );
  },
);

export function ResetPasswordPage(): ReactElement {
  return (
    <ResetPasswordStoreProvider value={useCreateResetPasswordStore()}>
      <ResetPassword />
    </ResetPasswordStoreProvider>
  );
}

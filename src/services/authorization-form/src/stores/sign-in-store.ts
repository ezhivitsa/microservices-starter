import { observable, computed } from 'mobx';

export enum FormikSignInFieldName {
  Email = 'email',
  Password = 'password',
}

export interface FormikSignIn {
  [FormikSignInFieldName.Email]: string;
  [FormikSignInFieldName.Password]: string;
}

export class SignInStore {
  @observable private _email = '';
  @observable private _password = '';

  @computed
  get formikValues(): FormikSignIn {
    return {
      email: this._email,
      password: this._password,
    };
  }
}

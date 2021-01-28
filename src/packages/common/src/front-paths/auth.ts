export const prefix = 'auth';
export const returnUrlParam = 'return-url';

export const indexPath = ({ fullPath }: { fullPath?: boolean } = {}): string => (fullPath ? `/${prefix}` : '/');

export const signupPath = ({ fullPath }: { fullPath?: boolean } = {}): string =>
  `${fullPath ? indexPath({ fullPath }) : ''}/signup`;

export const signinPath = ({ returnUrl, fullPath }: { returnUrl?: string; fullPath?: boolean } = {}): string => {
  const params = new URLSearchParams();
  if (returnUrl) {
    params.set(returnUrlParam, returnUrl);
  }

  const path = `${fullPath ? indexPath({ fullPath }) : ''}/signin`;
  const search = params.toString();

  return `${path}${search ? '?' : ''}${search}`;
};

export const verifyEmailPath = ({ token, fullPath }: { token: string; fullPath?: boolean }): string => {
  return `${fullPath ? indexPath({ fullPath }) : ''}/verify-email/${token}`;
};

export const resendVerifyEmailPath = ({ fullPath }: { fullPath?: boolean } = {}): string => {
  return `${fullPath ? indexPath({ fullPath }) : ''}/resend-verify-email`;
};

export const forgotPasswordPath = ({ fullPath }: { fullPath?: boolean } = {}): string => {
  return `${fullPath ? indexPath({ fullPath }) : ''}/forgot-password`;
};

export const resetPasswordPath = ({ token, fullPath }: { token: string; fullPath?: boolean }): string => {
  return `${fullPath ? indexPath({ fullPath }) : ''}/reset-password/${token}`;
};

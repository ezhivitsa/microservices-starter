export const authorizationPrefix = '/account';

export const signinPath = '/signin';
export const signupPath = '/signup';
export const verifyEmailPath = (token: string): string => `/verify-email/${token}`;

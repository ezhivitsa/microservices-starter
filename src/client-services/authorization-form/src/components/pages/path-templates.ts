import { FrontPaths } from '@packages/common';

const tokenPlaceholder = ':token';

export const verifyEmailPathTemplate = FrontPaths.Auth.verifyEmailPath({ token: tokenPlaceholder });

export interface VerifyEmailParams {
  token: string;
}

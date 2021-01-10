export const prefix = 'auth';

export const indexPath = (fullPath?: boolean): string => (fullPath ? `/${prefix}` : '/');
export const signupPath = (fullPath?: boolean): string => `${fullPath ? indexPath(fullPath) : ''}/signup`;
export const signinPath = (fullPath?: boolean): string => `${fullPath ? indexPath(fullPath) : ''}/signin`;

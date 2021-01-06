export const prefix = 'dashboard';

export const indexPath = (fullPath?: boolean): string => (fullPath ? `/${prefix}` : '/');

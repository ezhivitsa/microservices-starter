export const prefix = 'settings';

export const indexPath = (fullPath?: boolean): string => (fullPath ? `/${prefix}` : '/');
export const profilePath = (fullPath?: boolean): string => `${indexPath(fullPath)}/profile`;

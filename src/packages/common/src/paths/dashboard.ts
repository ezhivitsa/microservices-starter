export const prefix = 'dashboard';

export const indexPath = ({ fullPath }: { fullPath?: boolean } = {}): string => (fullPath ? `/${prefix}` : '/');

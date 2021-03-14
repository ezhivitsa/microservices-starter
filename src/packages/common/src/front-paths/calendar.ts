export const prefix = 'calendar';

export const indexPath = ({ fullPath }: { fullPath?: boolean } = {}): string => (fullPath ? `/${prefix}` : '/');

export const prefix = 'settings';

export const indexPath = ({ fullPath }: { fullPath?: boolean } = {}): string => (fullPath ? `/${prefix}` : '/');

export const profilePath = ({ fullPath }: { fullPath?: boolean } = {}): string =>
  `${fullPath ? indexPath({ fullPath }) : ''}/profile`;

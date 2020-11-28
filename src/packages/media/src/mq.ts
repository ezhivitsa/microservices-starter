import { Media } from './types';

export const mediaQueries: Record<Media, string> = {
  [Media.MobileS]: '(min-width: 320px)',
  [Media.MobileM]: '(min-width: 375px)',
  [Media.MobileL]: '(min-width: 412px)',
  [Media.Mobile]: '(max-width: 599px)',
  [Media.TabletS]: '(min-width: 600px)',
  [Media.TabletM]: '(min-width: 768px)',
  [Media.Tablet]: '(min-width: 600px) and (max-width: 1023px)',
  [Media.DesktopS]: '(min-width: 1024px)',
  [Media.DesktopM]: '(min-width: 1280px)',
  [Media.DesktopL]: '(min-width: 1440px)',
  [Media.DesktopXL]: '(min-width: 1920px)',
  [Media.Desktop]: '(min-width: 1024px)',
};

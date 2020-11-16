import { Media } from './types';

export const mediaQueries: Record<Media, string> = {
  [Media.Small]: 'screen',
  [Media.SmallOnly]: 'screen and (max-width: 47.9375em)',
  [Media.Medium]: 'screen and (min-width: 48em)',
  [Media.MediumOnly]: 'screen and (min-width: 48em) and (max-width: 64em)',
  [Media.Large]: 'screen and (min-width: 64.0625em)',
  [Media.LargeOnly]: 'screen and (min-width: 64.0625em) and (max-width: 90em)',
  [Media.XLarge]: 'screen and (min-width: 90.0625em)',
  [Media.XLargeOnly]: 'screen and (min-width: 90.0625em) and (max-width: 120em)',
  [Media.XXLarge]: 'screen and (min-width: 120.0625em)',
  [Media.XXLargeOnly]: 'screen and (min-width: 120.0625em) and (max-width: 99999999em)',
};

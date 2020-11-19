import { lib, ClassNameGenerator } from '@packages/client';

import { useTheme } from './context';

export function useStyles(styles: Record<string, string>, className: string): ClassNameGenerator {
  const [theme] = useTheme();

  return lib.block(styles, className, theme);
}

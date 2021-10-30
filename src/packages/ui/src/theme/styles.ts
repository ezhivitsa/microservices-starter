import { lib, ClassNameGenerator } from '@packages/client';

import { useTheme } from './context';

export function useStyles(
  styles: Record<string, string>,
  className: string,
  additionalClassName?: string,
): ClassNameGenerator {
  const [theme] = useTheme();

  return lib.block(styles, className, theme, additionalClassName);
}

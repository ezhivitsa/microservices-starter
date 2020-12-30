import React, { ReactElement } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Location } from 'history';

import { Link, LinkProps } from '@packages/ui';

interface Props extends Omit<LinkProps, 'url' | 'component' | 'componentProps'> {
  to: Location | string;
  replace?: boolean;
}

export function RouterLink({ to, replace, ...restProps }: Props): ReactElement {
  return (
    <Link
      {...restProps}
      component={ReactRouterLink}
      componentProps={{
        to,
        replace,
      }}
    />
  );
}

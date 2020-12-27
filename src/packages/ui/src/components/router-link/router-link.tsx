import React, { ReactElement } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Location, createPath } from 'history';

import { Link, LinkProps } from '../link';

interface Props extends Omit<LinkProps, 'url'> {
  to: Location | string;
  replace?: boolean;
}

export function RouterLink({ to, replace, ...restProps }: Props): ReactElement {
  return (
    <ReactRouterLink
      to={to}
      replace={replace}
      {...{
        url: typeof to === 'string' ? to : createPath(to),
        ...restProps,
      }}
      component={Link}
    />
  );
}

import React, { ReactElement } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Select } from '@packages/ui';

import { config } from 'lib/config';

import { formatComponentPath } from 'components/pages/paths';

interface Params {
  component: string;
}

export function MobileNavigation(): ReactElement {
  const { component } = useParams<Params>();
  const history = useHistory();

  function handleComponentChange(value: string): void {
    history.push(formatComponentPath(value));
  }

  return (
    <div>
      <Select
        value={component}
        items={config.components.map((c) => ({ text: c, value: c }))}
        onChange={handleComponentChange}
      />
    </div>
  );
}

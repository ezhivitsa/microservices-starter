import React, { ReactElement } from 'react';

import { configElementId } from 'common/constants';
import { ClientConfig } from 'common/general-types';

interface Props {
  config: ClientConfig;
}

export function ConfigView(props: Props): ReactElement<Props> {
  return (
    <script
      type="application/json"
      id={configElementId}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(props.config) }}
    />
  );
}

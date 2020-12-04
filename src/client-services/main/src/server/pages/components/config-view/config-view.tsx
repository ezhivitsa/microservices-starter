import React, { ReactElement } from 'react';

import { Types, Constants } from '@packages/common';

interface Props {
  config: Types.SerializableClientConfig;
}

export function ConfigView(props: Props): ReactElement<Props> {
  return (
    <script
      type="application/json"
      id={Constants.configId}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(props.config) }}
    />
  );
}

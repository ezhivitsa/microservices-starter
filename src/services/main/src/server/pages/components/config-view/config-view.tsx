import React, { ReactElement } from 'react';

import { SerializableClientConfig } from 'common/general-types';

interface Props {
  config: SerializableClientConfig;
}

export function ConfigView(props: Props): ReactElement<Props> {
  return (
    <script
      type="application/json"
      className="config-view"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(props.config) }}
    />
  );
}

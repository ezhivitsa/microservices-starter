import React, { ReactElement } from 'react';

import { SerializableClientConfig } from 'common/general-types';

interface Props {
  config: SerializableClientConfig;
}

export function ImportMap({ config }: Props): ReactElement {
  const imports: Record<string, string> = Object.values(config.frontUpstreams).reduce<Record<string, string>>(
    (result, upstream) => {
      result[upstream.name] = upstream.url;
      return result;
    },
    {},
  );
  const importMap = {
    imports,
  };

  return <script type="systemjs-importmap" dangerouslySetInnerHTML={{ __html: JSON.stringify(importMap) }} />;
}

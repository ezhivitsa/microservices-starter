import React, { ReactElement } from 'react';

import { Types } from '@packages/common';

interface Props {
  config: Types.SerializableClientConfig;
}

export function ImportMap({ config }: Props): ReactElement {
  const imports: Record<string, string> = Object.values(config.frontUpstreams).reduce<Record<string, string>>(
    (result, upstream) => {
      result[upstream.name] = upstream.jsUrl;
      return result;
    },
    {},
  );
  const importMap = {
    imports,
  };

  return <script type="systemjs-importmap" dangerouslySetInnerHTML={{ __html: JSON.stringify(importMap) }} />;
}

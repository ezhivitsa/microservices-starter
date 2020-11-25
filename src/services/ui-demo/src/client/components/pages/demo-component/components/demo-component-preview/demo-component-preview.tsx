import React, { ReactElement, Suspense } from 'react';

import { Spinner } from '@packages/ui';
import { lib } from '@packages/client';

import { Extension } from 'common/component-types';

import styles from './demo-component-preview.pcss';

interface Props {
  name: string;
  extension: Extension;
}

const b = lib.block(styles, 'demo-component-preview');

export function DemoComponentPreview({ name, extension }: Props): ReactElement {
  const LoadableComponent = React.lazy(() => import(`@packages/ui/components/${name}/demo.${extension}`));

  return (
    <Suspense fallback={<Spinner />}>
      <LoadableComponent b={b} />
    </Suspense>
  );
}

import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { GetComponentResponse } from 'common/component-types';

import { ComponentsService } from 'services';

import { DemoComponentCode } from './components/demo-component-code';

interface Match {
  component: string;
}

export function DemoComponentPage(): ReactElement {
  const { component } = useParams<Match>();

  const [isLoading, setIsLoading] = useState(true);
  const [componentMeta, setComponentMeta] = useState<GetComponentResponse>();

  async function fetchComponentMeta(): Promise<void> {
    setIsLoading(true);

    try {
      const meta = await ComponentsService.getComponentMeta(component);
      setComponentMeta(meta);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchComponentMeta();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!componentMeta) {
    return <div />;
  }

  return (
    <div>
      <DemoComponentCode name={componentMeta.name} code={componentMeta.code} extension={componentMeta.extension} />
    </div>
  );
}

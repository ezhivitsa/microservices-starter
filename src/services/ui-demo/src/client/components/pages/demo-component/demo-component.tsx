import React, { ReactElement, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GetComponentResponse } from 'common/component-types';

import { ComponentsService } from 'services';

interface Match {
  component: string;
}

export function DemoComponentPage(props: RouteComponentProps<Match>): ReactElement {
  const { component } = props.match.params;

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

  return <div>{component}</div>;
}

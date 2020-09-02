import React, { ReactElement } from 'react';

interface Props {
  content: string;
}

export function ConfigView(props: Props): ReactElement<Props> {
  return (
    <script
      type="application/json"
      className="dashboard-config-view"
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
  );
}

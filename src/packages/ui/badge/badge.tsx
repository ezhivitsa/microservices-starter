import React, {ReactElement, ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

export function Badge(props: Props): ReactElement<Props> {
  return (
    <div>
      {props.children}
    </div>
  );
}
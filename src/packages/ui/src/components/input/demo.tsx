import React, { ReactElement } from 'react';

import { Input, InputSize } from '.';

const sizes = [InputSize.S, InputSize.M, InputSize.L, InputSize.XL];

export default function InputDemo(): ReactElement {
  return (
    <div>
      {sizes.map((size) => {
        return <Input key={size} size={size} />;
      })}
    </div>
  );
}

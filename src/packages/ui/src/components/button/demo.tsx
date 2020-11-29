import React, { ReactElement } from 'react';

import { ClassNameGenerator } from '@packages/client';

import { Button, ButtonSize, ButtonView } from '.';
import { Heading } from '../heading';

interface Props {
  b: ClassNameGenerator;
}

const sizes = [ButtonSize.S, ButtonSize.M, ButtonSize.L, ButtonSize.XL];

export default function InputDemo({ b }: Props): ReactElement {
  return (
    <div>
      <Heading>Buttons of different sizes</Heading>
      {sizes.map((size) => {
        return (
          <div className={b('row')} key={`${size}-default`}>
            <Button size={size} view={ButtonView.Action} text="Button text" />
          </div>
        );
      })}
    </div>
  );
}

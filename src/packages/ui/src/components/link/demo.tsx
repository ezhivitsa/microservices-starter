import React, { ReactElement } from 'react';

import { ClassNameGenerator } from '@packages/client';

import { Link, LinkSize } from '.';
import { Heading } from '../heading';

interface Props {
  b: ClassNameGenerator;
}

const sizes = [LinkSize.XS, LinkSize.S, LinkSize.M, LinkSize.L, LinkSize.XL];

export default function InputDemo({ b }: Props): ReactElement {
  return (
    <div>
      <Heading>Links of different sizes</Heading>
      {sizes.map((size) => {
        return (
          <div className={b('row')} key={`${size}-default`}>
            <Link size={size} text="Link" />
          </div>
        );
      })}
    </div>
  );
}

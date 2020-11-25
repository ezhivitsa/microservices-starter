import React, { ReactElement } from 'react';

import { ClassNameGenerator } from '@packages/client';

import { Input, InputSize, InputView } from '.';
import { Heading } from '../heading';

interface Props {
  b: ClassNameGenerator;
}

const sizes = [InputSize.S, InputSize.M, InputSize.L, InputSize.XL];

export default function InputDemo({ b }: Props): ReactElement {
  return (
    <div>
      <Heading>Default inputs of different sizes</Heading>
      {sizes.map((size) => {
        return (
          <div className={b('row')} key={`${size}-default`}>
            <Input size={size} label="Input label" placeholder="Type value" />
          </div>
        );
      })}

      <Heading>Filled inputs of different sizes</Heading>
      {sizes.map((size) => {
        return (
          <div className={b('row')} key={`${size}-filled`}>
            <Input view={InputView.Filled} size={size} label="Input label" placeholder="Type value" />
          </div>
        );
      })}

      <Heading>Default input without label</Heading>
      <Input placeholder="Type value" />

      <Heading>Filled inputs</Heading>
      <div className={b('row')}>
        <Input view={InputView.Filled} label="Input label" placeholder="Type value" />
      </div>

      <Heading>Filled disabled with label</Heading>
      <div>
        <Input view={InputView.Filled} label="Input label" placeholder="Type value" disabled />
      </div>

      <Heading>Filled disabled with value</Heading>
      <div>
        <Input view={InputView.Filled} label="Input label" placeholder="Type value" value="Data" disabled />
      </div>

      <Heading>Filled disabled without label</Heading>
      <div>
        <Input view={InputView.Filled} placeholder="Type value" disabled />
      </div>

      <Heading>input with clear button</Heading>
      <div>
        <Input
          label="label"
          placeholder="Type value"
          defaultValue="123"
          clear
          size={InputSize.S}
          view={InputView.Filled}
        />
      </div>
    </div>
  );
}

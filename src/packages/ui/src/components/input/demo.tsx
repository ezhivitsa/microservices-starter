import React, { ReactElement } from 'react';

import { Input, InputSize, InputView } from '.';
import { Heading } from '../heading';

const sizes = [InputSize.S, InputSize.M, InputSize.L, InputSize.XL];

export default function InputDemo(): ReactElement {
  return (
    <div>
      <Heading>Default inputs of different sizes</Heading>
      {sizes.map((size) => {
        return <Input key={`${size}-default`} size={size} label="Input label" placeholder="Type value" />;
      })}

      <Heading>Filled inputs of different sizes</Heading>
      {sizes.map((size) => {
        return (
          <Input
            key={`${size}-filled`}
            view={InputView.Filled}
            size={size}
            label="Input label"
            placeholder="Type value"
          />
        );
      })}

      <Heading>Default input without label</Heading>
      <Input placeholder="Type value" />

      <Heading>Filled inputs</Heading>
      <div>
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
    </div>
  );
}

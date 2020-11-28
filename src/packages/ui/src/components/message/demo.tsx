import React, { ReactElement } from 'react';

import { ClassNameGenerator } from '@packages/client';

import { Heading } from '../heading';
import { Message, MessageType } from '.';

interface Props {
  b: ClassNameGenerator;
}

const types = [MessageType.Default, MessageType.Success, MessageType.Warning, MessageType.Danger, MessageType.Critical];

export default function InputDemo({ b }: Props): ReactElement {
  return (
    <div>
      <Heading>Default Message</Heading>
      <Message
        type={MessageType.Default}
        header="Ordinary message"
        content="This is ordinary message to inform user about something"
      />

      <Heading>Messages with footer</Heading>
      {types.map((type) => {
        return (
          <div key={type} className={b('row')}>
            <Message
              type={type}
              header="Ordinary message"
              content="This is ordinary message to inform user about something"
              footer="Footer message"
            />
          </div>
        );
      })}
    </div>
  );
}

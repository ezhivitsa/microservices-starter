import React, { ReactElement } from 'react';

import { Message, MessageType } from '.';

export default function InputDemo(): ReactElement {
  return (
    <div>
      <Message
        type={MessageType.Default}
        header="Ordinary message"
        content="This is ordinary message to inform user about something"
      />
    </div>
  );
}

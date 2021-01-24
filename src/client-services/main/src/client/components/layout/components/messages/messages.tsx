import React, { ReactElement, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import { Message, MessageType, useStyles } from '@packages/ui';

import { useCurrentUserStore } from 'providers';

import { messageTexts } from 'texts';

import styles from './messages.pcss';

export const Messages = observer(
  (): ReactElement => {
    const currentUserStore = useCurrentUserStore();
    const b = useStyles(styles, 'messages');

    const { isLoading, isEmailVerified } = currentUserStore;

    function renderVerifyEmailMessage(): ReactNode {
      if (isLoading || isEmailVerified) {
        return null;
      }

      return <Message type={MessageType.Warning} header={messageTexts.verifyEmail} className={b('message')} />;
    }

    return <div>{renderVerifyEmailMessage()}</div>;
  },
);

import React, { ReactElement, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb,
  faCheckCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faExclamation,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { lib } from '@packages/client';

import styles from './message.pcss';

export enum MessageType {
  Default = 'default',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Critical = 'critical',
}

interface Props {
  type: MessageType;
  header?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
}

const mapMessageTypeToIcon: Record<MessageType, IconDefinition> = {
  [MessageType.Default]: faLightbulb,
  [MessageType.Success]: faCheckCircle,
  [MessageType.Warning]: faExclamationTriangle,
  [MessageType.Danger]: faExclamationCircle,
  [MessageType.Critical]: faExclamation,
};

const b = lib.block(styles, 'message');

export function Message({ type, header, content, footer }: Props): ReactElement {
  function renderIcon(): ReactNode {
    const icon = mapMessageTypeToIcon[type];

    return (
      <div className={b('iconWrap', { type })}>
        <FontAwesomeIcon icon={icon} />
      </div>
    );
  }

  return (
    <div className={b({ type })}>
      {renderIcon()}
      <div>
        <div className={b('header')}>{header}</div>

        <div className={b('content')}>{content}</div>

        <div className={b('footer')}>{footer}</div>
      </div>
    </div>
  );
}

Message.defaultProps = {
  type: MessageType.Default,
};

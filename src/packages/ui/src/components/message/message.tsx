import React, { ReactElement, ReactNode } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb,
  faCheckCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faExclamation,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { Heading, HeadingSize, HeadingView } from '../heading';
import { Paragraph } from '../paragraph';

import { useStyles } from '../../theme';

import styles from './message.pcss';

export enum MessageType {
  Default = 'default',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Critical = 'critical',
}

interface Props {
  className?: string;
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

export function Message({ type, header, content, footer, className }: Props): ReactElement {
  const b = useStyles(styles, 'message');

  function renderIcon(): ReactNode {
    const icon = mapMessageTypeToIcon[type];

    return (
      <div className={b('iconWrap', { type })}>
        <FontAwesomeIcon icon={icon} />
      </div>
    );
  }

  return (
    <div className={classnames(b({ type }), className)}>
      {renderIcon()}
      <div className={b('content-wrap')}>
        <Heading view={HeadingView.Condensed} size={HeadingSize.M} className={b('header', { type })}>
          {header}
        </Heading>

        {content && (
          <Paragraph muted className={b('content', { type, hasHeader: !!header })}>
            {content}
          </Paragraph>
        )}

        {footer && (
          <Paragraph muted className={b('footer', { type })}>
            {footer}
          </Paragraph>
        )}
      </div>
    </div>
  );
}

Message.defaultProps = {
  type: MessageType.Default,
};

import React, { ReactElement, ReactNode, MouseEvent, FocusEvent, useState } from 'react';

import { useStyles } from '../../theme';

import styles from './link.pcss';

export enum LinkIconPosition {
  Left = 'left',
  Right = 'right',
}

export enum LinkSize {
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

type LinkTarget = '_self' | '_blank' | '_parent' | '_top';

export interface LinkProps {
  icon?: ReactNode;
  iconPosition?: LinkIconPosition;
  text?: ReactNode;
  url?: string;
  download?: string | boolean;
  target?: LinkTarget;
  tabIndex?: number;
  disabled?: boolean;
  checked?: boolean;
  pseudo?: boolean;
  size?: LinkSize;
  children?: ReactNode;
  className?: string;
  id?: string;
  onClick?: (event?: MouseEvent<any>) => void;
  onFocus?: (event?: FocusEvent<any>) => void;
  onBlur?: (event?: FocusEvent<any>) => void;
  onMouseEnter?: (event?: MouseEvent<any>) => void;
  onMouseLeave?: (event?: MouseEvent<any>) => void;
  onDisabledClick?: (event?: MouseEvent<any>) => void;
}

export function Link({
  checked,
  disabled,
  iconPosition,
  download,
  children,
  icon,
  text,
  pseudo,
  size,
  id,
  tabIndex,
  url,
  target,
  onClick,
  onDisabledClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
}: LinkProps): ReactElement {
  const b = useStyles(styles, 'link');

  const [stateHovered, setHovered] = useState(false);
  const [stateFocused, setFocused] = useState(false);

  function handleClick(event: MouseEvent): void {
    if (pseudo) {
      event.preventDefault();
    }
    if (!disabled && onClick) {
      onClick(event);
    }
    if (disabled && onDisabledClick) {
      onDisabledClick(event);
    }
  }

  function handleFocus(event: FocusEvent): void {
    setFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  }

  function handleBlur(event: FocusEvent): void {
    setFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  }

  function handleMouseEnter(event: MouseEvent): void {
    setHovered(true);
    if (onMouseEnter) {
      onMouseEnter(event);
    }
  }

  function handleMouseLeave(event: MouseEvent): void {
    setHovered(false);
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  }

  const linkElement = checked || disabled ? 'span' : 'a';
  const linkProps: React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ClassAttributes<HTMLAnchorElement> = {
    download,
    className: b({
      disabled,
      checked,
      pseudo,
      size,
      focused: stateFocused,
      hovered: stateHovered,
      flex: Boolean(icon) && iconPosition === LinkIconPosition.Left,
    }),
    id,
    tabIndex,
    onClick: handleClick,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
  if (target === '_blank') {
    linkProps.rel = 'noreferrer noopener';
  }
  if (!checked && !disabled) {
    linkProps.href = url;
    linkProps.target = target;
  }
  const linkContent = [children];
  const iconTemplate = icon && (
    <span key="icon" className={b('icon', { left: iconPosition === LinkIconPosition.Left, disabled, checked })}>
      {icon}
    </span>
  );
  const textTemplate = text && (
    <span key="text" className={b('text-container')}>
      <span className={b('text', { pseudo, disabled, checked })}>{text}</span>
    </span>
  );
  if (iconPosition === LinkIconPosition.Left) {
    linkContent.push(iconTemplate, textTemplate);
  }
  if (iconPosition === LinkIconPosition.Right) {
    linkContent.push(textTemplate, iconTemplate);
  }

  return React.createElement(linkElement, linkProps, linkContent);
}

Link.defaultProps = {
  iconPosition: LinkIconPosition.Left,
  size: LinkSize.M,
  url: '#',
  tabIndex: 0,
  disabled: false,
  checked: false,
  pseudo: false,
};

import React, { ReactElement, ReactNode, MouseEvent, FocusEvent, KeyboardEvent, useState } from 'react';
import classnames from 'classnames';

import { useStyles } from '../../theme';
import { ENTER_KEY, SPACE_KEY } from '../../lib/keyboard';

import styles from './button.pcss';

export enum ButtonView {
  Default = 'default',
  Action = 'action',
  Extra = 'extra',
}

export enum ButtonType {
  Button = 'button',
  Reset = 'reset',
  Submit = 'submit',
}

export enum ButtonTag {
  Button = 'button',
  Span = 'span',
}

export enum ButtonWidth {
  Default = 'default',
  Available = 'available',
}

export enum ButtonSize {
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

export enum ButtonToggable {
  Check = 'check',
  Radio = 'radio',
}

interface Props {
  text?: ReactNode;
  icon?: ReactNode;
  rightAddons?: ReactNode;
  leftAddons?: ReactNode;
  view?: ButtonView;
  type?: ButtonType;
  tag?: ButtonTag;
  width?: ButtonWidth;
  size?: ButtonSize;
  disabled?: boolean;
  focused?: boolean;
  pseudo?: boolean;
  id?: string;
  formNoValidate?: boolean;
  name?: string;
  title?: string;
  tabIndex?: number;
  togglable?: ButtonToggable;
  checked?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?: (event?: MouseEvent<any>) => void;
  onFocus?: (event?: FocusEvent<any>) => void;
  onBlur?: (event?: FocusEvent<any>) => void;
  onMouseEnter?: (event?: MouseEvent<any>) => void;
  onMouseLeave?: (event?: MouseEvent<any>) => void;
  onMouseDown?: (event?: MouseEvent<any>) => void;
  onMouseUp?: (event?: MouseEvent<any>) => void;
  onMouseOut?: (event?: MouseEvent<any>) => void;
  onKeyDown?: (event?: KeyboardEvent<any>) => void;
  onKeyUp?: (event?: KeyboardEvent<any>) => void;
}

export function Button({
  disabled,
  tag,
  className,
  pseudo,
  view,
  size,
  width,
  togglable,
  checked,
  tabIndex,
  id,
  name,
  type,
  title,
  leftAddons,
  rightAddons,
  children,
  text,
  icon,
  ...props
}: Props): ReactElement {
  const b = useStyles(styles, 'button');

  const [stateFocused, setFocused] = useState(false);
  const [stateHovered, setHovered] = useState(false);
  const [statePressed, setPressed] = useState(false);

  if (disabled && (stateFocused || stateHovered)) {
    setHovered(false);
    setFocused(false);
  }

  function handleClick(event: MouseEvent): void {
    props.onClick?.(event);
  }

  function handleFocus(event: FocusEvent): void {
    if (statePressed) {
      return;
    }

    setFocused(true);

    props.onFocus?.(event);
  }

  function handleBlur(event: FocusEvent): void {
    setFocused(false);

    props.onBlur?.(event);
  }

  function handleMouseEnter(event: MouseEvent): void {
    if (!disabled) {
      setHovered(true);
    }

    props.onMouseEnter?.(event);
  }

  function handleMouseLeave(event: MouseEvent): void {
    if (!disabled) {
      setHovered(false);
    }

    props.onMouseLeave?.(event);
  }

  function handleMouseDown(event: MouseEvent): void {
    if (!disabled) {
      setPressed(true);
    }

    props.onMouseDown?.(event);
  }

  function handleMouseUp(event: MouseEvent): void {
    if (!disabled) {
      setPressed(false);
    }

    props.onMouseUp?.(event);
  }

  function handleMouseOut(event: MouseEvent): void {
    if (!disabled) {
      setPressed(false);
    }

    props.onMouseOut?.(event);
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if ((event.key === ENTER_KEY || event.key === SPACE_KEY) && !disabled) {
      setPressed(true);
    }

    props.onKeyDown?.(event);
  }

  function handleKeyUp(event: KeyboardEvent): void {
    if ((event.key === ENTER_KEY || event.key === SPACE_KEY) && !disabled) {
      setPressed(false);
    }

    props.onKeyUp?.(event);
  }

  const isButton = tag !== ButtonTag.Span;
  const focused = props.focused === undefined ? stateFocused : props.focused;

  const buttonProps = {
    role: 'button',
    id,
    name,
    type,
    title,
    tabIndex: disabled ? -1 : tabIndex,
    disabled,
    formNoValidate: isButton ? props.formNoValidate : undefined,
    className: classnames(
      b({
        disabled,
        pseudo,
        view,
        size,
        width,
        focused,
        hovered: stateHovered,
        pressed: statePressed,
        togglable,
        checked,
      }),
      className,
    ),
    onClick: handleClick,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseOut: handleMouseOut,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
  };

  const buttonContent = [
    leftAddons && (
      <span key="left-addons" className={b('addon')}>
        {leftAddons}
      </span>
    ),
    (children || text || icon) && (
      <span key="content" className={b('content')}>
        {icon && (
          <span key="icon" className={b('icon', { disabled, size })}>
            {icon}
          </span>
        )}
        {(children || text) && (
          <span key="text" className={b('text', { view })}>
            {children || text}
          </span>
        )}
      </span>
    ),
    rightAddons && (
      <span key="right-addons" className={b('addon')}>
        {rightAddons}
      </span>
    ),
  ];

  return isButton ? <button {...buttonProps}>{buttonContent}</button> : <span {...buttonProps}>{buttonContent}</span>;
}

Button.defaultProps = {
  type: ButtonType.Button,
  tag: ButtonTag.Button,
  size: ButtonSize.M,
  formNoValidate: false,
};

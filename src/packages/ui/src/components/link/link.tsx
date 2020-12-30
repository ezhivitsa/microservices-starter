import React, {
  ReactElement,
  ComponentClass,
  FC,
  AnchorHTMLAttributes,
  ClassAttributes,
  ReactNode,
  MouseEvent,
  FocusEvent,
  forwardRef,
  ForwardedRef,
  useState,
} from 'react';

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

export interface LinkProps<CP = any> {
  icon?: ReactNode;
  iconPosition?: LinkIconPosition;
  text?: ReactNode;
  href?: string;
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
  component?: FC<CP> | ComponentClass<FC>;
  componentProps?: CP;
  onClick?: (event?: MouseEvent) => void;
  onFocus?: (event?: FocusEvent) => void;
  onBlur?: (event?: FocusEvent) => void;
  onMouseEnter?: (event?: MouseEvent) => void;
  onMouseLeave?: (event?: MouseEvent) => void;
  onDisabledClick?: (event?: MouseEvent) => void;
}

export const Link = forwardRef(
  (
    {
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
      href,
      target,
      component,
      componentProps,
      onClick,
      onDisabledClick,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
    }: LinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ): ReactElement => {
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

    const isSpan = checked || disabled;

    const linkElement = isSpan ? 'span' : 'a';
    const linkProps: AnchorHTMLAttributes<HTMLAnchorElement> & ClassAttributes<HTMLAnchorElement> = {
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
      ref,
      onClick: handleClick,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    };
    if (target === '_blank') {
      linkProps.rel = 'noreferrer noopener';
    }
    if (!isSpan) {
      linkProps.href = href;
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

    if (isSpan || !component) {
      return React.createElement(linkElement, linkProps, linkContent);
    }

    return React.createElement(component, { ...linkProps, ...componentProps }, linkContent);
  },
);

Link.displayName = 'Link';

Link.defaultProps = {
  iconPosition: LinkIconPosition.Left,
  size: LinkSize.M,
  tabIndex: 0,
  disabled: false,
  checked: false,
  pseudo: false,
};

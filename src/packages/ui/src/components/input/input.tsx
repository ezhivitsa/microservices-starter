import React, {
  ReactNode,
  MutableRefObject,
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  TouchEvent,
  KeyboardEvent,
  useState,
  useEffect,
  useRef,
  ReactElement,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

// import { FormatCharacters } from '../masked-input/mask';
// import IconClose from '../icon/ui/close';
// import IconButton from '../icon-button/icon-button';
// import MaskedInput from '../masked-input/masked-input';

import { useStyles } from '../../theme';

import styles from './input.pcss';

export enum InputSize {
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

export enum InputView {
  Default = 'default',
  Filled = 'filled',
}

export enum InputWidth {
  Default = 'default',
  Available = 'available',
}

export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

interface Props {
  type?: InputType;
  view?: InputView;
  width?: InputWidth;
  autocomplete?: boolean;
  disabled?: boolean;
  disabledAttr?: boolean;
  focused?: boolean;
  maxLength?: number;
  icon?: ReactNode;
  clear?: boolean;
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  tabIndex?: number;
  mask?: string;
  useWhitespacesInMask?: boolean;
  // maskFormatCharacters?: FormatCharacters;
  pattern?: string;
  formNoValidate?: boolean;
  leftAddons?: React.ReactNode;
  rightAddons?: React.ReactNode;
  label?: ReactNode;
  placeholder?: string;
  hint?: ReactNode;
  error?: ReactNode;
  resetError?: boolean;
  size?: InputSize;
  className?: string;
  title?: string;
  inputRef?: MutableRefObject<HTMLInputElement>;

  onChange?: (value?: string, event?: ChangeEvent<any>) => void;
  onFocus?: (event?: FocusEvent<any>) => void;
  onClick?: (event?: MouseEvent<any>) => void;
  onBlur?: (event?: FocusEvent<any>) => void;
  onClearClick?: (event?: MouseEvent<any>) => void;
  onKeyDown?: (event?: KeyboardEvent<any>) => void;
  onKeyUp?: (event?: KeyboardEvent<any>) => void;
  onPaste?: (event?: React.ClipboardEvent<any>) => void;
  onTouchStart?: (event?: TouchEvent<any>) => void;
  onTouchEnd?: (event?: TouchEvent<any>) => void;
  onTouchMove?: (event?: TouchEvent<any>) => void;
  onTouchCancel?: (event?: TouchEvent<any>) => void;
  onProcessMaskInputEvent?: (event?: ChangeEvent<any>) => void;
}

export function Input({ error, view, size, disabled, type, width, ...props }: Props): ReactElement {
  const b = useStyles(styles, 'input');

  const [stateFocused, setFocused] = useState(false);
  const [stateError, setError] = useState(error || null);
  const [stateValue, setValue] = useState(props.defaultValue || '');

  useEffect(() => {
    setError(error || null);
  }, [error]);

  const value = props.value === undefined ? stateValue : props.value;
  const focused = props.focused === undefined ? stateFocused : props.focused;
  const invalid = !!stateError;

  const hasAddons = !!props.rightAddons || !!props.leftAddons;
  const hasLeftAddons = !!props.leftAddons;
  const hasClear = !!props.clear;
  const hasIcon = !!props.icon;
  const hasLabel = !!props.label;
  const hasValue = !!value;

  const rootRef = useRef(null);
  const boxRef = useRef(null);

  function resetError(): void {
    if (props.resetError) {
      setError(null);
    }
  }

  function changeValue(value: string, event: ChangeEvent): void {
    if (props.value === undefined) {
      setValue(value);
    }

    props.onChange?.(value, event);
  }

  function handleFocus(event: FocusEvent): void {
    setFocused(true);
    resetError();

    props.onFocus?.(event);
  }

  function handleClick(event: MouseEvent): void {
    props.onClick?.(event);
  }

  function handleBlur(event: FocusEvent): void {
    setFocused(false);

    props.onBlur?.(event);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    changeValue(event.target.value, event);
  }

  function handleClearClick(event: MouseEvent): void {
    changeValue('', event as any);

    props.onClearClick?.(event);

    focus();
  }

  function focus(): void {
    const control = props.inputRef?.current;
    if (control) {
      control.focus();
      setSelectionRange(control.value.length);
    }
  }

  function setSelectionRange(start = 0, end = props.inputRef?.current.value.length || 0): void {
    const control = props.inputRef?.current;
    if (type !== 'email' && control) {
      control.setSelectionRange(start, end);
    }
  }

  function renderContent(): ReactNode {
    const isMaskedInput = props.mask !== undefined;

    const inputProps = {
      className: b('control', {
        hasLabel,
        hasClear,
        hasIcon,
        hasAddons,
        disabled,
        focused,
        type,
        size,
        view,
      }),
      type,
      view,
      formNoValidate: props.formNoValidate,
      autoComplete: props.autocomplete ? 'on' : 'off',
      disabled: disabled || props.disabledAttr,
      maxLength: props.maxLength,
      id: props.id,
      name: props.name,
      value,
      tabIndex: props.tabIndex,
      placeholder: props.placeholder,
      pattern: props.pattern,
      ref: props.inputRef,
      title: props.title,
      onChange: handleChange,
      onFocus: handleFocus,
      onClick: handleClick,
      onBlur: handleBlur,
      onKeyDown: props.onKeyDown,
      onKeyUp: props.onKeyUp,
      onPaste: props.onPaste,
      onTouchStart: props.onTouchStart,
      onTouchEnd: props.onTouchEnd,
      onTouchMove: props.onTouchMove,
      onTouchCancel: props.onTouchCancel,
    };

    return (
      <span
        className={b('box', {
          hasClear,
          hasIcon,
          hasAddons,
          hasValue,
          hasLabel,
          disabled,
          focused,
          size,
          view,
          invalid,
        })}
        key="input-wrapper"
        ref={boxRef}
      >
        {props.leftAddons && (
          <span className={b('addons', { left: true })} key="left-addons">
            {props.leftAddons}
          </span>
        )}
        <span className={b('input-wrapper', { view, hasAddons })}>
          {!!props.label && (
            <span className={b('top', { size, view, disabled, focused, hasValue })}>{props.label}</span>
          )}
          {isMaskedInput ? (
            // <MaskedInput
            //   {...inputProps}
            //   mask={props.mask}
            //   formatCharacters={props.maskFormatCharacters}
            //   onProcessInputEvent={props.onProcessMaskInputEvent}
            //   useWhitespaces={props.useWhitespacesInMask}
            // />
            <div />
          ) : (
            <input {...inputProps} />
          )}
        </span>
        {props.clear && value && (
          // <IconButton className={b('clear', {disabled: props.disabled, view, size})} size={props.size}>
          //   <IconClose size={props.size} />
          // </IconButton>
          <div className={b('clear', { disabled, view, size })} tabIndex={-1} onClick={handleClearClick}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        )}
        {props.icon && <div className={b('icon', { size, view })}>{props.icon}</div>}
        {props.rightAddons && (
          <span className={b('addons', { right: true })} key="right-addons">
            {props.rightAddons}
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      className={b({
        type,
        view,
        disabled,
        focused,
        size,
        width,
        hasAddons,
        hasLeftAddons,
        hasClear,
        hasIcon,
        hasLabel,
        hasValue,
        invalid,
      })}
      ref={rootRef}
    >
      <span className={b('inner')}>
        {renderContent()}
        {(stateError || props.hint) && (
          <span className={b('sub', { size, view, invalid })}>{stateError || props.hint}</span>
        )}
      </span>
    </span>
  );
}

Input.defaultProps = {
  size: InputSize.M,
};

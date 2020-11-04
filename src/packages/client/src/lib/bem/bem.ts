export type State = Record<string, string | boolean | void | number>;

export interface ClassNameGenerator {
  (elementName?: string, state?: State): string;
  (state?: State): string;
}

/**
 * Модуль для генерации имен классов.
 */
export function block(styles: Record<string, string>, blockName: string): ClassNameGenerator {
  return (elementNameOrState?: string | State, state?: State): string => {
    let resultClassNames = '';
    let element = blockName;

    if (elementNameOrState) {
      if (typeof elementNameOrState === 'string') {
        element += '__' + elementNameOrState;

        resultClassNames = styles[element];
      } else if (typeof elementNameOrState === 'object') {
        state = elementNameOrState;
        resultClassNames = styles[blockName];
      }
    } else {
      resultClassNames = styles[blockName];
    }

    if (state) {
      Object.keys(state).forEach((key) => {
        if (!state) {
          return;
        }

        let className: string | undefined;
        if (state[key] === true) {
          className = styles[`_${key}`];
        } else if (state[key]) {
          className = styles[`_${key}_${state[key]}`];
        }

        if (className) {
          resultClassNames += ` ${className}`;
        }
      });
    }

    return resultClassNames;
  };
}
export type State = Record<string, string | boolean | void | number>;

export interface ClassNameGenerator {
  (elementName?: string, state?: State): string;
  (state?: State): string;
}

const hyphenRegExp = /-([a-z])/g;

function toCamelCase(value: string): string {
  return value.replace(hyphenRegExp, (g) => g[1].toUpperCase());
}

/**
 * Модуль для генерации имен классов.
 */
export function block(styles: Record<string, string>, blockName: string, theme?: string): ClassNameGenerator {
  return (elementNameOrState?: string | State, state?: State): string => {
    let resultClassNames = '';
    let element = blockName;

    if (elementNameOrState) {
      if (typeof elementNameOrState === 'string') {
        element += `__${elementNameOrState}`;

        resultClassNames = styles[toCamelCase(element)];
      } else if (typeof elementNameOrState === 'object') {
        state = elementNameOrState;
        resultClassNames = styles[toCamelCase(blockName)];

        if (theme) {
          resultClassNames += ' ' + styles[`${toCamelCase(blockName)}_theme_${theme}`];
        }
      }
    } else {
      resultClassNames = styles[toCamelCase(blockName)];

      if (theme) {
        resultClassNames += ' ' + styles[`${toCamelCase(blockName)}_theme_${theme}`];
      }
    }

    if (state) {
      Object.keys(state).forEach((key) => {
        if (!state) {
          return;
        }

        let className: string | undefined;
        if (state[key] === true) {
          className = styles[`_${toCamelCase(key)}`];
        } else if (state[key]) {
          const camelCaseKey = toCamelCase(key);
          className = styles[`_${camelCaseKey}_${state[camelCaseKey]}`];
        }

        if (className) {
          resultClassNames += ` ${className}`;
        }
      });
    }

    return resultClassNames;
  };
}

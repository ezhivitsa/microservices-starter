import React, { ReactElement, ReactNode, Suspense } from 'react';
import classnames from 'classnames';
import Highlight, { defaultProps } from 'prism-react-renderer';
import darkTheme from 'prism-react-renderer/themes/duotoneDark';
import lightTheme from 'prism-react-renderer/themes/duotoneLight';

import { useTheme, useStyles, Theme } from '@packages/ui';

import { Extension } from 'common/component-types';

import styles from './demo-component-code.pcss';

interface Props {
  name: string;
  code: string;
  extension: Extension;
}

export function DemoComponentCode({ name, code, extension }: Props): ReactElement {
  const [theme] = useTheme();
  const b = useStyles(styles, 'demo-component-code');

  function renderHighlight(): ReactNode {
    const highlightTheme = theme === Theme.Light ? lightTheme : darkTheme;

    return (
      <Highlight {...defaultProps} theme={highlightTheme} code={code} language={extension}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={classnames(b('pre'), className)} style={style}>
            {tokens.map((line, i) => {
              const { className: lineClassName, ...restLineProps } = getLineProps({ line, key: i });

              return (
                <div key={i} className={classnames(b('line'), lineClassName)} {...restLineProps}>
                  <span className={b('line-no')}>{i + 1}</span>
                  <span className={b('line-content')}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    );
  }

  function renderDemo(): ReactNode {
    const LoadableComponent = React.lazy(() => import(`@packages/ui/components/${name}/demo.${extension}`));

    return (
      <Suspense fallback={<div>Loading</div>}>
        <LoadableComponent />
      </Suspense>
    );
  }

  return (
    <>
      {renderDemo()}
      {renderHighlight()}
    </>
  );
}

import React, { Component } from 'react';
import ReactDom from 'react-dom/server';
import PropTypes from 'prop-types';
import { StaticRouter } from 'react-router';

import ScriptView from 'packages/geoadv-ui/script-view';
import { App } from 'services/ui-demo/app';
import serialize from 'serialize-javascript';

import { HtmlViewOptionsPropType } from 'packages/geoadv-types/entities-prop-types';

class UiHtmlView extends Component {
  static propTypes = {
    options: HtmlViewOptionsPropType.isRequired,
    config: PropTypes.object,
    children: PropTypes.node,
  };

  importAssetsPaths(assetsPaths) {
    const { chunks, js } = assetsPaths;
    return (
      <>
        {chunks &&
          Object.keys(chunks).map((chunk) => (
            <script src={chunks[chunk]} type="text/javascript" crossOrigin="anonymous" defer key={chunk} />
          ))}
        <script src={js} type="text/javascript" crossOrigin="anonymous" defer />
      </>
    );
  }

  render() {
    const { options, config } = this.props;

    return (
      <html>
        <head>
          <title>UI Demo</title>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1.0, maximum-scale=1.0" />
          <link rel="stylesheet" href={options.assetsPaths.css} />
          {options.polyfillsUrl && (
            <script src={options.polyfillsUrl} type="text/javascript" crossOrigin="anonymous" defer />
          )}
          <script src={options.reactUrl} type="text/javascript" crossOrigin="anonymous" defer />
          <link rel="icon" type="image/png" href={options.publicPath + 'favicon.png'} />
        </head>
        <body>
          <ScriptView content={`window.__CONFIG__ = ${serialize(config)}`} />
          <div id="root">{this.props.children}</div>
          {this.importAssetsPaths(options.assetsPaths)}
        </body>
      </html>
    );
  }
}

export const render = ({ options, config, url }) => {
  const routerContext = {};

  const html = ReactDom.renderToString(
    <UiHtmlView options={options} config={config}>
      <StaticRouter location={url} basename={config.basename} context={routerContext}>
        <App config={config} />
      </StaticRouter>
    </UiHtmlView>,
  );

  return {
    html,
    ...routerContext,
  };
};

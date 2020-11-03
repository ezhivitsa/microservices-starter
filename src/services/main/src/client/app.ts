import { constructRoutes, constructApplications, constructLayoutEngine } from 'single-spa-layout';
import { registerApplication, start } from 'single-spa';

import { lib } from '@packages/client';

import { CONTENT_ELEMENT_ID } from 'constants/app.constants';

import { loadingLifecycles } from 'components/loading';

const { frontUpstreams } = lib.config;

const routes = constructRoutes({
  containerEl: `#${CONTENT_ELEMENT_ID}`,
  routes: Object.values(frontUpstreams)
    .filter((_, index) => index === 0)
    .map((upstream) => {
      return {
        type: 'route',
        path: upstream.rule,
        routes: [
          {
            type: 'application',
            name: upstream.name,
            loader: loadingLifecycles,
          },
        ],
      };
    }),
});

const applications = constructApplications({
  routes,
  loadApp: async ({ name }) => {
    const cssUrl = Object.values(frontUpstreams).find((upstream) => upstream.name === name)?.cssUrl;

    if (cssUrl) {
      const module = await System.import(cssUrl);
      const styleSheet: CSSStyleSheet = module.default;

      document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];
    }
    return System.import(name);
  },
});

const layoutEngine = constructLayoutEngine({
  routes,
  applications,
  active: false,
});

export function register(): void {
  applications.forEach(registerApplication);

  layoutEngine.activate();
  start();
}

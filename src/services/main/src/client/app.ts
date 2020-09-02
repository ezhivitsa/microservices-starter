import { constructRoutes, constructApplications, constructLayoutEngine } from 'single-spa-layout';
import { registerApplication, start } from 'single-spa';

import { config } from 'lib/config';

import { CONTENT_ELEMENT_ID } from 'constants/app.constants';

const routes = constructRoutes({
  containerEl: `#${CONTENT_ELEMENT_ID}`,
  routes: Object.values(config.frontUpstreams).map((upstream) => {
    return {
      type: 'route',
      path: upstream.rule,
      routes: [
        {
          type: 'application',
          name: upstream.name,
        },
      ],
    };
  }),
});

const applications = constructApplications({
  routes,
  loadApp: ({ name }) => window.System.import(name),
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

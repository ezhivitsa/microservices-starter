import { constructRoutes, constructApplications, constructLayoutEngine } from 'single-spa-layout';
import { registerApplication, start } from 'single-spa';

// const routes = constructRoutes(document.querySelector('#single-spa-layout') as Element);
const routes = constructRoutes({
  containerEl: '#content-viewport',
  routes: [
    {
      type: 'route',
      path: '/',
      routes: [
        {
          type: 'application',
          name: '@services/dashboard',
        },
      ],
    },
  ],
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

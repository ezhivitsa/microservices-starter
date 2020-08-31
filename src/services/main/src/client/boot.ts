import { registerApplication, start } from 'single-spa';

import { config } from 'lib/config';

const { dashboard } = config.frontUpstreams;

registerApplication({
  name: dashboard.name,
  app: () => window.System.import(dashboard.name),
  activeWhen: [dashboard.rule],
});

start({
  urlRerouteOnly: true,
});

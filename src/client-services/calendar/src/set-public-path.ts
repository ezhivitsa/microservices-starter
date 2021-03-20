import { setPublicPath } from 'systemjs-webpack-interop';

import { config } from 'lib/config';

setPublicPath(config.frontUpstreams.calendar.name);

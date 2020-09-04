import { setPublicPath } from 'systemjs-webpack-interop';

import { lib } from '@packages/client';

setPublicPath(lib.config.frontUpstreams.dashboard.name);

import { lib } from '@packages/server';

import { FrontApplication } from 'common/general-types';

export const version = lib.getAppVersion();

export const dashboardVersion = lib.getUpstreamVersion(FrontApplication.Dashboard);

import { lib } from '@packages/server';
import { Types } from '@packages/common';

export const version = lib.getAppVersion();

export const dashboardVersion = lib.getUpstreamVersion(Types.FrontApplication.Dashboard);

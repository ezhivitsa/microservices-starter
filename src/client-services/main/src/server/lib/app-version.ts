import { lib } from '@packages/server';
import { Types } from '@packages/common';

export const version = lib.getAppVersion();

export const dashboardVersion = lib.getUpstreamVersion(Types.FrontApplication.Dashboard);
export const authVersion = lib.getUpstreamVersion(Types.FrontApplication.Auth);
export const settingsVersion = lib.getUpstreamVersion(Types.FrontApplication.Settings);
export const calendarVersion = lib.getUpstreamVersion(Types.FrontApplication.Calendar);

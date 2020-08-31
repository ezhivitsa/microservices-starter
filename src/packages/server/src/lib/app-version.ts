import { resolve as resolvePath } from 'path';

import { readJsonFile } from './resources';

const deployFile = '.deploy.json';

export function getAppVersion(deployFilePath = deployFile): string {
  const deployConfig = readJsonFile(resolvePath(deployFilePath));
  return deployConfig.registry.tag;
}

export function getUpstreamVersion(upstream: string, deployFilePath = deployFile): string {
  const deployConfig = readJsonFile(resolvePath(deployFilePath));
  return deployConfig.upstreams[upstream];
}

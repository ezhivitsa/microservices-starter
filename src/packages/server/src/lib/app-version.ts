import { resolve as resolvePath } from 'path';

import { readJsonFile } from './resources';

export function getAddVersion(deployFilePath = '.deploy.json'): string {
  const deployConfig = readJsonFile(resolvePath(deployFilePath));
  return deployConfig.registry.tag;
}

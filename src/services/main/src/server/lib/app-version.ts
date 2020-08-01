import { resolve as resolvePath } from 'path';
import { readJsonFile } from './resources';

const deployConfig = readJsonFile(resolvePath('.deploy.json'));

export const version = deployConfig.registry.tag;

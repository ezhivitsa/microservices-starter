import fs from 'fs';
import path from 'path';
import * as glob from 'glob';

import { config } from 'lib/config';

type Extension = 'tsx' | 'jsx';

interface ComponentMeta {
  name: string;
  code: string;
  extension: Extension;
}

let componentsListCache: string[] | undefined;
const componentMetaCache: Record<string, ComponentMeta> = {};

const { noCache } = config.assets;

export interface ComponentSource {
  extension: Extension;
  source: string;
}

const packagesUiRoot = path.resolve(__dirname, '../../../../../packages/ui/src');

const rootDir = path.resolve(__dirname, '../../../../..');
const COMPONENTS_ROOT = 'packages/ui/src';

const dirRegExp = /.*packages\/ui\/src\//;

export const getComponentsWithDemo = (): string[] => {
  if (!noCache && componentsListCache) {
    return componentsListCache;
  }

  const components = glob
    .sync(`${packagesUiRoot}/**/demo.{jsx,tsx}`, { cwd: '.', nodir: true })
    .map(path.dirname)
    .map((dirName) => dirName.replace(dirRegExp, ''))
    .sort((a, b) => {
      return a.localeCompare(b);
    });

  componentsListCache = components;
  return components;
};

export const getComponentSourceCode = ({
  componentsRoot,
  component,
}: {
  componentsRoot: string;
  component: string;
}): ComponentSource => {
  const demoFolderPath = path.join(rootDir, componentsRoot, component);

  if (fs.existsSync(path.join(demoFolderPath, 'demo.jsx'))) {
    return {
      extension: 'jsx',
      source: fs.readFileSync(path.join(demoFolderPath, 'demo.jsx'), 'utf-8'),
    };
  }

  return {
    extension: 'tsx',
    source: fs.readFileSync(path.join(demoFolderPath, 'demo.tsx'), 'utf-8'),
  };
};

export const getComponentMeta = (componentName: string): ComponentMeta => {
  if (!noCache && componentMetaCache[componentName]) {
    return componentMetaCache[componentName];
  }

  const componentCode = getComponentSourceCode({
    component: componentName,
    componentsRoot: COMPONENTS_ROOT,
  });

  const meta = {
    name: componentName,
    code: componentCode.source,
    extension: componentCode.extension,
  };

  componentMetaCache[componentName] = meta;
  return meta;
};

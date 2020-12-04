import { componentsPath, formatComponentPath } from './paths';

const componentPlaceholder = ':component';

export const componentsPathTemplate = componentsPath;
export const componentPathTemplate = formatComponentPath(componentPlaceholder);

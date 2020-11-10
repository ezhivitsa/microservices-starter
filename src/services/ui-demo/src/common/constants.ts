export const formatGetComponent = (component: string): string => `/components/${component}`;
export const componentParam = 'component';
export const getComponentPathTemplate = formatGetComponent(`:${componentParam}`);

export const configElementId = 'client-config';

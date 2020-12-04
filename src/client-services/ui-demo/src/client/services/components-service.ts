import { formatGetComponent } from 'common/constants';
import { GetComponentResponse } from 'common/component-types';

import { api } from './api';

export function getComponentMeta(component: string): Promise<GetComponentResponse> {
  return api.get(formatGetComponent(component));
}

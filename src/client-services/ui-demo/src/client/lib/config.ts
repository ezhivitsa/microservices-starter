import { ClientConfig } from 'common/general-types';
import { configElementId } from 'common/constants';

const node = document.querySelector(`#${configElementId}`);

if (!node || !node.textContent) {
  throw new Error('Config node is empty');
}

export const config = JSON.parse(node.textContent) as ClientConfig;

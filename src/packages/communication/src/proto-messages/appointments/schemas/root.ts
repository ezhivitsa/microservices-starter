import * as path from 'path';

import { ProtoRoot } from '../../../messages';

export const root = ProtoRoot.createForDirectory(path.join(__dirname, '../../../../messages/appointments'));

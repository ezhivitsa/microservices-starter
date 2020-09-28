import * as path from 'path';

import { ProtoRoot } from '../../proto';

export const root = ProtoRoot.createForDirectory(path.join(__dirname, '../../../../messages/authorization'));

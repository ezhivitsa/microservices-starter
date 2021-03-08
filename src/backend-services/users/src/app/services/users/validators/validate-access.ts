import { SessionUser } from '@packages/koa-kafka';

import { AccessDeniedError } from '@root/services/errors';

export function validateAccess(currentUser: SessionUser | undefined, userId: string): void {
  if (currentUser && (currentUser.id === userId || currentUser.isAdmin)) {
    return;
  }

  throw new AccessDeniedError('Access denied');
}

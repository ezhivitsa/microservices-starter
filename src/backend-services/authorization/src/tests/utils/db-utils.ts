import { db } from '@root/lib/db';

export async function cleanDB(): Promise<void> {
  await Promise.all([
    db.User.destroy({ where: {}, truncate: true }),
    db.Command.destroy({ where: {}, truncate: true }),
  ]);
}

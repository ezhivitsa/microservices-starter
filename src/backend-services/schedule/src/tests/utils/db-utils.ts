import { db } from '@root/lib/db/models';

export async function cleanDB(): Promise<void> {
  await Promise.all([db.User.destroy({ where: {} }), db.Command.destroy({ where: {}, truncate: true })]);
}

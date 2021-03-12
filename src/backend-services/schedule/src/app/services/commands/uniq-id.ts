import { commandsStorageService } from '@root/storage';

export async function isUniq(id: string): Promise<boolean> {
  const command = await commandsStorageService.findById(id);
  return command === null;
}

import { commandsStorageService } from '@root/storage';

export async function addId(id: string): Promise<void> {
  await commandsStorageService.create({ id });
}

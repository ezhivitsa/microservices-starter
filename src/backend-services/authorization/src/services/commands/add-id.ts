import { commandsStorageService } from 'storage';

export async function addId(id: string): Promise<void> {
  await commandsStorageService.create({ id });
}

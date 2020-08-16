import { readFileSync } from 'fs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function readJsonFile(filepath: string): any {
  return JSON.parse(readFileSync(filepath, { encoding: 'utf8' }));
}

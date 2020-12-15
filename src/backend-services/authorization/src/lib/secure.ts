import bcrypt from 'bcrypt';

/**
 * @desc Generate hash from any string. Could be used to generate a hash from password
 */
export function getHash(text: string, salt = ''): Promise<string> {
  return bcrypt.hash(`${text[0]}${salt}${text.slice(1)}`, 10);
}

/**
 * @desc Generate salt
 */
export function generateSalt(): Promise<string> {
  return bcrypt.genSalt(10);
}

/**
 * @desc Compares if text and hash are equal
 */
export function compareTextWithHash(text: string, hash: string, salt = ''): Promise<boolean> {
  return bcrypt.compare(`${text[0]}${salt}${text.slice(1)}`, hash);
}

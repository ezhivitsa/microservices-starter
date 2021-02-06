import { getHash, generateSalt } from '@root/lib/secure';

interface PasswordData {
  hash: string;
  salt: string;
}

export async function generatePasswordHast(password: string): Promise<PasswordData> {
  const salt = await generateSalt();
  const hash = await getHash(password, salt);

  return {
    hash,
    salt,
  };
}

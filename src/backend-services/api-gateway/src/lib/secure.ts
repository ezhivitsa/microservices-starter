import crypto from 'crypto';

export function generateSecureToken(): string {
  const buf = crypto.randomBytes(48);
  return buf.toString('hex');
}

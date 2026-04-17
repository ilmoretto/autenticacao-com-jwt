import crypto from 'node:crypto';

export const refreshTokensStore = [];

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString('hex');
}

export function saveRefreshToken(token, userId) {
  const days = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS || 7);

  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  refreshTokensStore.push({
    token,
    userId,
    expiresAt,
    revoked: false,
    createdAt: new Date()
  });
}
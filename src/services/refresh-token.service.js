import crypto from 'node:crypto';

export const refreshTokensStore = [];

function getTokenHash(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString('hex');
}

export function saveRefreshToken(token, userId) {
  const days = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS || 7);

  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  const tokenData = {
    tokenHash: getTokenHash(token),
    userId,
    expiresAt,
    revoked: false,
    createdAt: new Date()
  };

  refreshTokensStore.push(tokenData);

  return tokenData;
}

export function findValidRefreshToken(token) {
  const tokenHash = getTokenHash(token);

  return refreshTokensStore.find((item) => {
    return (
      item.tokenHash === tokenHash &&
      item.revoked === false &&
      item.expiresAt > new Date()
    );
  });
}

export function revokeRefreshToken(token) {
  const tokenHash = getTokenHash(token);

  const tokenData = refreshTokensStore.find(
    (item) => item.tokenHash === tokenHash
  );

  if (tokenData) {
    tokenData.revoked = true;
  }

  return tokenData;
}
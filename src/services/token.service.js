import jwt from 'jsonwebtoken';

export function generateAccessToken(user) {
  return jwt.sign(
    {
      sub: String(user.id),
      nome: user.nome,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m'
    }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
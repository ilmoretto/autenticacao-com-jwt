import { verifyAccessToken } from '../services/token.service.js';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Token não informado.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);

    req.user = {
      id: Number(decoded.sub),
      nome: decoded.nome,
      role: decoded.role
    };

    next();
  } catch {
    return res.status(401).json({
      error: 'Token inválido ou expirado.'
    });
  }
}
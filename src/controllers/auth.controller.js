import { users } from '../data/users.mock.js';
import { generateAccessToken } from '../services/token.service.js';
import {
  generateRefreshToken,
  saveRefreshToken
} from '../services/refresh-token.service.js';

export function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: 'Usuário e senha são obrigatórios.'
    });
  }

  const user = users.find(
    (item) => item.username === username && item.password === password
  );

  if (!user) {
    return res.status(401).json({
      error: 'Credenciais inválidas.'
    });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();

  saveRefreshToken(refreshToken, user.id);

  return res.status(200).json({
    message: 'Login realizado com sucesso.',
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      nome: user.nome,
      role: user.role
    }
  });
}

export function refresh(req, res) {
  return res.status(200).json({
    message: 'Rota de refresh pronta'
  });
}

export function logout(req, res) {
  return res.status(200).json({
    message: 'Rota de logout pronta'
  });
}
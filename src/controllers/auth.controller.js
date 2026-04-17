import { users } from '../data/users.mock.js';
import { generateAccessToken } from '../services/token.service.js';
import {
  generateRefreshToken,
  saveRefreshToken,
  findValidRefreshToken,
  revokeRefreshToken
} from '../services/refresh-token.service.js';
import { AppError } from '../utils/app-error.js';

export function login(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new AppError('Usuário e senha são obrigatórios.', 400);
    }

    const user = users.find(
      (item) => item.username === username && item.password === password
    );

    if (!user) {
      throw new AppError('Credenciais inválidas.', 401);
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
  } catch (error) {
    next(error);
  }
}

export function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError('Refresh token é obrigatório.', 400);
    }

    const storedToken = findValidRefreshToken(refreshToken);

    if (!storedToken) {
      throw new AppError('Refresh token inválido, expirado ou revogado.', 401);
    }

    const user = users.find((item) => item.id === storedToken.userId);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 401);
    }

    revokeRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken();

    saveRefreshToken(newRefreshToken, user.id);

    return res.status(200).json({
      message: 'Token renovado com sucesso.',
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    next(error);
  }
}

export function logout(req, res, next) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError('Refresh token é obrigatório.', 400);
    }

    const revokedToken = revokeRefreshToken(refreshToken);

    if (!revokedToken) {
      throw new AppError('Refresh token não encontrado.', 404);
    }

    return res.status(200).json({
      message: 'Logout realizado com sucesso.'
    });
  } catch (error) {
    next(error);
  }
}
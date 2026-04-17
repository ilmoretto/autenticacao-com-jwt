import { users } from '../data/users.mock.js';
import { generateAccessToken } from '../services/token.service.js';
import {
    generateRefreshToken,
    saveRefreshToken,
    findValidRefreshToken,
    revokeRefreshToken
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
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({
            error: 'Refresh token é obrigatório.'
        });
    }

    const storedToken = findValidRefreshToken(refreshToken);

    if (!storedToken) {
        return res.status(401).json({
            error: 'Refresh token inválido, expirado ou revogado.'
        });
    }

    const user = users.find((item) => item.id === storedToken.userId);

    if (!user) {
        return res.status(401).json({
            error: 'Usuário não encontrado.'
        });
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
}

export function logout(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({
            error: 'Refresh token é obrigatório.'
        });
    }

    const revokedToken = revokeRefreshToken(refreshToken);

    if (!revokedToken) {
        return res.status(404).json({
            error: 'Refresh token não encontrado.'
        });
    }

    return res.status(200).json({
        message: 'Logout realizado com sucesso.'
    });
}
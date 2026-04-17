export function login(req, res) {
  return res.status(200).json({
    message: 'Rota de login pronta'
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
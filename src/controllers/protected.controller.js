export function getUsuarios(req, res) {
  return res.status(200).json({
    message: 'Rota protegida de usuários pronta'
  });
}

export function postDados(req, res) {
  return res.status(200).json({
    message: 'Rota protegida de dados pronta'
  });
}
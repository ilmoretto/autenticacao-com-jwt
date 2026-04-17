export function getUsuarios(req, res) {
  return res.status(200).json({
    message: `Bem-vindo, ${req.user.nome}.`,
    perfil: req.user.role,
    usuarios: [
      { id: 1, nome: 'Administrador' },
      { id: 2, nome: 'Jessica' },
      { id: 3, nome: 'Morete' }
    ]
  });
}

export function postDados(req, res) {
  return res.status(200).json({
    message: 'Dados recebidos com sucesso.',
    enviadoPor: req.user.nome,
    perfil: req.user.role,
    body: req.body
  });
}
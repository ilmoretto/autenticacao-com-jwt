export function notFoundHandler(req, res) {
  return res.status(404).json({
    error: 'Rota não encontrada.'
  });
}

export function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor.';

  return res.status(statusCode).json({
    error: message
  });
}
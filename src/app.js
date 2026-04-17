import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import protectedRoutes from './routes/protected.routes.js';
import { notFoundHandler, errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Servidor funcionando',
    uptime: process.uptime()
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API de autenticação iniciada com sucesso'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
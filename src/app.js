import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import protectedRoutes from './routes/protected.routes.js';

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

app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada'
  });
});

export default app;
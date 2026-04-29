import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error';
import authRoutes from './routes/auth';
import studentRoutes from './routes/student';
import educatorRoutes from './routes/educator';
import shareRoutes from './routes/share';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/student', studentRoutes);
  app.use('/api/educator', educatorRoutes);
  app.use('/api/share', shareRoutes);

  app.use(errorHandler);

  return app;
}

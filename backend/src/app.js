import express from 'express';
import userRoutes from './routes/user.routes.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Selamat datang di API Mongoose!');
});

export default app;
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';
import { testConnection } from './config/database.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection on startup
testConnection();

// Routes
app.use('/api/users', userRoutes);

// Basic health check route
app.get('/api/health', async (req, res) => {
  const dbStatus = await testConnection();
  res.json({ 
    message: 'Server is running!', 
    timestamp: new Date().toISOString(),
    database: dbStatus ? 'Connected' : 'Disconnected'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to React Native Backend API with MySQL',
    endpoints: {
      health: '/api/health',
      users: '/api/users'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 API URL: http://localhost:${PORT}`);
  console.log(`💾 Using MySQL database: ${process.env.DB_NAME}`);
});
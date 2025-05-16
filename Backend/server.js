const fs = require('fs');
console.log("Does .env exist?", fs.existsSync('.env'));

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
console.log("Connecting to MySQL as:", process.env.DB_USER);


const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use auth routes under /api/auth
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Sync database and start server
sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

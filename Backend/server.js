process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', err => {
  console.error('UNHANDLED PROMISE REJECTION:', err);
});

const fs = require('fs');
console.log("Does .env exist?", fs.existsSync('.env'));

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
//dotenv.config();
dotenv.config({ path: __dirname + '/.env' });
console.log("Connecting to MySQL as:", process.env.DB_USER);
const app = express();



const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const profileSetupRoutes = require('./routes/profileSetup');
const partnerRoutes = require('./routes/partner');

const Place = require('./models/place');
const Doctor = require('./models/doctor');


// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());
const path = require('path');
app.use(express.static(path.join(__dirname, '../Frontend/campusMap')));

const matchRoutes = require('./routes/match');
app.use('/api/match', matchRoutes);

// Use auth routes under /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/profileSetup', profileSetupRoutes);
app.use('/api/partnerFinder', partnerRoutes);

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

const lostRoutes = require('./routes/lost');
app.use('/api/lost', lostRoutes);

const foundRoutes = require('./routes/found');
app.use('/api/found', foundRoutes);

const lookupRoutes = require('./routes/lookUp');
app.use('/api/lookup', lookupRoutes);

const PORT = process.env.PORT || 5000;

//Use helmet for XSS & header protection
const helmet = require('helmet');
app.use(helmet());
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


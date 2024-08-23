const mongoose = require('mongoose');
require('dotenv').config()

if (process.env.NODE_ENV === 'development') {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000, 
    bufferCommands: false,
  })
    .then(() => {
      console.log('Connected to database');
    })
    .catch((error) => {
      console.error('Error connecting to database', error);
    });
}

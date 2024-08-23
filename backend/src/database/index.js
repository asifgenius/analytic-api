const mongoose = require('mongoose');
require('dotenv').config()

if (process.env.NODE_ENV === 'development') {
  mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
      console.log('Connected to database');
    })
    .catch((error) => {
      console.error('Error connecting to database', error);
    });
}

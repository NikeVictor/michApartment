require('dotenv').config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER || 'your_username',
    password: process.env.POSTGRES_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'michApartment',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    dialect: 'postgres'
  }
};

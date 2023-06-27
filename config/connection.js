// Import the sequelize constructor
const Sequelize = require('sequelize');

// Load environment variables from .env file
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // Use JAWSDB if it's available (this would be the case on Heroku)
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Otherwise, use your local mysql database
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;

require('dotenv').config();
const { USERNAME, PASSWORD, DATABASE, HOST } = process.env;
module.exports = {
  "development": {
    "username": USERNAME,
    "password": PASSWORD,
    "database": DATABASE,
    "host": HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

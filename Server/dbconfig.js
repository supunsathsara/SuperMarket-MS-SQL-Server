require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: 'DESKTOP-A3KEAAM',
  database: 'SuperMarket',
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
    enableArithAbort: true,
    instancename: 'SQLEXPRESS',
  },
  port: 50922,
};

module.exports = config;

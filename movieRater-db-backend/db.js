require("dotenv").config();


const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Use encryption if needed
    trustServerCertificate: true, // For local development, you might need to use this
  }
};

// We create and export a function to get the pool
const getPool = async () => {
  try {
    const pool = await sql.connect(config);  // Make sure the connection pool is initialized properly
    console.log("Connected to the database!");
    return pool;
  } catch (err) {
    console.error("Error while connecting to the database:", err);
    throw err;
  }
};

module.exports = { getPool };

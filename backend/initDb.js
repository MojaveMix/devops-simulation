const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
  try {
    // Create a connection without specifying the database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });
    
    const dbName = process.env.DB_NAME || 'crud_db';
    
    console.log(`Checking if database '${dbName}' exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Database '${dbName}' is ready.`);
    
    // Switch to the newly created database
    await connection.query(`USE \`${dbName}\`;`);
    
    console.log('Checking if items table exists...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table items is ready.');
    
    await connection.end();
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1); // Exit process if database cannot be initialized
  }
}

module.exports = initializeDatabase;

import mysql from 'mysql2/promise';
import 'dotenv/config';

async function initializeDatabase() {
  let connection;
  try {
    // Connect without specifying database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
      multipleStatements: true // Allow multiple SQL statements
    });

    console.log('✅ Connected to MySQL server');

    const dbName = process.env.DB_NAME || 'reactnativeapp';

    // Create database using simple query (not prepared statement)
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log('✅ Database created or already exists');

    // Switch to our database
    await connection.query(`USE \`${dbName}\``);
    console.log('✅ Using database:', dbName);

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        age INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created or already exists');

    // Insert sample data using simple query
    await connection.query(`
      INSERT IGNORE INTO users (name, email, age) VALUES 
      ('John Doe', 'john@example.com', 30),
      ('Jane Smith', 'jane@example.com', 25)
    `);
    console.log('✅ Sample data inserted');

    console.log('🎉 Database initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure MySQL is running');
    console.log('2. Check your MySQL username/password in .env file');
    console.log('3. For Windows: Run "net start MySQL" as Administrator');
    console.log('4. For XAMPP: Start MySQL from XAMPP Control Panel');
    console.log('5. Check if MySQL port 3306 is available');
  } finally {
    // Always close the connection
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the initialization
initializeDatabase();
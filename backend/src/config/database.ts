import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private pool: mysql.Pool;

  constructor() {
    let dbPassword = process.env.DB_PASSWORD;
    
   
    
    
    // Debug: Check if password is being read
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Environment check:');
      console.log('  DB_PASSWORD exists:', !!dbPassword);
      console.log('  DB_PASSWORD length:', dbPassword ? dbPassword.length : 0);
      console.log('  DB_PASSWORD value (first 2 chars):', dbPassword ? dbPassword.substring(0, 2) + '...' : 'undefined');
    }

    if (!dbPassword) {
      console.error('❌ ERROR: DB_PASSWORD is not set in environment variables!');
      console.error('   Please check your .env file in the backend directory.');
      console.error('   Make sure the password is set correctly.');
    }

    const dbConfig = {
      host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost' ,
      port: process.env.MYSQLPORT||  parseInt(process.env.DB_PORT || '3306') ,
      user: process.env.MYSQLUSER||process.env.DB_USER || 'root',
      password: process.env.MYSQLPASSWORD || dbPassword || '' ,
      database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'apnisec_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };

    // Debug: Log connection config (without password for security)
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Database config:', {
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        database: dbConfig.database,
        hasPassword: !!dbConfig.password,
        passwordLength: dbConfig.password ? dbConfig.password.length : 0,
      });
    }

    this.pool = mysql.createPool(dbConfig);
  }

  async getConnection(): Promise<mysql.PoolConnection> {
    return await this.pool.getConnection();
  }

  async query<T = any>(sql: string, params?: any[]): Promise<T> {
    const [rows] = await this.pool.execute(sql, params);
    return rows as T;
  }

  async transaction<T>(callback: (connection: mysql.PoolConnection) => Promise<T>): Promise<T> {
    const connection = await this.pool.getConnection();
    await connection.beginTransaction();

    try {
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

export default new Database();


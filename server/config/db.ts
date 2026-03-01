import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Shared database pool for all services
// In a true microservices architecture, each service would have its own database
// For this modular monolith, they share a connection pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

import { pool } from './server/config/db';

async function run() {
  try {
    const { rows } = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'grievances'
      ORDER BY ordinal_position;
    `);
    console.log("Grievances table structure:");
    console.table(rows);
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
}
run();
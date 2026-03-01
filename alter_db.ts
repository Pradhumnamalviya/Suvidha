import { pool } from './server/config/db';

async function run() {
  console.log("Starting database migration...");
  
  // 1. Ensure Types exist
  try {
    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE grievance_status AS ENUM ('REGISTERED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    console.log("Ensured grievance_status type exists");
  } catch (e) { console.error(e); }

  // Add missing values to grievance_status if they don't exist
  const statusValues = ['REGISTERED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'];
  for (const val of statusValues) {
    try {
      await pool.query(`ALTER TYPE grievance_status ADD VALUE IF NOT EXISTS '${val}';`);
      console.log(`Ensured '${val}' exists in grievance_status`);
    } catch (e) { /* Ignore errors if already exists or other issues */ }
  }

  try {
    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE complaint_type AS ENUM ('OUTAGE', 'METER_FAULT', 'BILLING_ISSUE');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    console.log("Ensured complaint_type type exists");
  } catch (e) { console.error(e); }

  // Add missing values to complaint_type
  const complaintValues = ['OUTAGE', 'METER_FAULT', 'BILLING_ISSUE'];
  for (const val of complaintValues) {
    try {
      await pool.query(`ALTER TYPE complaint_type ADD VALUE IF NOT EXISTS '${val}';`);
      console.log(`Ensured '${val}' exists in complaint_type`);
    } catch (e) { /* Ignore */ }
  }

  try {
    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE department_type AS ENUM ('ELECTRICITY', 'WATER', 'GAS', 'MUNICIPAL', 'TRANSPORT', 'OTHER');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    console.log("Ensured department_type type exists");
  } catch (e) { console.error(e); }

  // Add missing values to department_type
  const deptValues = ['ELECTRICITY', 'WATER', 'GAS', 'MUNICIPAL', 'TRANSPORT', 'OTHER'];
  for (const val of deptValues) {
    try {
      await pool.query(`ALTER TYPE department_type ADD VALUE IF NOT EXISTS '${val}';`);
      console.log(`Ensured '${val}' exists in department_type`);
    } catch (e) { /* Ignore */ }
  }

  // 2. Ensure columns exist in grievances table
  try {
    await pool.query(`ALTER TABLE grievances ADD COLUMN IF NOT EXISTS grievance_id VARCHAR(50) UNIQUE;`);
    console.log("Added grievance_id column");
  } catch (e) { console.error(e); }

  // Handle legacy columns that might be NOT NULL
  const legacyColumns = ['tracking_id', 'category', 'complaint_type', 'description', 'status', 'department'];
  for (const col of legacyColumns) {
    try {
      await pool.query(`ALTER TABLE grievances ALTER COLUMN ${col} DROP NOT NULL;`);
      console.log(`Dropped NOT NULL constraint on ${col} if it existed`);
    } catch (e) { /* Ignore if column doesn't exist */ }
  }

  try {
    await pool.query(`ALTER TABLE grievances ADD COLUMN IF NOT EXISTS consumer_id VARCHAR(100);`);
    console.log("Added consumer_id column");
  } catch (e) { console.error(e); }

  try {
    await pool.query(`ALTER TABLE grievances ADD COLUMN IF NOT EXISTS department department_type NOT NULL DEFAULT 'ELECTRICITY';`);
    console.log("Added department column");
  } catch (e) { console.error(e); }

  try {
    await pool.query(`ALTER TABLE grievances ADD COLUMN IF NOT EXISTS complaint_type complaint_type;`);
    console.log("Added complaint_type column");
  } catch (e) { console.error(e); }

  try {
    await pool.query(`ALTER TABLE grievances ADD COLUMN IF NOT EXISTS description TEXT;`);
    console.log("Added description column");
  } catch (e) { console.error(e); }

  try {
    await pool.query(`ALTER TABLE grievances ADD COLUMN IF NOT EXISTS status grievance_status DEFAULT 'REGISTERED';`);
    console.log("Added status column");
  } catch (e) { console.error(e); }

  try {
    await pool.query(`ALTER TABLE grievances ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;`);
    console.log("Added updated_at column");
  } catch (e) { console.error(e); }

  console.log("Migration completed.");
  process.exit(0);
}
run();

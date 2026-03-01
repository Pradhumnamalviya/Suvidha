# PostgreSQL Database Initialization Guide

This guide explains how to initialize, run, and verify the `schema.sql` for the SUVIDHA OneTouch backend using Dockerized PostgreSQL.

## Method 1: Automatic Initialization (Recommended)

Because of our `docker-compose.yml` configuration, the database schema is **automatically initialized** the very first time you start the database container.

1. Start the database:
   ```bash
   docker compose up -d db
   ```
2. Docker will automatically create the `suvidha` database (based on `POSTGRES_DB=suvidha`) and execute the `server/config/schema.sql` file mapped to `/docker-entrypoint-initdb.d/schema.sql`.

*Note: This automatic execution only happens if the database volume (`pgdata`) is completely empty. If you previously started the container without the schema, you may need to wipe the volume first using `docker compose down -v`.*

---

## Method 2: Manual Initialization

If you need to re-run the schema, apply updates, or if the automatic initialization didn't trigger, you can manually inject the SQL file into the running container.

1. Ensure the database container is running:
   ```bash
   docker compose up -d db
   ```
2. Run the following command from the root of your project to execute the schema:
   ```bash
   docker compose exec -T db psql -U postgres -d suvidha < server/config/schema.sql
   ```
   *(This command pipes your local `schema.sql` file directly into the `psql` CLI inside the `db` container).*

---

## How to Verify the Tables

Once the schema has been executed, you can verify that all tables, enums, and triggers were created successfully by connecting to the PostgreSQL interactive terminal (`psql`).

1. **Connect to the database inside the container:**
   ```bash
   docker compose exec db psql -U postgres -d suvidha
   ```

2. **List all tables:**
   Type the following command and press Enter:
   ```sql
   \dt
   ```
   *You should see a list including `users`, `otp_logs`, `electricity_bills`, `water_bills`, `gas_bills`, `payments`, `grievances`, `admin_users`, and `audit_logs`.*

3. **Verify Custom ENUM Types:**
   Type the following command to list custom data types:
   ```sql
   \dT
   ```
   *You should see `department_type`, `grievance_status`, and `payment_status`.*

4. **Inspect a specific table (e.g., users):**
   Type the following command to see the columns, types, and indexes for the `users` table:
   ```sql
   \d users
   ```

5. **Exit the PostgreSQL terminal:**
   ```sql
   \q
   ```

---

## Troubleshooting

- **Error: "database suvidha does not exist"**
  If you get this error during manual initialization, the `POSTGRES_DB=suvidha` environment variable wasn't picked up. You can create it manually:
  ```bash
  docker compose exec db psql -U postgres -c "CREATE DATABASE suvidha;"
  ```
- **Error: "relation already exists"**
  This means the schema has already been applied. If you want to start fresh, you must drop the tables or wipe the Docker volume:
  ```bash
  docker compose down -v
  docker compose up -d db
  ```

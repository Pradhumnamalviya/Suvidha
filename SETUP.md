# SUVIDHA OneTouch - Local Development Setup Guide

This guide provides step-by-step instructions to set up the SUVIDHA OneTouch backend (Modular Monolith) on your local machine using VS Code, Node.js, and Docker.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:
1. **Node.js**: Version **20.x LTS** (Recommended). Verify with `node -v`.
2. **Docker Desktop**: Required to run PostgreSQL and Redis locally without polluting your host machine. Verify with `docker -v` and `docker compose version`.
3. **VS Code**: Or any preferred code editor.

---

## 🚀 Step 1: Extract and Open the Project

1. Download the project ZIP file and extract it to your desired location.
2. Open your terminal (or command prompt) and navigate to the extracted folder:
   ```bash
   cd path/to/suvidha-onetouch
   ```
3. Open the project in VS Code:
   ```bash
   code .
   ```

---

## ⚙️ Step 2: Configure Environment Variables

The project requires environment variables to connect to the database, sign JWTs, and integrate with third-party services.

1. In the root directory, duplicate the `.env.example` file and rename it to `.env`.
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and ensure the local database and Redis URLs match the Docker configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   
   # Docker local database connection
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/suvidha
   
   # JWT Secret (Change this in production)
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=15m
   
   # Docker local Redis connection
   REDIS_URL=redis://localhost:6379
   ```

---

## 🐳 Step 3: Start Local Infrastructure (Database & Cache)

We use Docker Compose to spin up PostgreSQL and Redis instantly.

1. Open the integrated terminal in VS Code (`Ctrl + ~` or `Cmd + ~`).
2. Start the database and cache containers in detached mode:
   ```bash
   docker compose up -d db redis
   ```
3. Verify the containers are running and healthy:
   ```bash
   docker compose ps
   ```
   *Note: Wait a few seconds for PostgreSQL to initialize and become "healthy".*

---

## 🗄️ Step 4: Initialize the Database Schema

Now that PostgreSQL is running, you need to create the tables, enums, and triggers.

1. Run the following command to inject the `schema.sql` file into the running PostgreSQL container:
   ```bash
   docker compose exec -T db psql -U postgres -d suvidha < server/config/schema.sql
   ```
2. *(Optional)* If you use a database GUI tool like DBeaver or pgAdmin, you can connect to it using:
   - **Host**: `localhost`
   - **Port**: `5432`
   - **Database**: `suvidha`
   - **Username**: `postgres`
   - **Password**: `postgres`

---

## 📦 Step 5: Install Dependencies

Install the required Node.js packages for the backend and frontend.

```bash
npm install
```

---

## ▶️ Step 6: Start the Development Server

Start the application using the development script. This will run the Express API Gateway (and the Vite frontend middleware).

```bash
npm run dev
```

You should see output similar to:
```text
Server running on http://localhost:3000
```

---

## 🧪 Step 7: Test the API

You can test the backend using Postman, Insomnia, or cURL.

**1. Test sending an OTP (Citizen Login):**
```bash
curl -X POST http://localhost:3000/api/v1/auth/send-otp \
-H "Content-Type: application/json" \
-d '{"phoneNumber": "9876543210"}'
```
*Check your VS Code terminal; you will see a `[MOCK SMS]` log with the 6-digit OTP.*

**2. Test verifying the OTP:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/verify-otp \
-H "Content-Type: application/json" \
-d '{"phoneNumber": "9876543210", "otp": "123456"}' # Replace 123456 with the logged OTP
```
*This will return a JWT token and user details.*

---

## 🛑 Stopping the Environment

When you are done developing, you can stop the Docker containers to free up system resources:

```bash
docker compose down
```
*(Note: This stops the containers but preserves your database data in the Docker volume `pgdata`.)* To completely wipe the database and start fresh, use `docker compose down -v`.

import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import apiGateway from "./server/index";

const db = new Database("suvidha.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service TEXT,
    amount REAL,
    status TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS complaints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service TEXT,
    description TEXT,
    status TEXT DEFAULT 'Pending',
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service TEXT,
    name TEXT,
    mobile TEXT,
    address TEXT,
    status TEXT DEFAULT 'Pending',
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mount the new microservices API Gateway
  app.use("/api/v1", apiGateway);

  // Legacy API Routes (SQLite)
  app.get("/api/stats", (req, res) => {
    const totalTransactions = db.prepare("SELECT COUNT(*) as count FROM transactions").get() as { count: number };
    const totalComplaints = db.prepare("SELECT COUNT(*) as count FROM complaints").get() as { count: number };
    const totalApplications = db.prepare("SELECT COUNT(*) as count FROM applications").get() as { count: number };
    const recentTransactions = db.prepare("SELECT * FROM transactions ORDER BY timestamp DESC LIMIT 5").all();
    
    res.json({
      transactions: totalTransactions.count,
      complaints: totalComplaints.count,
      applications: totalApplications.count,
      recent: recentTransactions
    });
  });

  app.post("/api/pay", (req, res) => {
    const { service, amount } = req.body;
    const stmt = db.prepare("INSERT INTO transactions (service, amount, status) VALUES (?, ?, ?)");
    stmt.run(service, amount, "Success");
    res.json({ success: true, transactionId: Math.random().toString(36).substr(2, 9).toUpperCase() });
  });

  app.post("/api/complaint", (req, res) => {
    const { service, description } = req.body;
    const stmt = db.prepare("INSERT INTO complaints (service, description) VALUES (?, ?)");
    stmt.run(service, description);
    res.json({ success: true, complaintId: "CMP-" + Math.random().toString(36).substr(2, 6).toUpperCase() });
  });

  app.post("/api/apply", (req, res) => {
    const { service, name, mobile, address } = req.body;
    const stmt = db.prepare("INSERT INTO applications (service, name, mobile, address) VALUES (?, ?, ?, ?)");
    stmt.run(service, name, mobile, address);
    res.json({ success: true, applicationId: "APP-" + Math.random().toString(36).substr(2, 6).toUpperCase() });
  });

  app.get("/api/analytics/chart", (req, res) => {
    // Mock data for charts
    const data = [
      { name: 'Mon', transactions: 400, complaints: 240 },
      { name: 'Tue', transactions: 300, complaints: 139 },
      { name: 'Wed', transactions: 200, complaints: 980 },
      { name: 'Thu', transactions: 278, complaints: 390 },
      { name: 'Fri', transactions: 189, complaints: 480 },
      { name: 'Sat', transactions: 239, complaints: 380 },
      { name: 'Sun', transactions: 349, complaints: 430 },
    ];
    res.json(data);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve("dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

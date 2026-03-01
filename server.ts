import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

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
`);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ================= API ROUTES =================

// Stats
app.get("/api/stats", (req, res) => {
  const totalTransactions = db.prepare("SELECT COUNT(*) as count FROM transactions").get() as any;
  const totalComplaints = db.prepare("SELECT COUNT(*) as count FROM complaints").get() as any;
  const totalApplications = db.prepare("SELECT COUNT(*) as count FROM applications").get() as any;

  res.json({
    transactions: totalTransactions.count,
    complaints: totalComplaints.count,
    applications: totalApplications.count
  });
});

// Payment
app.post("/api/pay", (req, res) => {
  const { service, amount } = req.body;

  db.prepare("INSERT INTO transactions (service, amount, status) VALUES (?, ?, ?)")
    .run(service, amount, "Success");

  res.json({
    success: true,
    transactionId: Math.random().toString(36).substring(2, 9).toUpperCase()
  });
});

// Complaint
app.post("/api/complaint", (req, res) => {
  const { service, description } = req.body;

  db.prepare("INSERT INTO complaints (service, description) VALUES (?, ?)")
    .run(service, description);

  res.json({
    success: true,
    complaintId: "CMP-" + Math.random().toString(36).substring(2, 6).toUpperCase()
  });
});

// Application
app.post("/api/apply", (req, res) => {
  const { service, name, mobile, address } = req.body;

  db.prepare("INSERT INTO applications (service, name, mobile, address) VALUES (?, ?, ?, ?)")
    .run(service, name, mobile, address);

  res.json({
    success: true,
    applicationId: "APP-" + Math.random().toString(36).substring(2, 6).toUpperCase()
  });
});

// =================================================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

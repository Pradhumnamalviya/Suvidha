import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../../config/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here';
const JWT_EXPIRES_IN = '15m'; // 15 minutes expiry

// ==========================================
// 1. CITIZEN: SEND OTP
// ==========================================
export const sendOtp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Rate Limiting: Max 3 attempts per 5 minutes per phone number
    const rateLimitQuery = `
      SELECT COUNT(*) FROM otp_logs 
      WHERE phone_number = $1 AND created_at > NOW() - INTERVAL '5 minutes'
    `;
    const { rows: rateLimitRows } = await query(rateLimitQuery, [phoneNumber]);
    
    if (parseInt(rateLimitRows[0].count) >= 3) {
      return res.status(429).json({ 
        error: 'Too many attempts. Please try again after 5 minutes.' 
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otp);
    
    // Hash OTP before storing (DPDP Compliance)
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);
    
    // Expiry time: 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60000);

    // Store in DB
    await query(
      `INSERT INTO otp_logs (phone_number, otp_hash, expires_at) VALUES ($1, $2, $3)`,
      [phoneNumber, otpHash, expiresAt]
    );

    // TODO: Integrate actual SMS gateway (e.g., Twilio) here.
    // For development, we log it to the console.
    console.log(`[MOCK SMS] OTP for ${phoneNumber} is: ${otp}`);

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ==========================================
// 2. CITIZEN: VERIFY OTP & LOGIN
// ==========================================
export const verifyOtp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber || !otp) {
      return res.status(400).json({ error: 'Phone number and OTP are required' });
    }

    // Find the latest valid, unused OTP for this number
    const { rows: otpRows } = await query(
      `SELECT id, otp_hash FROM otp_logs 
       WHERE phone_number = $1 AND is_used = FALSE AND expires_at > NOW() 
       ORDER BY created_at DESC LIMIT 1`,
      [phoneNumber]
    );

    if (otpRows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const otpRecord = otpRows[0];
    
    // Verify Hash
    const isValid = await bcrypt.compare(otp, otpRecord.otp_hash);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Mark OTP as used
    await query(`UPDATE otp_logs SET is_used = TRUE WHERE id = $1`, [otpRecord.id]);

    // Upsert User (Create if doesn't exist)
    let { rows: userRows } = await query(`SELECT id FROM users WHERE phone_number = $1`, [phoneNumber]);
    let userId;

    if (userRows.length === 0) {
      const { rows: newUser } = await query(
        `INSERT INTO users (phone_number) VALUES ($1) RETURNING id`,
        [phoneNumber]
      );
      userId = newUser[0].id;
    } else {
      userId = userRows[0].id;
    }

    // Generate JWT (15 mins expiry)
    const token = jwt.sign(
      { id: userId, role: 'CITIZEN', phone_number: phoneNumber }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ 
      message: 'Authentication successful',
      token, 
      user: { id: userId, role: 'CITIZEN', phoneNumber } 
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ==========================================
// 3. ADMIN: EMAIL/PASSWORD LOGIN
// ==========================================
export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const { rows } = await query(
      `SELECT id, password_hash, role, department FROM admin_users WHERE email = $1 AND is_active = TRUE`, 
      [email]
    );
    
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = rows[0];
    
    // Verify password hash
    const isValid = await bcrypt.compare(password, admin.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login timestamp
    await query(`UPDATE admin_users SET last_login = NOW() WHERE id = $1`, [admin.id]);

    // Generate JWT (15 mins expiry)
    const token = jwt.sign(
      { id: admin.id, role: admin.role, email, department: admin.department }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ 
      message: 'Admin authentication successful',
      token, 
      user: { id: admin.id, email, role: admin.role, department: admin.department } 
    });
  } catch (error) {
    console.error('Admin Login Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ==========================================
// 4. GET CURRENT USER (Protected Route)
// ==========================================
export const getMe = async (req: Request, res: Response): Promise<any> => {
  // @ts-ignore - req.user is injected by authenticateToken middleware
  res.json({ user: req.user });
};

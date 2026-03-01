-- SUVIDHA OneTouch - PostgreSQL Schema
-- Designed with Data Minimization (DPDP Act) and Performance in mind.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- ENUM TYPES
-- ==========================================
CREATE TYPE grievance_status AS ENUM ('REGISTERED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED');
CREATE TYPE complaint_type AS ENUM ('OUTAGE', 'METER_FAULT', 'BILLING_ISSUE');
CREATE TYPE department_type AS ENUM ('ELECTRICITY', 'WATER', 'GAS', 'MUNICIPAL', 'TRANSPORT', 'OTHER');
CREATE TYPE payment_status AS ENUM ('SUCCESS', 'FAILED', 'PENDING');

-- ==========================================
-- 1. USERS TABLE
-- DPDP: Store only essential PII. Phone number is the primary identity for kiosk OTPs.
-- ==========================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_number VARCHAR(15) UNIQUE NOT NULL, -- Encrypted/Hashed at application layer if possible, but needed for SMS
    name VARCHAR(100), -- Optional, collected only if necessary
    language_preference VARCHAR(5) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_phone ON users(phone_number);

-- ==========================================
-- 2. OTP LOGS TABLE
-- DPDP: Never store plaintext OTPs. Use hashes. Short retention period.
-- RETENTION POLICY: OTP logs older than 24 hours should be purged via scheduled job.
-- ==========================================
CREATE TABLE otp_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_number VARCHAR(15) NOT NULL,
    otp_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_otp_logs_phone_expires ON otp_logs(phone_number, expires_at);

-- ==========================================
-- 3. ELECTRICITY BILLS TABLE
-- ==========================================
CREATE TABLE electricity_bills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    consumer_number VARCHAR(50) UNIQUE NOT NULL,
    amount_due DECIMAL(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, PAID, OVERDUE
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_elec_bills_user ON electricity_bills(user_id);
CREATE INDEX idx_elec_bills_status ON electricity_bills(status);
CREATE INDEX idx_elec_bills_consumer ON electricity_bills(consumer_number);

-- ==========================================
-- 4. WATER BILLS TABLE
-- ==========================================
CREATE TABLE water_bills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    connection_number VARCHAR(50) UNIQUE NOT NULL,
    amount_due DECIMAL(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_water_bills_user ON water_bills(user_id);
CREATE INDEX idx_water_bills_status ON water_bills(status);
CREATE INDEX idx_water_bills_connection ON water_bills(connection_number);

-- ==========================================
-- 5. GAS BILLS TABLE
-- ==========================================
CREATE TABLE gas_bills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    consumer_number VARCHAR(50) UNIQUE NOT NULL,
    amount_due DECIMAL(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_gas_bills_user ON gas_bills(user_id);
CREATE INDEX idx_gas_bills_status ON gas_bills(status);
CREATE INDEX idx_gas_bills_consumer ON gas_bills(consumer_number);

-- ==========================================
-- 6. PAYMENTS TABLE
-- DPDP: Do not store full card details or UPI PINs. Store only transaction references.
-- ==========================================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    transaction_ref VARCHAR(100) UNIQUE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- UPI, CARD, CASH
    payment_status payment_status NOT NULL,
    -- Nullable Foreign Keys to maintain referential integrity across different bill types
    electricity_bill_id UUID REFERENCES electricity_bills(id) ON DELETE SET NULL,
    water_bill_id UUID REFERENCES water_bills(id) ON DELETE SET NULL,
    gas_bill_id UUID REFERENCES gas_bills(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_exactly_one_bill CHECK (
        (electricity_bill_id IS NOT NULL)::int +
        (water_bill_id IS NOT NULL)::int +
        (gas_bill_id IS NOT NULL)::int = 1
    )
);
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_txn ON payments(transaction_ref);
CREATE INDEX idx_payments_status ON payments(payment_status);

-- ==========================================
-- 7. GRIEVANCES TABLE
-- DPDP: Description should avoid collecting unnecessary PII.
-- ==========================================
CREATE TABLE grievances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    grievance_id VARCHAR(50) UNIQUE NOT NULL,
    consumer_id VARCHAR(100),
    department department_type NOT NULL DEFAULT 'ELECTRICITY',
    complaint_type complaint_type NOT NULL,
    description TEXT NOT NULL,
    status grievance_status DEFAULT 'REGISTERED',
    resolution_remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_grievances_user ON grievances(user_id);
CREATE INDEX idx_grievances_id ON grievances(grievance_id);
CREATE INDEX idx_grievances_dept_status ON grievances(department, status);

-- ==========================================
-- 8. ADMIN USERS TABLE
-- ==========================================
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- SUPER_ADMIN, DEPT_ADMIN, SUPPORT
    department VARCHAR(50), -- Nullable for Super Admins
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_admin_email ON admin_users(email);

-- ==========================================
-- 9. AUDIT LOGS TABLE
-- DPDP: Track who accessed what, but anonymize IP addresses or drop them if not strictly required.
-- ==========================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admin_users(id) ON DELETE SET NULL, -- Who performed the action (if admin)
    user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Who performed the action (if citizen)
    action VARCHAR(100) NOT NULL, -- e.g., 'VIEW_BILL', 'UPDATE_GRIEVANCE', 'LOGIN'
    table_name VARCHAR(50), -- Which table was affected
    record_id UUID, -- The ID of the affected record
    ip_address VARCHAR(45), -- Store hashed/masked IP if DPDP strictness requires
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_audit_admin ON audit_logs(admin_id);
CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created_at ON audit_logs(created_at);

-- ==========================================
-- TRIGGERS FOR UPDATED_AT
-- ==========================================
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_elec_bills_modtime BEFORE UPDATE ON electricity_bills FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_water_bills_modtime BEFORE UPDATE ON water_bills FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_gas_bills_modtime BEFORE UPDATE ON gas_bills FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_grievances_modtime BEFORE UPDATE ON grievances FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_admin_users_modtime BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Enhanced Schema for Techverse 2026 - Registrations and Highlights
-- Add to existing schema

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_number VARCHAR(50) UNIQUE NOT NULL, -- Format: TV2026-XXXX
  
  -- Team Information
  team_name VARCHAR(255) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  institution_type VARCHAR(50) CHECK (institution_type IN ('University', 'College', 'High School', 'Other')),
  
  -- Contact Information
  team_leader_name VARCHAR(255) NOT NULL,
  team_leader_email VARCHAR(255) NOT NULL,
  team_leader_phone VARCHAR(20) NOT NULL,
  alternate_contact VARCHAR(20),
  
  -- Module Selection
  selected_modules JSONB NOT NULL DEFAULT '[]', -- Array of selected module IDs/names
  primary_module VARCHAR(100) NOT NULL,
  
  -- Team Members (excluding leader)
  team_members JSONB NOT NULL DEFAULT '[]', -- Array of {name, email, role, student_id}
  team_size INTEGER NOT NULL DEFAULT 1,
  
  -- Payment Information
  payment_proof_url TEXT,
  payment_amount DECIMAL(10,2),
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'verified', 'failed')),
  payment_date TIMESTAMP WITH TIME ZONE,
  transaction_id VARCHAR(100),
  
  -- Registration Status
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  approval_date TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  approved_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  
  -- Certificate Information
  certificate_id VARCHAR(100) UNIQUE, -- Generated after approval
  certificate_issued BOOLEAN DEFAULT false,
  certificate_issued_date TIMESTAMP WITH TIME ZONE,
  
  -- Additional Information
  special_requirements TEXT,
  dietary_restrictions TEXT,
  accommodation_needed BOOLEAN DEFAULT false,
  tshirt_sizes JSONB DEFAULT '{}', -- {member_name: size}
  
  -- Metadata
  ip_address INET,
  user_agent TEXT,
  referral_source VARCHAR(100),
  
  -- Timestamps
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_team_size CHECK (team_size >= 3 AND team_size <= 5)
);

-- 2. Event Highlights Table (Images/Videos from previous events)
CREATE TABLE IF NOT EXISTS event_highlights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Content Information
  title VARCHAR(255) NOT NULL,
  description TEXT,
  media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('image', 'video', 'youtube')),
  media_url TEXT NOT NULL, -- URL to image/video or YouTube video ID
  thumbnail_url TEXT, -- For videos
  
  -- Event Details
  event_year INTEGER,
  event_name VARCHAR(255),
  category VARCHAR(100), -- e.g., 'Competition', 'Workshop', 'Awards', 'Networking'
  
  -- Display Settings
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  -- Metadata
  uploaded_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Modules Table (Competition Modules)
CREATE TABLE IF NOT EXISTS competition_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Module Information
  module_name VARCHAR(255) NOT NULL UNIQUE,
  module_code VARCHAR(50) UNIQUE,
  icon_emoji VARCHAR(10),
  description TEXT,
  detailed_description TEXT,
  
  -- Technical Details
  skills_required JSONB DEFAULT '[]', -- Array of skills
  difficulty_level VARCHAR(50) CHECK (difficulty_level IN ('Beginner', 'Intermediate', 'Advanced')),
  max_teams INTEGER DEFAULT 50,
  current_registrations INTEGER DEFAULT 0,
  
  -- Module Settings
  is_active BOOLEAN DEFAULT true,
  registration_fee DECIMAL(10,2) DEFAULT 0,
  
  -- Metadata
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Email Logs Table
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,
  
  -- Email Details
  email_type VARCHAR(50) NOT NULL, -- 'approval', 'rejection', 'confirmation', 'reminder'
  recipient_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  body TEXT,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'bounced')),
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_registrations_number ON registrations(registration_number);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(team_leader_email);
CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_registrations_submitted ON registrations(submitted_at);
CREATE INDEX IF NOT EXISTS idx_registrations_primary_module ON registrations(primary_module);

CREATE INDEX IF NOT EXISTS idx_highlights_type ON event_highlights(media_type);
CREATE INDEX IF NOT EXISTS idx_highlights_year ON event_highlights(event_year);
CREATE INDEX IF NOT EXISTS idx_highlights_active ON event_highlights(is_active);
CREATE INDEX IF NOT EXISTS idx_highlights_featured ON event_highlights(is_featured);
CREATE INDEX IF NOT EXISTS idx_highlights_display ON event_highlights(display_order);

CREATE INDEX IF NOT EXISTS idx_modules_active ON competition_modules(is_active);
CREATE INDEX IF NOT EXISTS idx_modules_code ON competition_modules(module_code);

CREATE INDEX IF NOT EXISTS idx_email_logs_registration ON email_logs(registration_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Public Read Access
CREATE POLICY "Public can view active highlights" ON event_highlights
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active modules" ON competition_modules
  FOR SELECT USING (is_active = true);

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_highlights_updated_at BEFORE UPDATE ON event_highlights FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON competition_modules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate registration number
CREATE OR REPLACE FUNCTION generate_registration_number()
RETURNS TRIGGER AS $$
DECLARE
  next_num INTEGER;
  reg_number VARCHAR(50);
BEGIN
  -- Get the next number
  SELECT COUNT(*) + 1 INTO next_num FROM registrations;
  
  -- Format: TV2026-0001
  reg_number := 'TV2026-' || LPAD(next_num::TEXT, 4, '0');
  
  -- Ensure uniqueness
  WHILE EXISTS (SELECT 1 FROM registrations WHERE registration_number = reg_number) LOOP
    next_num := next_num + 1;
    reg_number := 'TV2026-' || LPAD(next_num::TEXT, 4, '0');
  END LOOP;
  
  NEW.registration_number := reg_number;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-generating registration numbers
CREATE TRIGGER generate_reg_number_trigger
BEFORE INSERT ON registrations
FOR EACH ROW
WHEN (NEW.registration_number IS NULL)
EXECUTE FUNCTION generate_registration_number();

-- Function to generate certificate ID
CREATE OR REPLACE FUNCTION generate_certificate_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'approved' AND OLD.status != 'approved' AND NEW.certificate_id IS NULL THEN
    NEW.certificate_id := 'CERT-' || NEW.registration_number || '-' || EXTRACT(YEAR FROM NOW());
    NEW.certificate_issued := false;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-generating certificate IDs
CREATE TRIGGER generate_cert_id_trigger
BEFORE UPDATE ON registrations
FOR EACH ROW
EXECUTE FUNCTION generate_certificate_id();

-- Insert Default Modules
INSERT INTO competition_modules (module_name, module_code, icon_emoji, description, skills_required, difficulty_level, max_teams) VALUES
('Web Development', 'WEB-DEV', '🌐', 'Build modern, responsive web applications', '["HTML5/CSS3", "JavaScript/TypeScript", "React/Next.js", "Tailwind CSS"]', 'Intermediate', 50),
('Mobile App Development', 'MOBILE-DEV', '📱', 'Create cross-platform mobile applications', '["React Native", "Flutter", "iOS/Android", "Mobile UI/UX"]', 'Intermediate', 40),
('AI & Machine Learning', 'AI-ML', '🤖', 'Develop intelligent systems and models', '["Python", "TensorFlow", "Neural Networks", "Data Processing"]', 'Advanced', 30),
('Cloud Computing', 'CLOUD', '☁️', 'Deploy and manage scalable cloud solutions', '["AWS/Azure", "Docker", "Kubernetes", "DevOps"]', 'Advanced', 30),
('Cybersecurity', 'SECURITY', '🔒', 'Secure systems and protect data', '["Network Security", "Encryption", "Penetration Testing", "Security Audits"]', 'Advanced', 25),
('Blockchain', 'BLOCKCHAIN', '⛓️', 'Build decentralized applications', '["Solidity", "Smart Contracts", "Web3.js", "DApp Development"]', 'Advanced', 20),
('IoT Development', 'IOT', '🔌', 'Connect and control smart devices', '["Arduino", "Raspberry Pi", "Sensors", "Embedded Systems"]', 'Intermediate', 30),
('Game Development', 'GAME-DEV', '🎮', 'Design and build interactive games', '["Unity", "Unreal Engine", "C#", "Game Design"]', 'Intermediate', 35),
('Data Science', 'DATA-SCI', '📊', 'Analyze and visualize complex data', '["Python", "Pandas", "Visualization", "Statistical Analysis"]', 'Intermediate', 40),
('UI/UX Design', 'UIUX', '🎨', 'Create beautiful user experiences', '["Figma", "Adobe XD", "Prototyping", "User Research"]', 'Beginner', 50),
('Database Management', 'DATABASE', '💾', 'Design and optimize data storage', '["SQL", "NoSQL", "Database Design", "Query Optimization"]', 'Intermediate', 35),
('API Development', 'API-DEV', '🔗', 'Build robust backend services', '["REST API", "GraphQL", "Node.js", "API Security"]', 'Intermediate', 40)
ON CONFLICT (module_name) DO NOTHING;

-- Create Views
CREATE OR REPLACE VIEW public_modules AS
SELECT 
  id, module_name, module_code, icon_emoji, description, 
  skills_required, difficulty_level, max_teams, current_registrations,
  (max_teams - current_registrations) as available_slots,
  is_active, registration_fee
FROM competition_modules 
WHERE is_active = true 
ORDER BY module_name;

CREATE OR REPLACE VIEW public_highlights AS
SELECT 
  id, title, description, media_type, media_url, thumbnail_url,
  event_year, event_name, category, is_featured, display_order
FROM event_highlights 
WHERE is_active = true 
ORDER BY is_featured DESC, display_order, event_year DESC;

CREATE OR REPLACE VIEW registration_stats AS
SELECT 
  status,
  COUNT(*) as count,
  SUM(team_size) as total_participants
FROM registrations
GROUP BY status;

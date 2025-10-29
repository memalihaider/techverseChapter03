-- Complete Schema for Techverse 2026 Admin System
-- This script creates all necessary tables with proper relationships

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'moderator')),
  permissions JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Sponsors Table
CREATE TABLE IF NOT EXISTS sponsors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  logo_emoji VARCHAR(10),
  description TEXT,
  website VARCHAR(255),
  contact_email VARCHAR(255),
  contact_person VARCHAR(255),
  tier VARCHAR(20) NOT NULL CHECK (tier IN ('Platinum', 'Gold', 'Silver', 'Bronze')),
  tier_order INTEGER DEFAULT 1,
  amount_sponsored DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  social_links JSONB DEFAULT '{}',
  benefits JSONB DEFAULT '{}',
  contract_start_date DATE,
  contract_end_date DATE,
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  position VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL CHECK (department IN ('IT', 'Logistics', 'External Affairs', 'Creative', 'Management', 'Registration', 'Marketing', 'Finance', 'Operations', 'Others')),
  hierarchy VARCHAR(50) NOT NULL CHECK (hierarchy IN ('Organizers', 'Directors', 'Co-Directors', 'Supervisors', 'Leads', 'Team Members', 'Volunteers')),
  hierarchy_order INTEGER DEFAULT 0,
  avatar_url TEXT,
  avatar_emoji VARCHAR(10),
  bio TEXT,
  skills JSONB DEFAULT '[]',
  social_links JSONB DEFAULT '{}',
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  join_date DATE DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Content Management Table (for dynamic sections)
CREATE TABLE IF NOT EXISTS content_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_name VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255),
  subtitle VARCHAR(255),
  description TEXT,
  content JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  updated_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Activity Logs Table (for audit trail)
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100),
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_sponsors_tier ON sponsors(tier);
CREATE INDEX IF NOT EXISTS idx_sponsors_tier_order ON sponsors(tier, tier_order);
CREATE INDEX IF NOT EXISTS idx_sponsors_display_order ON sponsors(display_order);
CREATE INDEX IF NOT EXISTS idx_sponsors_active ON sponsors(is_active);

CREATE INDEX IF NOT EXISTS idx_team_hierarchy ON team_members(hierarchy);
CREATE INDEX IF NOT EXISTS idx_team_department ON team_members(department);
CREATE INDEX IF NOT EXISTS idx_team_hierarchy_order ON team_members(hierarchy, hierarchy_order);
CREATE INDEX IF NOT EXISTS idx_team_display_order ON team_members(display_order);
CREATE INDEX IF NOT EXISTS idx_team_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_team_featured ON team_members(is_featured);

CREATE INDEX IF NOT EXISTS idx_admin_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_active ON admin_users(is_active);

CREATE INDEX IF NOT EXISTS idx_content_section ON content_sections(section_name);
CREATE INDEX IF NOT EXISTS idx_content_active ON content_sections(is_active);

CREATE INDEX IF NOT EXISTS idx_activity_admin ON activity_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_activity_table ON activity_logs(table_name);
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_logs(created_at);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Public Read Access
CREATE POLICY "Public can view active sponsors" ON sponsors
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active team members" ON team_members
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active content" ON content_sections
  FOR SELECT USING (is_active = true);

-- RLS Policies for Admin Management (simplified - no auth dependency)
-- Note: These will need to be updated when auth is properly configured

-- Insert Default Admin User (update with real credentials)
INSERT INTO admin_users (email, full_name, role, permissions) VALUES
('admin@techverse2026.com', 'System Administrator', 'super_admin', '{"manage_users": true, "manage_sponsors": true, "manage_team": true, "manage_content": true}')
ON CONFLICT (email) DO NOTHING;

-- Insert Default Content Sections
INSERT INTO content_sections (section_name, title, subtitle, description, content) VALUES
('hero', 'Techverse 2026', 'Multi-Domain Technology Competition', 'Join the ultimate technology competition featuring 16 different modules from gaming to AI development.', '{}'),
('about', 'About Techverse', 'Empowering Innovation', 'Techverse is a premier technology competition designed to challenge and inspire the next generation of innovators.', '{}'),
('sponsors', 'Our Sponsors', 'Powered by Industry Leaders', 'Partnering with innovative companies to shape the future of technology.', '{}'),
('team', 'Our Team', 'Meet the Dream Team', 'Passionate individuals working together to create an unforgettable experience.', '{}')
ON CONFLICT (section_name) DO NOTHING;

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sponsors_updated_at BEFORE UPDATE ON sponsors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_sections_updated_at BEFORE UPDATE ON content_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create Views for easier querying
CREATE OR REPLACE VIEW public_sponsors AS
SELECT 
  id, name, logo_url, logo_emoji, description, website, tier, 
  tier_order, display_order, social_links, is_active
FROM sponsors 
WHERE is_active = true 
ORDER BY tier_order, display_order, name;

CREATE OR REPLACE VIEW public_team_members AS
SELECT 
  id, name, position, department, hierarchy, hierarchy_order,
  avatar_url, avatar_emoji, bio, skills, social_links, 
  is_active, is_featured, display_order
FROM team_members 
WHERE is_active = true 
ORDER BY hierarchy_order, display_order, name;

CREATE OR REPLACE VIEW featured_team_members AS
SELECT 
  id, name, position, department, hierarchy, hierarchy_order,
  avatar_url, avatar_emoji, bio, skills, social_links, 
  is_active, is_featured, display_order
FROM team_members 
WHERE is_active = true AND is_featured = true
ORDER BY hierarchy_order, display_order, name;
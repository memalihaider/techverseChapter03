-- Sample Data for Techverse 2026 Database
-- Run this AFTER the complete-schema.sql has been executed successfully

-- Insert Sample Sponsors
INSERT INTO sponsors (
  name, logo_emoji, description, website, contact_email, tier, tier_order, 
  amount_sponsored, social_links, benefits, display_order
) VALUES
-- Platinum Sponsors
('TechCorp Solutions', '🏢', 'Leading technology solutions provider with global reach', 'techcorp.com', 'partnerships@techcorp.com', 'Platinum', 1, 50000.00, 
 '{"linkedin": "techcorp-solutions", "twitter": "techcorp"}', 
 '{"booth_space": "Premium", "speaking_slot": true, "logo_placement": "Main stage"}', 1),

-- Gold Sponsors  
('InnovateX', '🥇', 'Innovation and startup accelerator fostering next-gen entrepreneurs', 'innovatex.io', 'sponsor@innovatex.io', 'Gold', 2, 25000.00,
 '{"linkedin": "innovatex", "website": "innovatex.io"}',
 '{"booth_space": "Standard", "workshop_slot": true, "logo_placement": "Event materials"}', 1),

('FutureTech AI', '🔮', 'Cutting-edge AI research and development company', 'futuretech.ai', 'events@futuretech.ai', 'Gold', 2, 25000.00,
 '{"linkedin": "futuretech-ai", "github": "futuretech"}',
 '{"booth_space": "Standard", "demo_slot": true, "logo_placement": "Website"}', 2),

-- Silver Sponsors
('CodeMasters Academy', '🥈', 'Premier coding education platform for developers', 'codemasters.dev', 'hello@codemasters.dev', 'Silver', 3, 10000.00,
 '{"linkedin": "codemasters-academy", "youtube": "codemasters"}',
 '{"booth_space": "Small", "logo_placement": "Program booklet"}', 1),

('DevStudio Pro', '💎', 'Professional software development studio', 'devstudio.tech', 'contact@devstudio.tech', 'Silver', 3, 10000.00,
 '{"linkedin": "devstudio-pro", "dribbble": "devstudio"}',
 '{"logo_placement": "Website footer"}', 2),

('TechHub Global', '🌐', 'International technology community and co-working space', 'techhub.net', 'partnerships@techhub.net', 'Silver', 3, 8000.00,
 '{"linkedin": "techhub-global", "instagram": "techhub"}',
 '{"networking_event": true, "logo_placement": "Social media"}', 3),

('CloudForge Systems', '☁️', 'Enterprise cloud infrastructure and deployment solutions', 'cloudforge.com', 'enterprise@cloudforge.com', 'Silver', 3, 12000.00,
 '{"linkedin": "cloudforge-systems", "twitter": "cloudforge"}',
 '{"technical_workshop": true, "logo_placement": "Technical sessions"}', 4),

('DataSync Analytics', '📊', 'Advanced data analytics and business intelligence platform', 'datasync.io', 'partnerships@datasync.io', 'Silver', 3, 9000.00,
 '{"linkedin": "datasync-analytics", "medium": "datasync"}',
 '{"data_workshop": true, "logo_placement": "Analytics track"}', 5),

('CyberShield Security', '🛡️', 'Comprehensive cybersecurity solutions for modern enterprises', 'cybershield.security', 'events@cybershield.security', 'Silver', 3, 11000.00,
 '{"linkedin": "cybershield-security", "twitter": "cybershield"}',
 '{"security_demo": true, "logo_placement": "Security track"}', 6);

-- Insert Sample Team Members
INSERT INTO team_members (
  name, email, position, department, hierarchy, hierarchy_order, 
  avatar_emoji, bio, skills, social_links, is_featured, display_order
) VALUES
-- Organizers (Featured on homepage)
('Alex Thompson', 'alex@techverse2026.com', 'Chief Organizer', 'Management', 'Organizers', 1, '👨‍💼', 
 'Visionary leader with 8+ years in tech event management. Passionate about creating transformative experiences that inspire innovation and foster collaboration in the technology community.',
 '["Event Management", "Strategic Planning", "Team Leadership", "Stakeholder Relations"]',
 '{"linkedin": "alex-thompson-tech", "github": "alexthompson", "twitter": "alextech2026"}', true, 1),

('Sarah Chen', 'sarah@techverse2026.com', 'Co-Chief Organizer', 'Management', 'Organizers', 1, '👩‍💼',
 'Expert in participant experience design and community building. Focuses on creating inclusive environments where every participant can thrive and showcase their talents.',
 '["Community Building", "UX Design", "Project Management", "Public Speaking"]',
 '{"linkedin": "sarah-chen-events", "twitter": "sarahchen2026", "medium": "sarahchen"}', true, 2),

-- Directors (Featured on homepage)
('Marcus Rodriguez', 'marcus@techverse2026.com', 'Technical Director', 'IT', 'Directors', 2, '👨‍💻',
 'Full-stack architect overseeing all technical infrastructure. Ensures seamless integration of competition platforms and maintains high-performance systems during the event.',
 '["System Architecture", "DevOps", "Cloud Computing", "API Development", "Database Design"]',
 '{"linkedin": "marcus-rodriguez-dev", "github": "marcusrodriguez", "stackoverflow": "marcus-r"}', true, 1),

('Emily Watson', 'emily@techverse2026.com', 'Operations Director', 'Logistics', 'Directors', 2, '👩‍🔧',
 'Operations specialist ensuring flawless event execution. Manages venue coordination, equipment logistics, and operational workflows for optimal participant experience.',
 '["Operations Management", "Logistics Coordination", "Vendor Relations", "Risk Management"]',
 '{"linkedin": "emily-watson-ops", "twitter": "emilywatson2026"}', true, 2),

('David Kim', 'david@techverse2026.com', 'Creative Director', 'Creative', 'Directors', 2, '🎨',
 'Creative visionary leading brand design and visual storytelling. Crafts compelling narratives that showcase the innovation and excitement of Techverse competitions.',
 '["Brand Design", "Visual Communication", "Content Strategy", "Digital Marketing", "Photography"]',
 '{"linkedin": "david-kim-creative", "behance": "davidkim", "twitter": "davidkim2026", "instagram": "davidkim_creative"}', true, 3),

-- Co-Directors
('Lisa Park', 'lisa@techverse2026.com', 'Co-Technical Director', 'IT', 'Co-Directors', 3, '👩‍💻',
 'Senior developer supporting technical operations and platform development. Specializes in frontend technologies and user interface optimization.',
 '["Frontend Development", "React/Next.js", "UI/UX Design", "Performance Optimization"]',
 '{"linkedin": "lisa-park-dev", "github": "lisapark", "twitter": "lisapark_dev"}', false, 1),

('James Wilson', 'james@techverse2026.com', 'Co-Operations Director', 'Logistics', 'Co-Directors', 3, '👨‍🔧',
 'Logistics coordinator assisting with event planning and execution. Focuses on venue setup, equipment management, and on-site coordination.',
 '["Event Coordination", "Venue Management", "Equipment Setup", "Team Coordination"]',
 '{"linkedin": "james-wilson-events", "twitter": "jameswilson2026"}', false, 2),

-- Supervisors
('Anna Martinez', 'anna@techverse2026.com', 'Registration Supervisor', 'Registration', 'Supervisors', 4, '👩‍🏫',
 'Registration specialist overseeing participant onboarding and data management. Ensures smooth registration process and accurate participant records.',
 '["Data Management", "Customer Service", "Process Optimization", "Documentation"]',
 '{"linkedin": "anna-martinez-admin", "email": "anna@techverse2026.com"}', false, 1),

('Robert Brown', 'robert@techverse2026.com', 'External Affairs Supervisor', 'External Affairs', 'Supervisors', 4, '👨‍🤝‍👨',
 'Partnership specialist managing sponsor relations and external collaborations. Builds strategic relationships that enhance event value and reach.',
 '["Partnership Development", "Sponsor Relations", "Contract Negotiation", "Business Development"]',
 '{"linkedin": "robert-brown-partnerships", "twitter": "robertbrown2026", "email": "robert@techverse2026.com"}', false, 2),

-- Leads
('Jennifer Lee', 'jennifer@techverse2026.com', 'IT Lead', 'IT', 'Leads', 5, '👩‍💻',
 'IT support specialist leading technical assistance and infrastructure monitoring. Provides real-time technical support during competitions.',
 '["Technical Support", "Network Administration", "Troubleshooting", "System Monitoring"]',
 '{"linkedin": "jennifer-lee-it", "github": "jenniferlee", "twitter": "jennifer_it"}', false, 1),

('Michael Davis', 'michael@techverse2026.com', 'Logistics Lead', 'Logistics', 'Leads', 5, '👨‍🚚',
 'Logistics coordinator managing venue setup, equipment distribution, and material organization. Ensures all physical aspects run smoothly.',
 '["Logistics Planning", "Inventory Management", "Vendor Coordination", "Setup Management"]',
 '{"linkedin": "michael-davis-logistics", "email": "michael@techverse2026.com"}', false, 2),

('Sophie Johnson', 'sophie@techverse2026.com', 'Creative Lead', 'Creative', 'Leads', 5, '🎭',
 'Content creator and social media specialist. Develops engaging visual content and manages digital presence across all platforms.',
 '["Content Creation", "Social Media Marketing", "Graphic Design", "Video Production"]',
 '{"linkedin": "sophie-johnson-creative", "instagram": "sophie_creates", "twitter": "sophiejohnson", "behance": "sophiejohnson"}', false, 3),

-- Team Members
('Alex Kumar', 'alex.kumar@techverse2026.com', 'Frontend Developer', 'IT', 'Team Members', 6, '👨‍💻',
 'React developer building responsive user interfaces for competition platforms. Focuses on creating intuitive and accessible web applications.',
 '["React", "TypeScript", "CSS", "Responsive Design", "Accessibility"]',
 '{"linkedin": "alex-kumar-frontend", "github": "alexkumar", "twitter": "alexkumar_dev"}', false, 1),

('Maya Patel', 'maya@techverse2026.com', 'Registration Coordinator', 'Registration', 'Team Members', 6, '👩‍💼',
 'Registration assistant helping with participant coordination and data entry. Provides direct support to teams during registration process.',
 '["Customer Service", "Data Entry", "Communication", "Organization"]',
 '{"linkedin": "maya-patel-admin", "email": "maya@techverse2026.com"}', false, 2),

('Chris Taylor', 'chris@techverse2026.com', 'Partnership Coordinator', 'External Affairs', 'Team Members', 6, '👨‍🤝‍👨',
 'Partnership assistant supporting sponsor outreach and relationship management. Helps coordinate sponsor benefits and communications.',
 '["Communication", "Relationship Building", "Event Coordination", "Documentation"]',
 '{"linkedin": "chris-taylor-partnerships", "twitter": "christaylor2026", "email": "chris@techverse2026.com"}', false, 3),

('Priya Sharma', 'priya@techverse2026.com', 'Marketing Coordinator', 'Marketing', 'Team Members', 6, '👩‍📱',
 'Digital marketing specialist managing social media campaigns and online promotion. Creates engaging content to attract participants.',
 '["Digital Marketing", "Social Media", "Content Writing", "SEO", "Analytics"]',
 '{"linkedin": "priya-sharma-marketing", "instagram": "priya_markets", "twitter": "priyasharma2026"}', false, 4),

('Daniel Chang', 'daniel@techverse2026.com', 'Backend Developer', 'IT', 'Team Members', 6, '👨‍⚙️',
 'Node.js developer building robust backend services for competition platforms. Specializes in API development and database optimization.',
 '["Node.js", "PostgreSQL", "API Development", "Database Design", "Docker"]',
 '{"linkedin": "daniel-chang-backend", "github": "danielchang", "stackoverflow": "daniel-chang"}', false, 5);

-- Update tier_order and display_order for proper sorting
UPDATE sponsors SET tier_order = 1 WHERE tier = 'Platinum';
UPDATE sponsors SET tier_order = 2 WHERE tier = 'Gold';
UPDATE sponsors SET tier_order = 3 WHERE tier = 'Silver';
UPDATE sponsors SET tier_order = 4 WHERE tier = 'Bronze';

-- Set contract dates for sponsors (example: 6-month contracts)
UPDATE sponsors SET 
  contract_start_date = '2025-10-01',
  contract_end_date = '2026-04-01'
WHERE tier IN ('Platinum', 'Gold', 'Silver');

-- Insert Sample Event Highlights
INSERT INTO event_highlights (
  title, description, media_type, media_url, thumbnail_url, event_year, event_name, category, is_active, is_featured, display_order
) VALUES
('Opening Ceremony 2024', 'The grand opening of Techverse 2024 with keynote speeches and performances.', 'image', 'https://example.com/images/opening-ceremony.jpg', NULL, 2024, 'Techverse 2024', 'Ceremony', true, true, 1),
('AI Hackathon Winners', 'Celebrating the winners of the AI Hackathon module.', 'image', 'https://example.com/images/ai-hackathon-winners.jpg', NULL, 2024, 'Techverse 2024', 'Competition', true, false, 2),
('Robotics Showdown', 'Highlights from the robotics competition finals.', 'video', 'https://example.com/videos/robotics-showdown.mp4', 'https://example.com/images/robotics-thumb.jpg', 2024, 'Techverse 2024', 'Competition', true, false, 3),
('Keynote: Future of Tech', 'Inspiring keynote on the future of technology by industry leaders.', 'youtube', 'https://www.youtube.com/watch?v=abcdefghijk', 'https://example.com/images/keynote-thumb.jpg', 2024, 'Techverse 2024', 'Keynote', true, true, 4)
ON CONFLICT (title) DO NOTHING;

'use client';
import React, { useEffect, useState } from 'react';

type Highlight = {
  id: string;
  title: string;
  media_url: string;
  media_type: 'image' | 'video' | 'youtube';
  description?: string;
};

export default function HighlightsSection() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/highlights')
      .then(res => res.json())
      .then(data => {
        setHighlights(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading highlights...</div>;
  if (!highlights.length) return <div className="text-center py-10 text-gray-400">No event highlights yet.</div>;

  return (
    <section className="py-16 bg-gradient-to-b from-blue-950 to-blue-900">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">Event Highlights</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map(h => (
            <div key={h.id} className="bg-white/10 rounded-xl shadow-lg p-4 flex flex-col items-center">
              {h.media_type === 'image' && (
                <img src={h.media_url} alt={h.title} className="rounded-lg mb-3 w-full h-48 object-cover" />
              )}
              {h.media_type === 'video' && (
                <video controls className="rounded-lg mb-3 w-full h-48 object-cover">
                  <source src={h.media_url} />
                  Your browser does not support the video tag.
                </video>
              )}
              {h.media_type === 'youtube' && (
                <iframe
                  className="rounded-lg mb-3 w-full h-48"
                  src={h.media_url}
                  title={h.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
              <div className="text-lg font-semibold text-white mb-1">{h.title}</div>
              {h.description && <div className="text-gray-300 text-sm">{h.description}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
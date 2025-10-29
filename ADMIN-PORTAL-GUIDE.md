# Techverse 2026 - Admin Portal Setup Guide

## 🎉 ADMIN CREDENTIALS

**Login URL:** http://localhost:3002/admin/login

**Email:** admin@techverse2026.com  
**Password:** Techverse2026@Admin!

⚠️ **IMPORTANT:** Change this password immediately after first login!

---

## ✅ What Has Been Completed

### 1. **Database Schema**
- ✅ Created `enhanced-schema.sql` with all necessary tables:
  - `registrations` - Team registrations with unique IDs
  - `event_highlights` - Images/videos from previous events
  - `competition_modules` - 12 competition modules
  - `email_logs` - Email tracking
  - All existing tables (sponsors, team_members, admin_users)

### 2. **Admin Authentication System**
- ✅ Secure login with bcrypt password hashing
- ✅ Session management with HTTP-only cookies
- ✅ Middleware protection for admin routes
- ✅ Login page at `/admin/login`
- ✅ Session verification API
- ✅ Logout functionality

### 3. **Admin Portal UI**
- ✅ Admin layout with sidebar navigation
- ✅ Dashboard with statistics cards
- ✅ Quick actions panel
- ✅ Responsive design matching main site theme

### 4. **Registrations Management**
- ✅ View all registrations with filtering (all/pending/approved/rejected)
- ✅ Detailed registration view modal
- ✅ Approve/Reject/Delete actions
- ✅ Payment proof viewing
- ✅ Certificate ID display
- ✅ Team member details

### 5. **Email System**
- ✅ Email service library with templates
- ✅ Approval email template
- ✅ Rejection email template  
- ✅ Confirmation email template
- ✅ Email logging system

### 6. **Setup Scripts**
- ✅ `setup-admin.js` - Creates admin user and modules
- ✅ Auto-generated registration numbers (TV2026-0001, etc.)
- ✅ Auto-generated certificate IDs after approval

---

## 📋 What Still Needs To Be Done

### Critical (Must Complete)
1. **Deploy Database Schema**
   - Go to Supabase SQL Editor
   - Run `scripts/enhanced-schema.sql`
   - This creates registrations, highlights, and modules tables

2. **Create Registration Management APIs**
   - `/api/admin/registrations/route.ts` - List registrations
   - `/api/admin/registrations/[id]/approve/route.ts` - Approve with email
   - `/api/admin/registrations/[id]/reject/route.ts` - Reject with email
   - `/api/admin/registrations/[id]/route.ts` - Delete

3. **Create Sponsors Management**
   - Admin page: `/app/admin/sponsors/page.tsx`
   - API routes: `/api/admin/sponsors/route.ts` and `[id]/route.ts`
   - CRUD operations (Create, Read, Update, Delete)

4. **Create Team Management**
   - Admin page: `/app/admin/team/page.tsx`
   - API routes: `/api/admin/team/route.ts` and `[id]/route.ts`
   - CRUD operations with featured toggle

5. **Create Highlights Management**
   - Admin page: `/app/admin/highlights/page.tsx`
   - API routes: `/api/admin/highlights/route.ts` and `[id]/route.ts`
   - Image/video URL management
   - Featured toggle

6. **Update Registration Form**
   - Fetch modules from database
   - Add payment proof upload (URL input)
   - Module selection with details
   - Form validation

7. **Create Highlights Section on Homepage**
   - Component: `components/HighlightsSection.tsx`
   - Fetch from `/api/highlights`
   - Display images/videos in grid
   - YouTube embed support

### Nice to Have
- Bulk actions for registrations
- Export registrations to CSV
- Analytics dashboard
- Email template customization
- File upload for payment proof (currently URL-based)
- Certificate generation UI

---

## 🗂️ File Structure Created

```
app/
├── admin/
│   ├── layout.tsx                    ✅ Admin layout with sidebar
│   ├── login/
│   │   └── page.tsx                  ✅ Login page
│   ├── dashboard/
│   │   └── page.tsx                  ✅ Dashboard with stats
│   ├── registrations/
│   │   └── page.tsx                  ✅ Registrations management
│   ├── sponsors/
│   │   └── page.tsx                  ❌ TODO
│   ├── team/
│   │   └── page.tsx                  ❌ TODO
│   └── highlights/
│       └── page.tsx                  ❌ TODO
├── api/
│   ├── admin/
│   │   ├── auth/
│   │   │   ├── login/route.ts        ✅ Login API
│   │   │   ├── logout/route.ts       ✅ Logout API
│   │   │   └── session/route.ts      ✅ Session check API
│   │   ├── stats/route.ts            ✅ Dashboard stats API
│   │   ├── registrations/
│   │   │   ├── route.ts              ❌ TODO
│   │   │   └── [id]/
│   │   │       ├── route.ts          ❌ TODO
│   │   │       ├── approve/route.ts  ❌ TODO
│   │   │       └── reject/route.ts   ❌ TODO
│   │   ├── sponsors/
│   │   │   ├── route.ts              ❌ TODO
│   │   │   └── [id]/route.ts         ❌ TODO
│   │   ├── team/
│   │   │   ├── route.ts              ❌ TODO
│   │   │   └── [id]/route.ts         ❌ TODO
│   │   └── highlights/
│   │       ├── route.ts              ❌ TODO
│   │       └── [id]/route.ts         ❌ TODO
│   └── highlights/route.ts           ❌ TODO (public API)
lib/
├── adminAuth.ts                      ✅ Authentication utilities
└── emailService.ts                   ✅ Email templates & sending
middleware.ts                         ✅ Route protection
scripts/
├── enhanced-schema.sql               ✅ Database schema
└── setup-admin.js                    ✅ Admin setup script
```

---

## 🚀 Quick Start Instructions

### 1. Deploy Database Schema
```bash
# Option 1: Run in Supabase SQL Editor
# Copy content from scripts/enhanced-schema.sql
# Paste into Supabase SQL Editor and execute

# Option 2: Use psql (if you have direct DB access)
psql "$SUPABASE_DB_URL" -f scripts/enhanced-schema.sql
```

### 2. Login to Admin Portal
1. Navigate to: http://localhost:3002/admin/login
2. Use credentials above
3. You'll be redirected to dashboard

### 3. Current Features Available
- ✅ View dashboard statistics
- ✅ Navigate between sections
- ✅ View registrations page (needs API)
- ✅ Secure logout

---

## 📝 Next Steps for Development

1. **Run Database Schema** (5 minutes)
   - Essential for all admin features to work

2. **Create Registration APIs** (30 minutes)
   - Most critical for managing participants
   - Includes email sending

3. **Create Sponsors/Team CRUD** (45 minutes each)
   - Admin can add/edit/delete sponsors
   - Admin can manage team members

4. **Create Highlights System** (30 minutes)
   - Add images/videos from previous events
   - Display on homepage

5. **Update Registration Form** (30 minutes)
   - Use real modules from database
   - Add payment proof field

6. **Test Complete Flow** (30 minutes)
   - Register a team
   - View in admin
   - Approve/reject
   - Check emails

---

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ HTTP-only cookies for sessions
- ✅ Route protection with middleware
- ✅ Session expiration (7 days)
- ✅ SQL injection protection (Supabase RLS)
- ✅ Activity logging ready

---

## 📊 Database Tables

### registrations
- Unique registration numbers (TV2026-XXXX)
- Team information
- Module selection
- Payment tracking
- Certificate ID (auto-generated on approval)
- Status workflow (pending → approved/rejected)

### event_highlights
- Media type (image/video/youtube)
- URLs for media content
- Event year and category
- Featured flag
- Display order

### competition_modules
- 12 pre-loaded modules
- Skills required
- Difficulty levels
- Team capacity tracking

---

## 🎯 Module List (Pre-loaded)

1. Web Development (🌐)
2. Mobile App Development (📱)
3. AI & Machine Learning (🤖)
4. Cloud Computing (☁️)
5. Cybersecurity (🔒)
6. Blockchain (⛓️)
7. IoT Development (🔌)
8. Game Development (🎮)
9. Data Science (📊)
10. UI/UX Design (🎨)
11. Database Management (💾)
12. API Development (🔗)

---

## 📧 Email Templates Included

1. **Approval Email**
   - Congratulations message
   - Registration number
   - Certificate ID
   - Next steps

2. **Rejection Email**
   - Professional message
   - Reason for rejection
   - Contact information
   - Future opportunities

3. **Confirmation Email**
   - Registration received
   - Under review status
   - Expected timeline

---

## 🛠️ Technologies Used

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** bcryptjs, HTTP-only cookies
- **Email:** Template-based (ready for SendGrid/SES integration)

---

## 📌 Important Notes

1. Email sending is currently logged to database only
   - Integrate SendGrid, AWS SES, or similar service for production
   - Update `lib/emailService.ts` with actual sending logic

2. Payment proof is URL-based
   - Consider adding file upload with cloud storage
   - Supabase Storage integration recommended

3. Session management is basic
   - Consider JWT for production
   - Add refresh token mechanism

4. Admin user management not included
   - Only one super admin created
   - Add user management page if needed

---

## 🆘 Troubleshooting

### Can't login?
- Check if admin user exists in Supabase
- Run `node scripts/setup-admin.js` again
- Verify environment variables in `.env.local`

### Database errors?
- Ensure `enhanced-schema.sql` was run in Supabase
- Check Supabase connection in `.env.local`
- Verify RLS policies are enabled

### Session expires immediately?
- Check cookie settings in browser
- Verify middleware.ts is working
- Check session timestamp validation

---

This setup provides a solid foundation for the admin portal. Complete the remaining API routes and pages to have a fully functional system!

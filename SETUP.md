# Quick Setup Guide

Your project is now a **lightweight dashboard** with simple authentication and reporting!

## ✅ What You Have

- ✅ **Login page** with hardcoded access code (`KERRY2025`)
- ✅ **Home dashboard** with clickable report cards
- ✅ **Kerry Leasing Customer Spend** page with full data display
- ✅ **3 GET APIs** with 20-hour caching
- ✅ **PostgreSQL + Prisma** for data storage
- ✅ **Simple, lightweight architecture**

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

Create a `.env` file in `packages/server/`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/kerrybros?schema=public"
PORT=3001
NODE_ENV=development
```

### 3. Run Migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

When prompted, name your migration (e.g., "init").

### 4. Start Development

```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Login**: Use access code `KERRY2025`

## 📊 How It Works

### Login Flow
1. Enter access code on login page (validated in frontend)
2. Redirects to home dashboard
3. Session stored in localStorage

### Dashboard
- Home page shows available reports as cards
- Click any card to open report in new tab
- Currently available: **Kerry Leasing Customer Spend**

### APIs
- 3 GET endpoints serve data to frontend
- Data is cached for 20 hours (minimal DB calls)
- Click "Refresh Data" to force reload

## 🔧 Configuration

### Change Access Code
Edit `packages/web/src/pages/LoginPage.tsx`:
```typescript
const ACCESS_CODE = 'KERRY2025'; // Change this
```

### Add More Reports
1. Add API endpoint in `packages/server/src/controllers/leasingController.js`
2. Add route in `packages/server/src/routes/leasingRoutes.js`
3. Create page in `packages/web/src/pages/`
4. Add to `App.tsx` routing
5. Add card to `HomePage.tsx`

## 📦 Project Structure

```
packages/
├── web/              # React frontend
│   ├── LoginPage     # Access code entry
│   ├── HomePage      # Dashboard hub
│   └── KerryLeasingPage  # Customer spend report
│
└── server/           # Express backend
    ├── cache.js      # 20-hour cache
    ├── leasingController.js  # 3 GET APIs
    └── prisma/       # Database
```

## 🗄️ Database

### Add Sample Data

Use Prisma Studio to add test data:

```bash
npm run prisma:studio
```

Or use SQL:

```sql
INSERT INTO customer_spend (id, customer_name, customer_id, total_spend, last_updated, created_at)
VALUES 
  ('1', 'ABC Trucking', 'CUST001', 125000.00, NOW(), NOW()),
  ('2', 'XYZ Logistics', 'CUST002', 87500.50, NOW(), NOW());
```

## 🎯 Next Steps

- Add sample data to database
- Test the login flow
- View Kerry Leasing report
- Add more reports as needed

See README.md for full documentation!

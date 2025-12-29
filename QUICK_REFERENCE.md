# Quick Reference - Kerry Bros Dashboard

## 🎯 What This Is

A **lightweight internal dashboard** for viewing Kerry Leasing customer spend data.

- **Frontend**: React 19 + Vite + TypeScript
- **Backend**: Express + Prisma + PostgreSQL
- **Auth**: Simple access code (frontend only)
- **Cache**: 20-hour in-memory cache

---

## 🚀 Getting Started (3 Steps)

```bash
# 1. Install
npm install

# 2. Configure database
cd packages/server
# Create .env with: DATABASE_URL="postgresql://..."

# 3. Setup & Run
cd ../..
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

**Login**: http://localhost:3000 with code `KERRY2025`

---

## 📂 Project Structure

```
kerrybros-internal/
├── packages/
│   ├── web/                      # Frontend
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx          # Access code login
│   │   │   │   ├── HomePage.tsx           # Dashboard hub
│   │   │   │   └── KerryLeasingPage.tsx   # Customer report
│   │   │   ├── hooks/useData.ts           # API hook
│   │   │   └── utils/types.ts             # TypeScript types
│   │   └── package.json
│   │
│   └── server/                   # Backend
│       ├── src/
│       │   ├── index.js                   # Express app
│       │   ├── cache.js                   # 20hr cache
│       │   ├── controllers/
│       │   │   └── leasingController.js   # 3 APIs
│       │   └── routes/
│       │       └── leasingRoutes.js       # Routes
│       ├── prisma/schema.prisma           # DB schema
│       └── package.json
│
└── package.json                  # Workspace config
```

---

## 🔌 API Endpoints

| Endpoint | Description | Cache |
|----------|-------------|-------|
| `GET /api/leasing/customer-spend` | Customer spending details | 20hr |
| `GET /api/leasing/summary` | Daily summaries (30 days) | 20hr |
| `GET /api/leasing/stats` | Quick statistics | 20hr |

---

## 🗄️ Database Models

### CustomerSpend
```typescript
{
  id: string
  customerName: string
  customerId: string (unique)
  totalSpend: number
  lastUpdated: Date
}
```

### DailySummary
```typescript
{
  id: string
  date: Date (unique)
  totalRevenue: number
  recordCount: number
}
```

---

## ⚙️ Configuration

### Access Code
📍 `packages/web/src/pages/LoginPage.tsx`
```typescript
const ACCESS_CODE = 'KERRY2025'; // Change this
```

### Cache Duration
📍 `packages/server/src/cache.js`
```javascript
export default new SimpleCache(20); // hours
```

### Database
📍 `packages/server/.env`
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/kerrybros"
PORT=3001
```

---

## 📝 Common Commands

```bash
# Development
npm run dev              # Start both frontend & backend
npm run dev:web          # Frontend only (port 3000)
npm run dev:server       # Backend only (port 3001)

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open database GUI

# Production
npm run build            # Build both packages
npm run build:web        # Build frontend only
npm run build:server     # Build backend only
```

---

## 🎨 Pages

### 1. Login (`/login`)
- Enter access code
- Validates in frontend
- Redirects to home on success

### 2. Home (`/home`)
- Shows available reports as cards
- Click to open in new tab
- Logout button in header

### 3. Kerry Leasing (`/kerry-leasing`)
- Summary stats (3 cards)
- Customer data table
- Refresh button
- Currency formatting

---

## 🔄 User Flow

```
1. Visit http://localhost:3000
   ↓
2. Redirected to /login
   ↓
3. Enter code: KERRY2025
   ↓
4. Redirected to /home (dashboard)
   ↓
5. Click "Kerry Leasing Customer Spend"
   ↓
6. Opens /kerry-leasing in new tab
   ↓
7. View customer data & stats
```

---

## 🛠️ Adding New Reports

1. **Add Database Model** (`packages/server/prisma/schema.prisma`)
2. **Migrate**: `npm run prisma:migrate`
3. **Add Controller** (`leasingController.js`)
4. **Add Route** (`leasingRoutes.js`)
5. **Create Page** (`packages/web/src/pages/NewPage.tsx`)
6. **Add Route** (`App.tsx`)
7. **Add Card** (`HomePage.tsx`)

---

## 🐛 Troubleshooting

**Login not working?**
- Check access code in `LoginPage.tsx`
- Clear localStorage: `localStorage.clear()`

**API errors?**
- Check backend is running (port 3001)
- Verify database connection in `.env`
- Check console for errors

**Data not loading?**
- Add sample data via Prisma Studio
- Check API response in Network tab
- Verify Prisma schema is migrated

---

## 📚 Documentation Files

- **README.md** - Complete documentation
- **SETUP.md** - Quick setup guide
- **BUILD_SUMMARY.md** - Build details
- **This file** - Quick reference

---

**Status**: ✅ Ready to use!  
**Version**: 1.0.0  
**Last Updated**: December 2025


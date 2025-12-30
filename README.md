# Kerry Bros Internal - Lightweight Dashboard

A minimal React + Express + Prisma application for internal reporting and analytics.

## Tech Stack

### Frontend (`packages/web/`)
- **React 19** with TypeScript
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- Simple access code authentication (frontend only)

### Backend (`packages/server/`)
- **Node.js** with Express.js
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Relational database
- **20-hour caching** - Minimal API calls
- JavaScript ES modules

## Project Structure

```
kerrybros-internal/
├── packages/
│   ├── web/                    # React frontend
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx         # Access code login
│   │   │   │   ├── HomePage.tsx          # Dashboard hub
│   │   │   │   └── KerryLeasingPage.tsx  # Customer spend report
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── utils/          # Types
│   │   │   └── App.tsx         # Main app with routing
│   │   └── package.json
│   │
│   └── server/                 # Express backend
│       ├── src/
│       │   ├── controllers/    # Business logic
│       │   │   └── leasingController.js  # 3 GET APIs
│       │   ├── routes/         # API endpoints
│       │   ├── cache.js        # 20-hour cache
│       │   ├── prisma.js       # Prisma client
│       │   └── index.js        # Server entry
│       └── prisma/
│           └── schema.prisma   # Database schema
│
└── package.json                # Root workspace config
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. **Install dependencies**

```bash
npm install
```

2. **Set up the database**

```bash
cd packages/server
```

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/kerrybros?schema=public"
PORT=3001
NODE_ENV=development
```

3. **Run Prisma migrations**

```bash
cd ../..
npm run prisma:generate
npm run prisma:migrate
```

### Development

**Run both frontend and backend:**

```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Access Code**: `KERRY2025` (hardcoded in frontend)

## Features

### 🔐 Simple Authentication
- Access code login (frontend validation only)
- Session stored in localStorage
- No complex user management

### 📊 Dashboard
- Clean home page with report cards
- Click to open reports in new tabs
- Currently available: **Kerry Leasing Customer Spend**

### ⚡ Lightweight Backend
- 3 simple GET APIs
- 20-hour data caching
- Minimal database queries
- Fully automated updates

## API Endpoints

All endpoints are prefixed with `/api/leasing`:

- `GET /api/leasing/customer-spend` - Customer spending details
- `GET /api/leasing/summary` - Daily summary (last 30 days)
- `GET /api/leasing/stats` - Quick statistics

## Database Models

### CustomerSpend
```prisma
model CustomerSpend {
  id           String   @id @default(cuid())
  customerName String
  customerId   String   @unique
  totalSpend   Float
  lastUpdated  DateTime @default(now())
  createdAt    DateTime @default(now())
}
```

### DailySummary
```prisma
model DailySummary {
  id          String   @id @default(cuid())
  date        DateTime @unique
  totalRevenue Float
  recordCount Int
  createdAt   DateTime @default(now())
}
```

## Cache Behavior

- **Cache Duration**: 20 hours
- **Automatic**: Data is cached on first request
- **Refresh**: Click "Refresh Data" button on any page
- **Console Logs**: See cache hits in server console

## Adding New Reports

1. **Backend**: Add a new controller function in `packages/server/src/controllers/leasingController.js`
2. **Backend**: Add route in `packages/server/src/routes/leasingRoutes.js`
3. **Frontend**: Create a new page in `packages/web/src/pages/`
4. **Frontend**: Add route in `packages/web/src/App.tsx`
5. **Frontend**: Add card in `HomePage.tsx`

## Available Scripts

From the root:

- `npm run dev` - Start both frontend and backend
- `npm run dev:web` - Start frontend only
- `npm run dev:server` - Start backend only
- `npm run build` - Build both packages
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## Environment Variables

### Backend (packages/server/.env)
```env
DATABASE_URL="postgresql://..."
PORT=3001
NODE_ENV=development
```

### Frontend
Access code is hardcoded in `LoginPage.tsx` (change `ACCESS_CODE` constant)

## Production Deployment

```bash
npm run build
```

- Frontend build: `packages/web/dist`
- Serve frontend with any static host (Vercel, Netlify, etc.)
- Deploy backend to any Node.js host (Railway, Render, etc.)

### Render Deployment Notes

**Cache Persistence Issue**: Render uses ephemeral filesystems, meaning the cache file (`packages/server/data/customer-spend.json`) is **wiped on every deployment or restart**. To mitigate this:

1. **Automatic Cache Initialization**: The server now automatically populates the cache on startup if it's empty
2. **Daily Cron Job**: Set up a Render Cron Job to refresh the cache daily at 6 AM EST
3. **Health Check**: Use `GET /api/health` to monitor cache status

### Setting Up Render Cron Job

**IMPORTANT**: Render Cron Jobs are rate-limited by Render's infrastructure. If you see "Too Many Requests (429)" errors:

1. **Option A: Use Render Cron Jobs** (Recommended if on paid plan)
   - Go to Render Dashboard > Your Web Service
   - Add a Cron Job
   - Schedule: `0 11 * * *` (6 AM EST = 11 AM UTC)
   - Command: 
     ```bash
     curl -X POST https://YOUR_APP.onrender.com/api/admin/refresh-cache \
       -H "Authorization: Bearer YOUR_REFRESH_TOKEN" \
       -H "Content-Type: application/json"
     ```
   - Set `REFRESH_TOKEN` environment variable in your Render service

2. **Option B: Use External Cron Service** (Recommended for free tier)
   - Use [cron-job.org](https://cron-job.org) or [EasyCron](https://www.easycron.com/)
   - Schedule: Daily at 6:00 AM EST
   - URL: `https://YOUR_APP.onrender.com/api/admin/refresh-cache`
   - Method: POST
   - Headers:
     - `Authorization: Bearer YOUR_REFRESH_TOKEN`
     - `Content-Type: application/json`

**Why external is better for free tier**: Render's internal rate limiting can block requests from Render Cron Jobs, but external services are less likely to trigger this.

### Environment Variables for Production

```env
DATABASE_URL="postgresql://..."
PORT=3001
NODE_ENV=production
REFRESH_TOKEN="your-secure-token-here"  # For cron job authentication
```

## Troubleshooting

### Issue: "No Data Available" or Empty Cache

**Symptoms**:
- Webpage shows "No customer data found"
- API returns 503 or empty data
- Server logs show "⚠️ Cache is empty"

**Root Cause**: Render's ephemeral filesystem wipes the cache file on every restart/deployment.

**Solutions**:
1. **Automatic**: The server now automatically populates cache on startup (new in this version)
2. **Manual**: Call the refresh endpoint manually:
   ```bash
   curl -X POST https://YOUR_APP.onrender.com/api/admin/refresh-cache \
     -H "Authorization: Bearer YOUR_REFRESH_TOKEN" \
     -H "Content-Type: application/json"
   ```
3. **Check Health**: Visit `https://YOUR_APP.onrender.com/api/health` to see cache status

### Issue: Cron Job Returns "Too Many Requests (429)"

**Root Cause**: Render's infrastructure rate limits requests, even from its own cron jobs.

**Solutions**:
1. **Use External Cron Service**: Switch to cron-job.org or EasyCron (recommended)
2. **Add Delays**: If using Render Cron, add a small delay before the curl command:
   ```bash
   sleep 5 && curl -X POST ...
   ```
3. **Reduce Frequency**: Ensure cron runs only once per day

### Issue: Unauthorized (401) on Refresh Endpoint

**Root Cause**: Missing or incorrect `REFRESH_TOKEN` environment variable.

**Solution**: Set the `REFRESH_TOKEN` environment variable in Render dashboard and use the same token in your cron job's Authorization header.

### Monitoring Cache Status

Check if your cache is populated:

```bash
curl https://YOUR_APP.onrender.com/api/health
```

Response:
```json
{
  "status": "ok",
  "message": "Server is running",
  "cacheStatus": "populated",  // or "empty"
  "lastUpdated": "2024-12-30T11:00:00.000Z"
}
```

## License

Private - Kerry Brothers Truck Repair

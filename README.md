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

## License

Private - Kerry Brothers Truck Repair

# System Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React 19)                       │
│                   http://localhost:3000                      │
├─────────────────────────────────────────────────────────────┤
│  LoginPage.tsx         Access code: KERRY2025               │
│       │                                                      │
│       ▼                                                      │
│  HomePage.tsx          Dashboard with report cards          │
│       │                                                      │
│       ▼                                                      │
│  KerryLeasingPage.tsx  Customer spend report                │
│       │                                                      │
│       │ (Fetch data via /api/leasing/*)                     │
└───────┼─────────────────────────────────────────────────────┘
        │
        │ HTTP Request
        ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Express)                         │
│                   http://localhost:3001                      │
├─────────────────────────────────────────────────────────────┤
│  Routes                                                      │
│    GET /api/leasing/customer-spend                          │
│    GET /api/leasing/summary                                 │
│    GET /api/leasing/stats                                   │
│       │                                                      │
│       ▼                                                      │
│  Controllers                                                 │
│    Check Cache (20hr TTL)                                   │
│       │                                                      │
│       ├─ Cache Hit? ──> Return cached data                  │
│       │                                                      │
│       └─ Cache Miss ──> Query Database                      │
│                              │                               │
│                              ▼                               │
│                        Store in Cache                        │
│                              │                               │
│                              ▼                               │
│                        Return data                           │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ Prisma ORM
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                       │
├─────────────────────────────────────────────────────────────┤
│  Tables:                                                     │
│    - customer_spend                                          │
│    - daily_summary                                           │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Login Flow
```
User
  │
  ├─> Enters access code "KERRY2025"
  │
  ├─> Frontend validates (LoginPage.tsx)
  │
  ├─> Stores "isLoggedIn=true" in localStorage
  │
  └─> Redirects to /home
```

### Data Fetch Flow
```
User clicks "Kerry Leasing Customer Spend"
  │
  ├─> Opens /kerry-leasing in new tab
  │
  ├─> useData() hook calls API
  │     │
  │     └─> GET /api/leasing/customer-spend
  │           │
  │           ├─> Backend checks cache
  │           │     │
  │           │     ├─ Hit? Return immediately ✓
  │           │     │
  │           │     └─ Miss? Query PostgreSQL
  │           │           │
  │           │           ├─> Fetch from customer_spend table
  │           │           │
  │           │           └─> Cache for 20 hours
  │           │
  │           └─> Return JSON data
  │
  └─> KerryLeasingPage displays table + stats
```

## Cache Strategy

```
┌──────────────────────────────────────────────────────────┐
│                      Cache Layer                          │
│                  (20-hour in-memory)                      │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  Key: "customer-spend"                                   │
│  Value: [...customer data...]                            │
│  Timestamp: 2025-12-29 10:00:00                          │
│  Expires: 2025-12-30 06:00:00                            │
│                                                           │
│  ┌─────────────────────────────────────┐                │
│  │  On Request:                        │                │
│  │  1. Check if key exists             │                │
│  │  2. Check if expired (> 20hrs)      │                │
│  │  3. If valid: return cached value   │                │
│  │  4. If expired/missing: fetch DB    │                │
│  └─────────────────────────────────────┘                │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

## Authentication Strategy

```
┌────────────────────────────────────────┐
│       Frontend Only (Simple)           │
├────────────────────────────────────────┤
│                                        │
│  1. Hardcoded access code              │
│     const ACCESS_CODE = 'KERRY2025'    │
│                                        │
│  2. Local validation                   │
│     if (code === ACCESS_CODE) { ... }  │
│                                        │
│  3. localStorage persistence           │
│     localStorage.setItem(              │
│       'isLoggedIn', 'true'             │
│     )                                  │
│                                        │
│  4. Route protection                   │
│     isAuthenticated ?                  │
│       <Page /> :                       │
│       <Navigate to="/login" />        │
│                                        │
└────────────────────────────────────────┘

Note: No backend authentication
      (suitable for internal use only)
```

## Component Hierarchy

```
App.tsx (Router + Auth Guard)
  │
  ├─> LoginPage
  │     └─> Hardcoded access code validation
  │
  ├─> HomePage
  │     └─> Report cards grid
  │           └─> Click opens new tab
  │
  └─> KerryLeasingPage
        ├─> useData hook (API call)
        ├─> Summary stats (3 cards)
        └─> Data table
```

## Tech Stack Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│    React 19 + TypeScript + Tailwind     │
│  (LoginPage, HomePage, KerryLeasing)    │
└─────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│          Application Layer              │
│     React Router + Custom Hooks         │
│         (useData, localStorage)         │
└─────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│              API Layer                  │
│     Express Routes + Controllers        │
│          (REST endpoints)               │
└─────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│            Cache Layer                  │
│      SimpleCache (20hr in-memory)       │
└─────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│          Data Access Layer              │
│         Prisma ORM (TypeSafe)           │
└─────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│          Persistence Layer              │
│      PostgreSQL Database Tables         │
└─────────────────────────────────────────┘
```

## Deployment Architecture

```
Production Setup:

┌─────────────────────────┐
│    Static Host          │
│  (Vercel/Netlify)       │
│                         │
│  Frontend Build         │
│  packages/web/dist/     │
└─────────────────────────┘
            │
            │ API Calls
            ▼
┌─────────────────────────┐
│   Node.js Host          │
│  (Railway/Render)       │
│                         │
│  Backend Server         │
│  packages/server/       │
└─────────────────────────┘
            │
            │ Database Connection
            ▼
┌─────────────────────────┐
│  PostgreSQL Service     │
│  (Neon/Supabase)        │
│                         │
│  Production Database    │
└─────────────────────────┘
```

---

**Key Design Decisions:**

1. ✅ **Frontend Auth** - Simple, no backend complexity
2. ✅ **20hr Cache** - Matches daily data update cycle
3. ✅ **Monorepo** - Clean separation, easy development
4. ✅ **Minimal APIs** - Only 3 endpoints, focused purpose
5. ✅ **PostgreSQL** - Production-ready, scalable
6. ✅ **Prisma** - Type-safe, easy migrations


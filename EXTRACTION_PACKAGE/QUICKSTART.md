# 🚀 QUICKSTART GUIDE

Get the Lookups Dashboard running in your project in **5 minutes**.

## Prerequisites

- React project (18.x or higher)
- Node.js & npm
- Tailwind CSS (we'll set it up if you don't have it)

---

## Step 1: Copy Files (30 seconds)

```bash
# From within your project directory
# Copy this EXTRACTION_PACKAGE folder into your src directory

# Option A: Manual copy (Windows)
# Just drag the EXTRACTION_PACKAGE folder into your src/ folder

# Option B: Command line (PowerShell)
Copy-Item -Recurse "path\to\EXTRACTION_PACKAGE" "src\lookups"

# Option C: Command line (Mac/Linux)
cp -r /path/to/EXTRACTION_PACKAGE ./src/lookups
```

Your project structure should now look like:
```
your-project/
├── src/
│   ├── lookups/                    # ← New folder
│   │   ├── components/
│   │   ├── hooks/
│   │   └── ...
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

---

## Step 2: Install Dependencies (1 minute)

```bash
# Install React (if not already installed)
npm install react react-dom

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p
```

---

## Step 3: Configure Tailwind (1 minute)

**File: `tailwind.config.js`**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // ← Make sure this line exists
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**File: `src/index.css`** (create if it doesn't exist)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**File: `src/main.tsx` or `src/index.tsx`**

Make sure you're importing the CSS:

```typescript
import './index.css';  // ← Add this line at the top
```

---

## Step 4: Update API URL (30 seconds)

**File: `src/lookups/hooks/useIntegratedDataFromDBOptimized.ts`**

Find line 4 and update it to your API URL:

```typescript
// Change this:
const API_BASE_URL = 'https://kerry-fleet-saas.onrender.com';

// To your API URL:
const API_BASE_URL = 'https://your-api-url.com';
// Or use environment variable:
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

---

## Step 5: Add to Your App (1 minute)

**Option A: Simple (no routing)**

**File: `src/App.tsx`**

```typescript
import LookupsPage from './lookups/components/LookupsPage';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <LookupsPage />
    </div>
  );
}

export default App;
```

**Option B: With React Router**

```bash
npm install react-router-dom
```

**File: `src/App.tsx`**

```typescript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LookupsPage from './lookups/components/LookupsPage';

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-white shadow p-4">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/lookups">Lookups</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/lookups" element={<LookupsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## Step 6: Run Your App (10 seconds)

```bash
npm run dev
```

Navigate to your app (usually `http://localhost:5173` or `http://localhost:3000`)

✅ **Done!** The Lookups Dashboard should now be running.

---

## 🔧 Common Issues

### Issue: "Module not found"

**Solution**: Check your import paths. If you copied the folder to a different location, update the import:

```typescript
// Update this to match where you put the files
import LookupsPage from './lookups/components/LookupsPage';
```

### Issue: Styles not loading / Everything looks broken

**Solution**: 
1. Make sure `@tailwind` directives are in `src/index.css`
2. Make sure you're importing `index.css` in your entry file
3. Check that `tailwind.config.js` content array includes your files
4. Restart your dev server

### Issue: "Failed to load data" or network errors

**Solution**: 
1. Check the API_BASE_URL in the hook
2. Make sure your API is running and accessible
3. Check browser console for CORS errors
4. Verify API endpoints exist: `/api/snapshot/line-items` and `/api/customer-units`

### Issue: TypeScript errors

**Solution**:
1. Make sure TypeScript is installed: `npm install -D typescript @types/react @types/react-dom`
2. Check that file extensions are `.tsx` not `.jsx`
3. See full error messages and consult `README.md` for detailed info

---

## 🎯 Next Steps

Now that it's running:

1. **Customize the look**: Edit Tailwind classes in component files
2. **Adjust date ranges**: See `LookupsPage.tsx` lines 15-16
3. **Modify filters**: See `LookupsFilterPanel.tsx`
4. **Add authentication**: See `INTEGRATION_EXAMPLE.tsx` for examples
5. **Review full docs**: Check `README.md` and `API_REQUIREMENTS.md`

---

## 📚 File Reference

- `README.md` - Comprehensive documentation
- `API_REQUIREMENTS.md` - API endpoint specifications
- `INTEGRATION_EXAMPLE.tsx` - More integration examples
- `SAMPLE_DATA.json` - Sample data structure for testing
- `package-dependencies.json` - Complete dependency list

---

## 🆘 Still Need Help?

Check the main `README.md` for detailed troubleshooting, or review the original project source code.

**Happy coding! 🎉**


# 🤖 PROMPT FOR CURSOR/AI ASSISTANT

Copy and paste this prompt when you've dropped the EXTRACTION_PACKAGE folder into your project:

---

**PROMPT START:**

I've just copied a complete Lookups Dashboard extraction package into this project. The folder is located at `src/EXTRACTION_PACKAGE/` (or wherever you placed it).

Here's what you need to do:

1. **Review the package structure**: All files are in the `EXTRACTION_PACKAGE/` folder, including:
   - `components/` - 4 React components (LookupsPage, LookupsFilterPanel, MultiSelectDropdown, SelectedItemsBadge)
   - `hooks/` - 1 custom hook (useIntegratedDataFromDBOptimized)
   - `types/` - TypeScript type definitions
   - Documentation files (README.md, QUICKSTART.md, API_REQUIREMENTS.md, INTEGRATION_EXAMPLE.tsx)

2. **Read the documentation first**: Start with `EXTRACTION_PACKAGE/START_HERE.md` for navigation, then review `QUICKSTART.md` for step-by-step setup.

3. **Check dependencies**: The package requires:
   - React 18+ (already have it)
   - Tailwind CSS 3.4+ (check if installed)
   - TypeScript (if project uses it)

4. **Configure Tailwind CSS** (if not already configured):
   - Update `tailwind.config.js` content array to include the new component paths
   - Ensure Tailwind directives (`@tailwind base;`, etc.) are in your main CSS file

5. **Update the API URL** (REQUIRED):
   - File: `EXTRACTION_PACKAGE/hooks/useIntegratedDataFromDBOptimized.ts`
   - Line 4: Change `API_BASE_URL` to match this project's API endpoint
   - Or update it to use environment variables if that's how this project handles API URLs

6. **Integrate into the app**:
   - Add the component to your routing or main app file
   - Import: `import LookupsPage from './EXTRACTION_PACKAGE/components/LookupsPage';`
   - Use: `<LookupsPage />`
   - See `EXTRACTION_PACKAGE/INTEGRATION_EXAMPLE.tsx` for 6 different integration patterns

7. **Required API endpoints**: The dashboard needs these endpoints (see `API_REQUIREMENTS.md` for full specs):
   - `GET /api/snapshot/line-items` (or `/api/revenue/paginated`)
   - `GET /api/customer-units`

8. **Verify everything works**:
   - Check that all imports resolve correctly
   - Verify Tailwind styles are loading
   - Test data fetching from the API
   - Check browser console for any errors

**Important Notes:**
- The component is fully self-contained and requires no props
- All styling uses Tailwind CSS classes
- The hook handles data fetching, caching, and error handling internally
- Review `API_REQUIREMENTS.md` to ensure your API returns data in the expected format

**Documentation Files to Reference:**
- `START_HERE.md` - Navigation guide
- `QUICKSTART.md` - 5-minute setup (start here!)
- `README.md` - Full documentation
- `API_REQUIREMENTS.md` - Complete API specifications
- `INTEGRATION_EXAMPLE.tsx` - Code examples for integration
- `MANIFEST.md` - Complete file inventory

Please integrate this Lookups Dashboard into the project, following the documentation, and ensure everything is properly configured and working.

**PROMPT END**

---

## Alternative Shorter Prompt

If you prefer a shorter version:

**SHORT PROMPT:**

I've added a Lookups Dashboard package to this project in the `EXTRACTION_PACKAGE/` folder. Please:

1. Read `EXTRACTION_PACKAGE/QUICKSTART.md` for setup instructions
2. Install any missing dependencies (React 18+, Tailwind CSS)
3. Configure Tailwind CSS if needed
4. Update the API URL in `hooks/useIntegratedDataFromDBOptimized.ts` (line 4) to match this project's API
5. Integrate the `LookupsPage` component into the app (see `INTEGRATION_EXAMPLE.tsx` for examples)
6. Verify everything works

All documentation is in the `EXTRACTION_PACKAGE/` folder - start with `START_HERE.md` and `QUICKSTART.md`.


# Step 9 — Phonebook frontend + backend (single deployable)

The backend serves both the REST API **and** the built React frontend, so a
single Node process is all that gets deployed (e.g. on Render).

## Layout

- `backend/` — Express API + serves `dist/` as static files
- `frontend/` — Part 2 phonebook React app (source)
- `backend/dist/` — production build of the frontend, copied from `frontend/dist`

The frontend's API service uses the relative URL `/api/persons`, so it works
both in dev (via Vite proxy) and in production (same origin as backend).

## Production build / run (single server)

```bash
# 1. build the frontend
cd frontend
npm install
npm run build

# 2. copy the build into the backend
cd ..
rm -rf backend/dist
cp -r frontend/dist backend/dist

# 3. start the backend — it now serves the SPA at /
cd backend
npm install
npm start
```

Open http://localhost:3001 — the React UI loads and talks to `/api/persons` on
the same origin.

## Dev mode (two servers, hot reload)

```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — Vite dev server with proxy to :3001
cd frontend && npm run dev
```

Open http://localhost:5173.

> Updating an existing person's number is intentionally still broken — that's
> exercise 3.17.

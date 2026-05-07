# Step 11 — Full Stack Phonebook (Render)

Single Render Web Service that serves **both** the React frontend and the
Express REST API on the same origin.

## Live URL

**https://fullstack-h2cn.onrender.com**

- App: https://fullstack-h2cn.onrender.com
- API list: https://fullstack-h2cn.onrender.com/api/persons
- Info: https://fullstack-h2cn.onrender.com/info

## Layout

```
step11/
├── index.js          ← Express backend (serves API + dist)
├── package.json      ← backend deps + build:ui script
├── dist/             ← production build of the frontend (committed!)
└── frontend/         ← React source (Part 2 phonebook)
```

The frontend's `services/persons.js` uses the relative URL `/api/persons`, so
the same code works both in dev (Vite proxy) and in production (same origin
as the backend).

## Render configuration

| Field          | Value                      |
| -------------- | -------------------------- |
| Root Directory | `Phonebook-backend/step11` |
| Runtime        | Node                       |
| Build Command  | `npm install`              |
| Start Command  | `npm start`                |
| Instance Type  | Free                       |

> **Important:** the `dist/` directory **must be committed to git** so Render
> can serve it. The `.gitignore` here intentionally does **not** ignore
> `dist`.

## Workflow

### Local development (two servers, hot reload)

```bash
# terminal 1 – backend
npm install
npm run dev          # http://localhost:3001

# terminal 2 – Vite dev server with proxy → :3001
cd frontend
npm install
npm run dev          # http://localhost:5173
```

### Build for production / before pushing

```bash
npm run build:ui     # builds frontend and copies dist/ next to index.js
git add dist
git commit -m "rebuild frontend"
git push             # Render auto-redeploys
```

### Run production locally

```bash
npm start            # http://localhost:3001 serves UI + API
```

## Endpoints

- `GET  /` — React app
- `GET  /api/persons` — list
- `GET  /api/persons/:id` — single (404 if missing)
- `POST /api/persons` — create
- `DELETE /api/persons/:id` — remove
- `GET  /info` — count + timestamp

> Updating an existing person's number is exercise 3.17 (not yet implemented).

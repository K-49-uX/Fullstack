# Step 10 — Phonebook backend deployed to Render

This is the **deployable backend** for exercise 3.10. The whole repo is pushed
to GitHub, but Render is configured to build/run **only this folder** via the
"Root Directory" setting.

## Live URL

> Replace this once the Render deploy is up:
> **https://YOUR-APP-NAME.onrender.com**

Endpoints to test:

- `GET /api/persons` — list all phonebook entries
- `GET /api/persons/:id` — single entry (404 if missing)
- `GET /info` — count + timestamp
- `POST /api/persons` — JSON body `{ "name": "...", "number": "..." }`
- `DELETE /api/persons/:id` — remove an entry

## Render configuration

When creating the Web Service on https://dashboard.render.com:

| Field              | Value                                          |
| ------------------ | ---------------------------------------------- |
| Repository         | your GitHub repo (must be public or connected) |
| Branch             | `main` (or whichever you push to)              |
| **Root Directory** | `Phonebook-backend/step10`                     |
| Runtime            | Node                                           |
| Build Command      | `npm install`                                  |
| Start Command      | `npm start`                                    |
| Instance Type      | Free                                           |

Render injects the `PORT` env var automatically — `index.js` reads it via
`process.env.PORT`.

## Local run

```bash
npm install
npm start          # production mode
npm run dev        # auto-restart on changes
```

Then http://localhost:3001/api/persons.

## Notes

- Data is in-memory; restarting the Render service resets the list. The
  database arrives in step 12 (exercise 3.13+).
- The frontend is added in step 11 (exercise 3.11). For now this is API-only.

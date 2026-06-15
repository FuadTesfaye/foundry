# create-foundry CLI

Beautiful terminal and web-based CLI for scaffolding Foundry SaaS projects.

## Features

- **Terminal CLI** — Colorful gradient `FOUNDRY` ASCII banner, interactive `@clack/prompts` wizard
- **Express Web Wizard** — Browser-based setup at `http://localhost:4040` with live terminal preview
- **Non-interactive mode** — Pass all flags for CI/CD automation
- **Scaffolding** — Generates `.env.example`, `platform.config.ts`, deploy configs

## Install & Build

```bash
cd cli
npm install
npm run build
```

## Terminal CLI

```bash
# Interactive wizard
npx create-foundry@latest

# Non-interactive
npx create-foundry@latest \
  --name my-saas \
  --auth authjs \
  --db neon \
  --queue inngest \
  --login-layout illustration \
  --style sharp \
  --deploy vercel \
  --modules auth,payments,teams
```

## Express Web Wizard

```bash
cd cli
npm run dev
# → http://localhost:4040
```

The web UI features:
- Animated gradient **FOUNDRY** logo
- 9-step configuration wizard
- Live terminal preview
- Copyable `npx` command
- Bundle / time-saved estimates
- One-click scaffold

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/options` | All wizard options |
| POST | `/api/session` | Create wizard session |
| PATCH | `/api/session/:id` | Update config |
| GET | `/api/session/:id/preview` | Preview command & env |
| POST | `/api/session/:id/scaffold` | Scaffold project |
| POST | `/api/test/:service` | Test connection (format validation) |
| GET | `/health` | Health check |

## Design

- Rainbow gradient ASCII art banner (cyan → purple → pink → amber → green)
- Dark terminal aesthetic matching the Foundry landing page
- Floating glow orbs, film grain, grid background
- JetBrains Mono + Inter typography

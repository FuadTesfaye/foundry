# Foundry

The complete Next.js SaaS starter kit — marketing site and documentation.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript 5
- Tailwind CSS v4 · Radix UI primitives
- Geist Mono typography · UnicornStudio hero animation

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Full landing page with hero, features, stack configurator, pricing, FAQ |
| `/docs` | Documentation hub |
| `/docs/quick-start` | Quick start guide |
| `/docs/setup` | Web setup wizard docs |
| `/docs/auth` | Authentication |
| `/docs/billing` | Payments & billing |
| `/docs/ai` | AI workflows |
| `/docs/deployment` | Deploy targets |

## Project structure

```
src/
├── app/                    # Next.js routes
│   ├── page.tsx            # Landing page
│   └── docs/               # Documentation
├── components/
│   ├── landing/            # Marketing sections
│   ├── docs/               # Docs layout components
│   └── ui/                 # Shared UI primitives
├── data/docs.ts            # Documentation content
└── lib/config.ts           # Platform config (plans, modules, etc.)
```

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
npm run cli:build  # Build create-foundry CLI
npm run cli:dev    # Start Express web wizard at :4040
```

## CLI (`create-foundry`)

Interactive terminal wizard + Express web setup UI:

```bash
cd cli && npm install && npm run build

# Terminal CLI (colorful FOUNDRY banner)
node cli/dist/index.js

# Express web wizard → http://localhost:4040
npm run cli:dev
```

See [cli/README.md](cli/README.md) for full docs.

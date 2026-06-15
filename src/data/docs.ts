export type DocSection = {
  title: string;
  slug: string;
  description?: string;
  content: DocBlock[];
};

export type DocBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; variant: "tip" | "warning" | "note" | "important"; title?: string; text: string }
  | { type: "steps"; items: { title: string; body: string }[] }
  | { type: "links"; items: { title: string; href: string; description: string }[] };

export const docsNav = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", slug: "" },
      { title: "Quick Start", slug: "quick-start" },
      { title: "CLI Reference", slug: "cli" },
      { title: "Setup Wizard", slug: "setup" },
      { title: "Configuration", slug: "configuration" },
    ],
  },
  {
    title: "Core",
    items: [
      { title: "Authentication", slug: "auth" },
      { title: "Payments & Billing", slug: "billing" },
      { title: "AI Workflows", slug: "ai" },
      { title: "Background Jobs", slug: "jobs" },
    ],
  },
  {
    title: "Platform",
    items: [
      { title: "API Reference", slug: "api" },
      { title: "Deployment", slug: "deployment" },
      { title: "Testing", slug: "testing" },
      { title: "Changelog", slug: "changelog" },
    ],
  },
] as const;

export const docsContent: Record<
  string,
  { title: string; description: string; sections: DocSection[] }
> = {
  "": {
    title: "Introduction",
    description:
      "Foundry is a production-ready Next.js SaaS starter where every integration is connected before you write business logic.",
    sections: [
      {
        title: "What is Foundry?",
        slug: "what-is-foundry",
        content: [
          {
            type: "paragraph",
            text: "Foundry ships auth, payments, AI workflows, background jobs, admin dashboards, and analytics as one connected system — not a folder of disconnected templates. You scaffold with the CLI, connect services in the setup wizard, and start building product features on day one.",
          },
          {
            type: "callout",
            variant: "important",
            title: "Core idea",
            text: "Most starters give you 40 environment variables and a wiki. Foundry gives you a working app in 15 minutes with live connection tests for every integration.",
          },
          {
            type: "heading",
            level: 2,
            text: "Who is this for?",
          },
          {
            type: "list",
            items: [
              "Indie hackers shipping their first SaaS and need auth + Stripe working today",
              "Agencies white-labeling client products with module marketplace",
              "Startup teams that want to skip the two-week infrastructure sprint",
              "Developers evaluating SaaS stacks before committing to a architecture",
            ],
          },
        ],
      },
      {
        title: "Prerequisites",
        slug: "prerequisites",
        content: [
          {
            type: "list",
            items: [
              "Node.js 20+ and npm/pnpm",
              "A Neon (or Postgres) database — free tier works",
              "Stripe account in test mode",
              "Resend account for transactional email",
              "Optional: OpenAI/Anthropic key if enabling AI module",
            ],
          },
          {
            type: "callout",
            variant: "tip",
            text: "You don't need all services on day one. Scaffold with auth + teams only, then enable payments and AI later from platform.config.ts.",
          },
        ],
      },
      {
        title: "Tech stack",
        slug: "tech-stack",
        content: [
          {
            type: "table",
            headers: ["Layer", "Technology", "Why"],
            rows: [
              ["Framework", "Next.js 15 App Router", "RSC, streaming, edge-ready"],
              ["Language", "TypeScript 5 strict", "End-to-end type safety"],
              ["UI", "shadcn/ui + Tailwind v4", "Accessible, themeable components"],
              ["Database", "Neon Postgres + Drizzle", "Serverless, migrations, branches"],
              ["Auth", "Auth.js v5", "OAuth, magic link, 2FA, passkeys"],
              ["Payments", "Stripe", "Checkout, portal, metered billing"],
              ["AI", "Vercel AI SDK", "Streaming, tool calls, multi-provider"],
              ["Jobs", "Inngest", "Durable steps, retries, cron"],
              ["API", "tRPC + Hono", "Internal RPC + public REST/OpenAPI"],
            ],
          },
        ],
      },
      {
        title: "Next steps",
        slug: "next-steps",
        content: [
          {
            type: "links",
            items: [
              { title: "Quick Start", href: "/docs/quick-start", description: "Scaffold and run locally in 15 minutes" },
              { title: "CLI Reference", href: "/docs/cli", description: "Terminal wizard and Express web UI" },
              { title: "Setup Wizard", href: "/docs/setup", description: "Connect every service with live tests" },
              { title: "Configuration", href: "/docs/configuration", description: "platform.config.ts explained" },
            ],
          },
        ],
      },
    ],
  },

  "quick-start": {
    title: "Quick Start",
    description: "Go from zero to a running SaaS locally in about 15 minutes.",
    sections: [
      {
        title: "Before you begin",
        slug: "before-you-begin",
        content: [
          {
            type: "callout",
            variant: "note",
            text: "This guide assumes macOS/Linux/WSL. Windows works — use Git Bash or WSL for the CLI.",
          },
        ],
      },
      {
        title: "Step-by-step",
        slug: "step-by-step",
        content: [
          {
            type: "steps",
            items: [
              {
                title: "Scaffold your project",
                body: "Run the interactive CLI or pass flags for CI. Pick only the modules you need — unused code is stripped automatically.",
              },
              {
                title: "Install dependencies",
                body: "cd into your project and run npm install. The CLI generates .env.example with only the variables your modules require.",
              },
              {
                title: "Start the dev server",
                body: "npm run dev boots Next.js at localhost:3000. You'll be redirected to /setup if required env vars are missing.",
              },
              {
                title: "Connect services",
                body: "Open /setup and paste your Neon, Stripe, and Resend credentials. Hit Test on each card — green means the connection works.",
              },
              {
                title: "Create your admin account",
                body: "After all integrations pass, complete setup to run migrations, seed data, and create the first superadmin user.",
              },
              {
                title: "Build your product",
                body: "Visit /app/dashboard for the customer app and /admin/dashboard for platform metrics. Start writing features, not wiring Stripe.",
              },
            ],
          },
        ],
      },
      {
        title: "Commands",
        slug: "commands",
        content: [
          {
            type: "code",
            language: "bash",
            code: `# Interactive wizard
npx create-foundry@latest

# Non-interactive (CI / scripts)
npx create-foundry@latest \\
  --name my-saas \\
  --auth authjs \\
  --db neon \\
  --queue inngest \\
  --login-layout illustration \\
  --style sharp \\
  --deploy vercel \\
  --modules auth,payments,teams

# Start developing
cd my-saas
npm install
npm run dev`,
          },
        ],
      },
      {
        title: "Verify it works",
        slug: "verify",
        content: [
          {
            type: "list",
            items: [
              "http://localhost:3000 — marketing site loads",
              "http://localhost:3000/setup — setup wizard shows integration cards",
              "http://localhost:3000/login — auth page with your chosen layout",
              "http://localhost:3000/api/health — returns { status: 'ok' }",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            title: "Stuck?",
            text: "If /setup shows red on a service, read the exact error message — it comes from a real API call, not a generic 'invalid key'. See the Setup Wizard guide for per-service troubleshooting.",
          },
        ],
      },
    ],
  },

  cli: {
    title: "CLI Reference",
    description: "Foundry ships two ways to scaffold: a colorful terminal CLI and an Express web wizard.",
    sections: [
      {
        title: "Terminal CLI",
        slug: "terminal-cli",
        description: "Best for local development and scripting.",
        content: [
          {
            type: "paragraph",
            text: "create-foundry uses @clack/prompts for a polished terminal experience with a rainbow gradient FOUNDRY banner. Every choice updates your generated npx command, .env.example, and platform.config.ts.",
          },
          {
            type: "code",
            language: "bash",
            code: `# From the foundry repo
cd cli && npm install && npm run build
node dist/index.js

# All flags (non-interactive)
node dist/index.js \\
  --name my-saas \\
  --auth authjs \\
  --db neon \\
  --ai openai \\
  --queue inngest \\
  --login-layout illustration \\
  --style sharp \\
  --deploy vercel \\
  --modules auth,payments,ai,teams`,
          },
          {
            type: "table",
            headers: ["Flag", "Values", "Default"],
            rows: [
              ["--name", "my-saas-app", "prompted"],
              ["--modules", "auth,payments,ai,teams,...", "auth,payments,teams"],
              ["--auth", "authjs, clerk, better-auth, supabase", "authjs"],
              ["--db", "neon, supabase, postgres, planetscale", "neon"],
              ["--ai", "openai, anthropic, groq, google, multi", "openai"],
              ["--queue", "inngest, bullmq, qstash", "inngest"],
              ["--login-layout", "centered-card, split-screen, illustration, ...", "illustration"],
              ["--style", "rounded, sharp, outline, gradient", "sharp"],
              ["--deploy", "vercel, railway, fly, render, vps", "vercel"],
            ],
          },
        ],
      },
      {
        title: "Web wizard (Express)",
        slug: "web-wizard",
        description: "Best for exploring options visually.",
        content: [
          {
            type: "code",
            language: "bash",
            code: `cd cli
npm run dev
# → http://localhost:4040`,
          },
          {
            type: "paragraph",
            text: "The Express server serves a browser-based 9-step wizard with live terminal preview, copyable npx command, bundle estimates, and one-click scaffold.",
          },
          {
            type: "table",
            headers: ["Endpoint", "Method", "Purpose"],
            rows: [
              ["/api/options", "GET", "All wizard choices"],
              ["/api/session", "POST", "Create config session"],
              ["/api/session/:id", "PATCH", "Update configuration"],
              ["/api/session/:id/preview", "GET", "Preview command & env"],
              ["/api/session/:id/scaffold", "POST", "Generate project files"],
              ["/api/test/:service", "POST", "Validate credential format"],
              ["/health", "GET", "Server health check"],
            ],
          },
        ],
      },
      {
        title: "What gets generated",
        slug: "generated-files",
        content: [
          {
            type: "list",
            items: [
              "platform.config.ts — locked-in module and provider choices",
              ".env.example — only variables for enabled modules, grouped with comments",
              "Deploy config — vercel.json, railway.toml, fly.toml, etc.",
              "README.md — project-specific quick start",
              "Stripped routes/schemas for disabled modules",
            ],
          },
        ],
      },
    ],
  },

  setup: {
    title: "Setup Wizard",
    description: "Connect Stripe, Neon, Resend, and AI providers with live connection tests at /setup.",
    sections: [
      {
        title: "How it works",
        slug: "how-it-works",
        content: [
          {
            type: "paragraph",
            text: "When any required environment variable is missing, middleware redirects you to /setup. Each integration card has labeled inputs, a Test button, and a status line showing the exact API response.",
          },
          {
            type: "callout",
            variant: "tip",
            text: "Tests make real, cheap API calls — SELECT 1 for Postgres, accounts.retrieve() for Stripe, a 1-token ping for OpenAI. You see the real error, not 'something went wrong'.",
          },
        ],
      },
      {
        title: "Setup flow",
        slug: "setup-flow",
        content: [
          {
            type: "steps",
            items: [
              { title: "Enter credentials", body: "Paste keys into each card. Values stay in memory until you complete setup — nothing is written to disk until you confirm." },
              { title: "Test each service", body: "Click Test. Green = connected with latency. Red = exact error message from the provider." },
              { title: "Complete setup", body: "When all cards are green, click Complete Setup. This writes .env.local, runs migrations, seeds the DB, and prompts for your admin email." },
              { title: "First login", body: "Check your email for the magic link or use the credentials you set. You land on /admin/dashboard as superadmin." },
            ],
          },
        ],
      },
      {
        title: "Environment variables",
        slug: "env-variables",
        content: [
          {
            type: "table",
            headers: ["Variable", "Required when", "Where to get it"],
            rows: [
              ["DATABASE_URL", "Always", "Neon dashboard → Connection string"],
              ["AUTH_SECRET", "Auth module", "openssl rand -base64 32"],
              ["STRIPE_SECRET_KEY", "Payments", "Stripe dashboard → Developers → API keys"],
              ["STRIPE_WEBHOOK_SECRET", "Payments", "Stripe CLI or dashboard webhooks"],
              ["RESEND_API_KEY", "Email", "resend.com → API Keys"],
              ["OPENAI_API_KEY", "AI module", "platform.openai.com → API keys"],
              ["INNGEST_EVENT_KEY", "Inngest queue", "Inngest dashboard → Manage → Keys"],
              ["GOOGLE_CLIENT_ID", "Google OAuth", "Google Cloud Console → OAuth credentials"],
            ],
          },
        ],
      },
      {
        title: "Troubleshooting",
        slug: "troubleshooting",
        content: [
          {
            type: "table",
            headers: ["Error", "Likely cause", "Fix"],
            rows: [
              ["Invalid API key (Stripe)", "Wrong key or live key in dev", "Use sk_test_... keys in development"],
              ["Connection refused (DB)", "Wrong URI or IP allowlist", "Use Neon pooled connection string with ?sslmode=require"],
              ["Webhook secret invalid", "Copied signing secret from wrong endpoint", "Run stripe listen --forward-to localhost:3000/api/webhooks/stripe"],
              ["Resend: invalid format", "Key doesn't start with re_", "Create new API key in Resend dashboard"],
            ],
          },
        ],
      },
    ],
  },

  configuration: {
    title: "Configuration",
    description: "platform.config.ts is the single source of truth for modules, providers, plans, and UI presets.",
    sections: [
      {
        title: "Platform config",
        slug: "platform-config",
        content: [
          {
            type: "paragraph",
            text: "The CLI generates this file. Change a value here and the entire app updates — pricing page, checkout, plan gating, nav items, and env requirements all derive from it.",
          },
          {
            type: "code",
            language: "typescript",
            code: `// platform.config.ts
export const platform = {
  app: {
    name: 'My SaaS',
    url: process.env.NEXT_PUBLIC_APP_URL!,
    supportEmail: 'support@mysaas.com',
  },
  modules: {
    auth: true,
    payments: true,
    ai: false,
    teams: true,
    blog: false,
  },
  auth: {
    provider: 'authjs',
    providers: ['google', 'github', 'magic-link'],
  },
  ui: {
    loginLayout: 'illustration',
    stylePreset: 'sharp',
  },
  billing: {
    provider: 'stripe',
    plans: [/* synced to pricing page */],
  },
  deployment: { target: 'vercel' },
} as const

// Guard module-specific code
export function featureEnabled(module: keyof typeof platform.modules) {
  return platform.modules[module]
}`,
          },
        ],
      },
      {
        title: "Common changes",
        slug: "common-changes",
        content: [
          {
            type: "table",
            headers: ["Goal", "What to change"],
            rows: [
              ["Enable AI later", "modules.ai = true, add OPENAI_API_KEY, redeploy"],
              ["Swap auth to Clerk", "auth.provider = 'clerk', add Clerk env vars"],
              ["Change login design", "ui.loginLayout = 'split-screen'"],
              ["Update pricing", "billing.plans array — propagates everywhere"],
              ["White-label for client", "app.name, app.url, ui.accentColor"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "After changing modules, run the module sync script or re-scaffold disabled routes. The admin module marketplace can toggle modules at runtime without redeploy.",
          },
        ],
      },
    ],
  },

  auth: {
    title: "Authentication",
    description: "Auth.js v5 with 5 login layouts, OAuth, magic links, 2FA, and passkeys.",
    sections: [
      {
        title: "Supported flows",
        slug: "providers",
        content: [
          {
            type: "table",
            headers: ["Flow", "Provider", "Notes"],
            rows: [
              ["Email + password", "Credentials", "bcrypt, lockout after 5 failures"],
              ["Magic link", "Resend", "15-min expiry, single-use token"],
              ["Google OAuth", "Google", "Auto-links if email matches"],
              ["GitHub OAuth", "GitHub", "Configurable in platform.config.ts"],
              ["TOTP 2FA", "otplib", "QR setup + recovery codes"],
              ["Passkeys", "WebAuthn", "Face ID, fingerprint, hardware keys"],
              ["SSO (Enterprise)", "SAML", "Enterprise plan only"],
            ],
          },
        ],
      },
      {
        title: "Protecting routes",
        slug: "protecting-routes",
        content: [
          {
            type: "code",
            language: "typescript",
            code: `// Server Component
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')
  // ...
}

// Server Action
import { requireAuth } from '@/lib/auth'

export async function createProject(data: FormData) {
  const user = await requireAuth()
  // ...
}`,
          },
        ],
      },
      {
        title: "Login layouts",
        slug: "login-layouts",
        content: [
          {
            type: "paragraph",
            text: "Set ui.loginLayout in platform.config.ts. All five layouts share the same Auth.js logic — only the visual shell changes.",
          },
          {
            type: "list",
            items: [
              "centered-card — Logo + form centered on subtle pattern",
              "split-screen — Form left, hero image right",
              "illustration — Form + animated SVG (default)",
              "minimal — Form only, maximum focus",
              "fullscreen-image — Glass card over full-bleed background",
            ],
          },
        ],
      },
    ],
  },

  billing: {
    title: "Payments & Billing",
    description: "Stripe Checkout, Customer Portal, metered usage, and subscription gating.",
    sections: [
      {
        title: "Stripe setup checklist",
        slug: "stripe-checklist",
        content: [
          {
            type: "steps",
            items: [
              { title: "Create products", body: "In Stripe dashboard, create products matching your billing.plans in platform.config.ts. Copy price IDs into the config." },
              { title: "Set webhook endpoint", body: "Point to /api/webhooks/stripe. Required events: checkout.session.completed, customer.subscription.updated, invoice.payment_failed." },
              { title: "Test locally", body: "Run stripe listen --forward-to localhost:3000/api/webhooks/stripe and copy the webhook signing secret to STRIPE_WEBHOOK_SECRET." },
              { title: "Verify checkout", body: "Use test card 4242 4242 4242 4242. Confirm subscription appears in /app/billing and admin dashboard MRR updates." },
            ],
          },
        ],
      },
      {
        title: "Usage tracking",
        slug: "usage-tracking",
        content: [
          {
            type: "code",
            language: "typescript",
            code: `import { billing } from '@/lib/billing'

// Track any metered metric — synced to Stripe nightly
await billing.trackUsage('ai_tokens', {
  amount: tokensUsed,
  userId: session.user.id,
  teamId: session.user.teamId,
})

// Gate features by plan
import { requirePlan } from '@/lib/billing'
await requirePlan('pro') // throws if not on Pro`,
          },
          {
            type: "callout",
            variant: "tip",
            text: "The usage-billing-sync Inngest job runs nightly and reports unreported usage to Stripe automatically.",
          },
        ],
      },
      {
        title: "What's included",
        slug: "billing-features",
        content: [
          {
            type: "list",
            items: [
              "Stripe Checkout with Apple Pay, Google Pay, iDEAL, SEPA",
              "Customer Portal for self-service plan changes",
              "requirePlan() server guard and <PlanGate> client component",
              "4-step dunning email sequence on payment failure",
              "Annual/monthly toggle on pricing page from one config",
              "Stripe Tax for automatic regional tax calculation",
            ],
          },
        ],
      },
    ],
  },

  ai: {
    title: "AI Workflows",
    description: "Vercel AI SDK with streaming, tool calls, and a visual workflow builder.",
    sections: [
      {
        title: "Getting started",
        slug: "ai-getting-started",
        content: [
          {
            type: "steps",
            items: [
              { title: "Enable the module", body: "Set modules.ai = true in platform.config.ts and add your provider API key during /setup." },
              { title: "Set budgets", body: "Each plan has aiTokens limit in billing.plans. Calls are blocked when exceeded, not just logged." },
              { title: "First streaming call", body: "Use the /api/ai/chat route or the pre-built <AIChat> component with useChat() from the AI SDK." },
              { title: "Build a workflow", body: "Visit /app/workflows/new for the drag-and-drop builder. Start from a template: Support Triage, Content Generator, or Document Q&A." },
            ],
          },
        ],
      },
      {
        title: "Streaming API",
        slug: "streaming-api",
        content: [
          {
            type: "code",
            language: "typescript",
            code: `// app/api/ai/chat/route.ts
import { streamText } from 'ai'
import { defaultModel } from '@/lib/ai/gateway'

export async function POST(req: Request) {
  const { messages, userId, teamId } = await req.json()
  await enforceTokenBudget(userId, teamId)

  const result = streamText({
    model: defaultModel,
    messages,
    onFinish: async ({ usage }) => {
      await billing.trackUsage('ai_tokens', {
        amount: usage.totalTokens,
        userId, teamId,
      })
    },
  })
  return result.toDataStreamResponse()
}`,
          },
        ],
      },
      {
        title: "Workflow nodes",
        slug: "workflow-builder",
        content: [
          {
            type: "table",
            headers: ["Node", "Purpose"],
            rows: [
              ["AI Prompt", "Template with {{variables}}, model selection, Zod output schema"],
              ["HTTP Request", "GET/POST external APIs, map response to variables"],
              ["Condition", "If/else branching on previous step output"],
              ["Delay", "Wait N seconds/minutes between steps"],
              ["Send Email", "React Email template via Resend"],
              ["Database Query", "Parameterized Drizzle query"],
              ["Schedule", "Cron or one-time delayed trigger"],
            ],
          },
        ],
      },
    ],
  },

  jobs: {
    title: "Background Jobs",
    description: "Inngest for serverless jobs with admin panel, retries, and dead-letter queue.",
    sections: [
      {
        title: "Architecture",
        slug: "architecture",
        content: [
          {
            type: "paragraph",
            text: "Jobs run as Inngest functions with steps, sleeps, and automatic retries. Swap to BullMQ + Redis for self-hosted VPS by changing queues.provider in platform.config.ts.",
          },
          {
            type: "code",
            language: "typescript",
            code: `// inngest/functions/welcome-sequence.ts
export const welcomeSequence = inngest.createFunction(
  { id: 'welcome-sequence', retries: 3 },
  { event: 'user/signed.up' },
  async ({ event, step }) => {
    await step.run('send-welcome', () => sendWelcomeEmail(event.data))
    await step.sleep('wait-2-days', '2 days')
    await step.run('send-tip', () => sendTipEmail(event.data))
  }
)`,
          },
        ],
      },
      {
        title: "Shipped job templates",
        slug: "job-templates",
        content: [
          {
            type: "table",
            headers: ["Job", "Trigger", "What it does"],
            rows: [
              ["welcome-sequence", "user/signed.up", "3 emails over 7 days"],
              ["usage-billing-sync", "cron 0 0 * * *", "Report metered usage to Stripe"],
              ["dunning-sequence", "billing/payment.failed", "4-step recovery emails"],
              ["trial-expiry-warning", "cron daily", "Email 3 days before trial ends"],
              ["db-backup", "cron nightly", "pg_dump to R2/S3"],
              ["clean-expired-tokens", "cron hourly", "Purge expired magic links"],
            ],
          },
          {
            type: "callout",
            variant: "note",
            text: "View all jobs, last run times, and failures at /admin/jobs. Failed jobs can be retried or inspected from /admin/jobs/failed.",
          },
        ],
      },
    ],
  },

  api: {
    title: "API Reference",
    description: "Type-safe internal APIs via tRPC and public REST via Hono with OpenAPI docs.",
    sections: [
      {
        title: "tRPC (internal)",
        slug: "trpc",
        content: [
          {
            type: "paragraph",
            text: "All client ↔ server calls in the app use tRPC for end-to-end type safety without code generation.",
          },
          {
            type: "code",
            language: "typescript",
            code: `// Client component
'use client'
import { api } from '@/lib/trpc/client'

const { data } = api.workflows.list.useQuery({ teamId })
const create = api.workflows.create.useMutation()

// Server router
export const workflowsRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({ teamId: z.string() }))
    .query(({ ctx, input }) => db.query.workflows.findMany({ ... })),
})`,
          },
        ],
      },
      {
        title: "REST API (external)",
        slug: "rest-api",
        content: [
          {
            type: "paragraph",
            text: "Public API at /api/v1/* for developers building on your platform. Authenticate with API keys from /app/settings/api-keys.",
          },
          {
            type: "list",
            items: [
              "OpenAPI 3.1 spec auto-generated from Zod schemas",
              "Interactive Swagger UI at /api/docs",
              "Per-key rate limiting via Upstash",
              "Webhook delivery with retry and payload inspector",
            ],
          },
        ],
      },
      {
        title: "Health check",
        slug: "health",
        content: [
          {
            type: "code",
            language: "bash",
            code: `curl http://localhost:3000/api/health

# Response
{
  "status": "ok",
  "version": "1.0.0",
  "checks": {
    "database": { "status": "ok", "latencyMs": 18 },
    "stripe": { "status": "ok" }
  }
}`,
          },
        ],
      },
    ],
  },

  deployment: {
    title: "Deployment",
    description: "Production deployment guides for Vercel, Railway, Fly.io, Render, and VPS.",
    sections: [
      {
        title: "Pre-deploy checklist",
        slug: "pre-deploy",
        content: [
          {
            type: "steps",
            items: [
              { title: "Run tests", body: "npm run typecheck && npm run test:unit. Fix any failures before deploying." },
              { title: "Set production env vars", body: "Copy .env.example to your hosting provider. Use live Stripe keys only in production." },
              { title: "Run migrations", body: "npx drizzle-kit migrate against production DATABASE_URL. CI does this automatically with a pre-deploy snapshot." },
              { title: "Configure webhooks", body: "Update Stripe webhook URL to your production domain. Re-copy the signing secret." },
              { title: "Smoke test", body: "Register a user, complete checkout with test card, verify webhook fired in /admin/webhooks." },
            ],
          },
        ],
      },
      {
        title: "Deploy targets",
        slug: "deploy-targets",
        content: [
          {
            type: "table",
            headers: ["Target", "Config file", "Best for"],
            rows: [
              ["Vercel", "vercel.json", "Default — zero config, preview deploys, Neon branch per PR"],
              ["Railway", "railway.toml", "Side projects with managed Postgres"],
              ["Fly.io", "fly.toml", "Multi-region containers"],
              ["Render", "render.yaml", "Simple pricing, managed services"],
              ["VPS", "docker-compose.prod.yml", "Full control, BullMQ + Redis"],
            ],
          },
        ],
      },
      {
        title: "Vercel (recommended)",
        slug: "vercel",
        content: [
          {
            type: "code",
            language: "bash",
            code: `# Install Vercel CLI
npm i -g vercel

# Link and deploy
vercel link
vercel env pull .env.local   # or set in dashboard
vercel --prod`,
          },
          {
            type: "callout",
            variant: "tip",
            text: "Enable Neon integration in Vercel marketplace for automatic DATABASE_URL injection and database branches per preview deployment.",
          },
        ],
      },
    ],
  },

  testing: {
    title: "Testing",
    description: "Vitest for unit tests, Playwright for end-to-end critical paths.",
    sections: [
      {
        title: "Commands",
        slug: "test-commands",
        content: [
          {
            type: "code",
            language: "bash",
            code: `npm run test:unit     # Vitest — lib/, server actions
npm run test:e2e      # Playwright — auth, billing flows
npm run typecheck     # tsc --noEmit strict mode
npm run lint          # ESLint`,
          },
        ],
      },
      {
        title: "What's covered",
        slug: "coverage",
        content: [
          {
            type: "table",
            headers: ["Suite", "Covers"],
            rows: [
              ["Unit", "billing.trackUsage, featureEnabled, plan gating, Zod schemas"],
              ["E2E", "Full auth flow, Stripe checkout (test mode), dashboard load"],
              ["CI", "Lint → typecheck → unit → e2e → migrate → deploy on main"],
            ],
          },
          {
            type: "callout",
            variant: "note",
            text: "E2E tests use a separate test database seeded before each run. Never point tests at production DATABASE_URL.",
          },
        ],
      },
    ],
  },

  changelog: {
    title: "Changelog",
    description: "Release history for Foundry.",
    sections: [
      {
        title: "v1.0.0 — June 2025",
        slug: "v1-0-0",
        content: [
          {
            type: "list",
            items: [
              "Initial release: create-foundry CLI + Express web wizard",
              "Interactive landing page with live stack configurator",
              "5 login layouts, 4 dashboard style presets",
              "Visual AI workflow builder with 3 starter templates",
              "Service health dashboard and webhook inspector with replay",
              "Module marketplace, white-label mode, GDPR toolkit",
              "A/B testing framework and retention cohort dashboard",
            ],
          },
        ],
      },
    ],
  },
};

export function getDocBySlug(slug: string) {
  return docsContent[slug] ?? null;
}

export function getAllDocSlugs() {
  return Object.keys(docsContent).filter((s) => s !== "");
}

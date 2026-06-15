export type DocSection = {
  title: string;
  slug: string;
  content: DocBlock[];
};

export type DocBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export const docsNav = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", slug: "" },
      { title: "Quick Start", slug: "quick-start" },
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

export const docsContent: Record<string, { title: string; description: string; sections: DocSection[] }> = {
  "": {
    title: "Introduction",
    description: "Welcome to Foundry — the complete Next.js SaaS starter kit.",
    sections: [
      {
        title: "What is Foundry?",
        slug: "what-is-foundry",
        content: [
          {
            type: "paragraph",
            text: "Foundry is a production-ready Next.js SaaS starter where every integration is connected and tested before you write a single line of business logic. Auth, payments, AI, background jobs, analytics, and admin tools — all wired together.",
          },
          {
            type: "heading",
            level: 2,
            text: "Philosophy",
          },
          {
            type: "paragraph",
            text: "Clone it. Run one command. Answer five questions. Ship in days, not months.",
          },
          {
            type: "list",
            items: [
              "Indie hackers shipping their first SaaS",
              "Agencies building multiple client products",
              "Startup teams skipping the infrastructure sprint",
              "Developers evaluating SaaS tooling",
            ],
          },
        ],
      },
      {
        title: "Tech Stack",
        slug: "tech-stack",
        content: [
          {
            type: "table",
            headers: ["Layer", "Technology"],
            rows: [
              ["Framework", "Next.js 15 (App Router)"],
              ["Language", "TypeScript 5"],
              ["UI", "shadcn/ui + Tailwind CSS v4"],
              ["Database", "Neon Postgres + Drizzle ORM"],
              ["Auth", "Auth.js v5"],
              ["Payments", "Stripe"],
              ["AI", "Vercel AI SDK"],
              ["Jobs", "Inngest"],
              ["API", "tRPC + Hono"],
            ],
          },
        ],
      },
    ],
  },
  "quick-start": {
    title: "Quick Start",
    description: "Get Foundry running locally in under 15 minutes.",
    sections: [
      {
        title: "Create a project",
        slug: "create-project",
        content: [
          {
            type: "paragraph",
            text: "Run the CLI wizard to scaffold your project with only the modules you need.",
          },
          {
            type: "code",
            language: "bash",
            code: `npx create-foundry@latest

# Or with flags:
npx create-foundry@latest \\
  --name my-saas \\
  --auth authjs \\
  --db neon \\
  --queue inngest \\
  --style sharp \\
  --deploy vercel \\
  --modules auth,payments,teams`,
          },
        ],
      },
      {
        title: "Start development",
        slug: "start-dev",
        content: [
          {
            type: "code",
            language: "bash",
            code: `cd my-saas
npm run dev

# Visit http://localhost:3000/setup to connect services`,
          },
          {
            type: "paragraph",
            text: "The setup wizard tests every connection with a real API call and shows exact errors if misconfigured.",
          },
        ],
      },
    ],
  },
  setup: {
    title: "Setup Wizard",
    description: "Connect your services with live connection tests.",
    sections: [
      {
        title: "Web wizard at /setup",
        slug: "web-wizard",
        content: [
          {
            type: "paragraph",
            text: "Each enabled integration gets a card with labeled inputs and a Test button. Server Actions make real, cheap API calls to verify credentials.",
          },
          {
            type: "list",
            items: [
              "Database — Neon Postgres connection test",
              "Stripe — Account retrieve in test/live mode",
              "Resend — API key validation",
              "OpenAI — 1-token completion ping",
              "Inngest — Health endpoint check",
            ],
          },
        ],
      },
      {
        title: "Complete setup flow",
        slug: "complete-setup",
        content: [
          {
            type: "list",
            items: [
              "Writes values to .env.local",
              "Runs drizzle-kit migrate",
              "Seeds the database",
              "Creates the first admin user",
              "Redirects to /admin/dashboard",
            ],
          },
        ],
      },
    ],
  },
  configuration: {
    title: "Configuration",
    description: "platform.config.ts — the single source of truth.",
    sections: [
      {
        title: "Platform config",
        slug: "platform-config",
        content: [
          {
            type: "paragraph",
            text: "All feature flags, providers, and plan definitions live in one file generated by the CLI.",
          },
          {
            type: "code",
            language: "typescript",
            code: `// platform.config.ts
export const platform = {
  modules: {
    auth: true,
    payments: true,
    ai: false,
    teams: true,
  },
  auth: { provider: 'authjs' },
  ui: { stylePreset: 'sharp', loginLayout: 'illustration' },
  billing: { provider: 'stripe', plans: [...] },
} as const

export function featureEnabled(module: keyof typeof platform.modules) {
  return platform.modules[module]
}`,
          },
        ],
      },
    ],
  },
  auth: {
    title: "Authentication",
    description: "Auth.js v5 with 5 login layouts and full security features.",
    sections: [
      {
        title: "Providers",
        slug: "providers",
        content: [
          {
            type: "list",
            items: [
              "Email/password with bcrypt",
              "Magic link via Resend",
              "Google & GitHub OAuth",
              "TOTP 2FA with recovery codes",
              "Passkeys (WebAuthn)",
              "SAML SSO (Enterprise)",
            ],
          },
        ],
      },
      {
        title: "Login layouts",
        slug: "login-layouts",
        content: [
          {
            type: "paragraph",
            text: "Switch login page design with one config value. All 5 layouts share the same Auth.js logic underneath.",
          },
          {
            type: "list",
            items: [
              "centered-card — Logo + form centered",
              "split-screen — Form left, hero right",
              "illustration — Form + animated SVG",
              "minimal — Form only, no chrome",
              "fullscreen-image — Glassmorphism card over image",
            ],
          },
        ],
      },
    ],
  },
  billing: {
    title: "Payments & Billing",
    description: "Stripe integration with usage metering and dunning.",
    sections: [
      {
        title: "Billing interface",
        slug: "billing-interface",
        content: [
          {
            type: "paragraph",
            text: "Every billing call goes through a thin interface. Swap Stripe for Lemon Squeezy or Paddle with one config line.",
          },
          {
            type: "code",
            language: "typescript",
            code: `await billing.trackUsage('ai_tokens', {
  amount: tokensUsed,
  userId,
  teamId,
})`,
          },
        ],
      },
      {
        title: "Features",
        slug: "billing-features",
        content: [
          {
            type: "list",
            items: [
              "Stripe Checkout & Customer Portal",
              "Subscription gating with requirePlan()",
              "Usage → Stripe metered billing auto-sync",
              "4-step dunning email sequence",
              "Annual billing toggle on pricing page",
              "Stripe Tax enabled by default",
            ],
          },
        ],
      },
    ],
  },
  ai: {
    title: "AI Workflows",
    description: "Vercel AI SDK with visual workflow builder.",
    sections: [
      {
        title: "AI Gateway",
        slug: "ai-gateway",
        content: [
          {
            type: "paragraph",
            text: "Multi-provider routing via OpenAI, Anthropic, Groq, Google, or cost-optimized multi-provider mode.",
          },
          {
            type: "code",
            language: "typescript",
            code: `import { streamText } from 'ai'

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
return result.toDataStreamResponse()`,
          },
        ],
      },
      {
        title: "Workflow builder",
        slug: "workflow-builder",
        content: [
          {
            type: "list",
            items: [
              "AI Prompt node with typed variables",
              "HTTP Request, Condition, Delay nodes",
              "Send Email via React Email templates",
              "Database Query & Schedule triggers",
              "3 starter workflows included",
            ],
          },
        ],
      },
    ],
  },
  jobs: {
    title: "Background Jobs",
    description: "Inngest and BullMQ with admin panel.",
    sections: [
      {
        title: "Job templates",
        slug: "job-templates",
        content: [
          {
            type: "table",
            headers: ["Job", "Trigger", "Description"],
            rows: [
              ["welcome-sequence", "user/signed.up", "3-email onboarding over 7 days"],
              ["usage-billing-sync", "cron nightly", "Reports metered usage to Stripe"],
              ["dunning-sequence", "billing/payment.failed", "4-step recovery emails"],
              ["db-backup", "cron nightly", "pg_dump to S3/R2"],
            ],
          },
        ],
      },
    ],
  },
  api: {
    title: "API Reference",
    description: "Type-safe tRPC and public REST API with OpenAPI docs.",
    sections: [
      {
        title: "tRPC",
        slug: "trpc",
        content: [
          {
            type: "paragraph",
            text: "Internal API calls are fully type-safe end-to-end with no code generation.",
          },
          {
            type: "code",
            language: "typescript",
            code: `const { data } = api.workflows.list.useQuery({ teamId })
const createMutation = api.workflows.create.useMutation()`,
          },
        ],
      },
      {
        title: "Public REST API",
        slug: "rest-api",
        content: [
          {
            type: "paragraph",
            text: "Hono provides type-safe REST with auto-generated OpenAPI spec at /api/docs.",
          },
        ],
      },
    ],
  },
  deployment: {
    title: "Deployment",
    description: "Deploy to Vercel, Railway, Fly.io, Render, or VPS.",
    sections: [
      {
        title: "Deploy targets",
        slug: "deploy-targets",
        content: [
          {
            type: "table",
            headers: ["Target", "Config", "Notes"],
            rows: [
              ["Vercel", "vercel.json", "Zero config, Neon DB branch per PR"],
              ["Railway", "railway.toml", "Container, great for side projects"],
              ["Fly.io", "fly.toml", "Multi-region containers"],
              ["Render", "render.yaml", "Simplest pricing"],
              ["VPS", "docker-compose.prod.yml", "Full control with Docker"],
            ],
          },
        ],
      },
      {
        title: "CI/CD",
        slug: "cicd",
        content: [
          {
            type: "paragraph",
            text: "GitHub Actions pipeline: lint → typecheck → test → pre-deploy DB snapshot → migrate → deploy.",
          },
        ],
      },
    ],
  },
  testing: {
    title: "Testing",
    description: "Vitest for unit tests, Playwright for E2E.",
    sections: [
      {
        title: "Test commands",
        slug: "test-commands",
        content: [
          {
            type: "code",
            language: "bash",
            code: `npm run test:unit    # Vitest
npm run test:e2e     # Playwright
npm run typecheck    # TypeScript strict`,
          },
        ],
      },
    ],
  },
  changelog: {
    title: "Changelog",
    description: "Latest updates to Foundry.",
    sections: [
      {
        title: "v1.0.0 — June 2025",
        slug: "v1-0-0",
        content: [
          {
            type: "list",
            items: [
              "Initial release with CLI installer and web setup wizard",
              "5 login layouts and 4 dashboard style presets",
              "Visual AI workflow builder with 3 starter workflows",
              "Service health dashboard and webhook inspector",
              "Module marketplace and white-label mode",
              "GDPR toolkit and A/B testing framework",
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
  return Object.keys(docsContent);
}

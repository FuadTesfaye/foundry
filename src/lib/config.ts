export const platform = {
  app: {
    name: "NexLaunch",
    tagline: "The Complete Next.js SaaS Starter Kit",
    description:
      "Clone it. Run one command. Answer five questions. Ship in days, not months.",
    url: "https://nexlaunch.dev",
    supportEmail: "support@nexlaunch.dev",
  },
  version: "1.0.0",
} as const;

export const plans = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for side projects and MVPs",
    features: [
      "5 projects",
      "1 team member",
      "1,000 AI tokens/mo",
      "Auth + email",
      "Community support",
    ],
    recommended: false,
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 29,
    yearlyPrice: 290,
    description: "For growing teams shipping fast",
    features: [
      "Unlimited projects",
      "10 team members",
      "100,000 AI tokens/mo",
      "AI workflows",
      "Priority support",
      "Usage billing sync",
    ],
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "For agencies and scale",
    features: [
      "Everything in Pro",
      "Unlimited seats",
      "SSO / SAML",
      "White-label mode",
      "SLA + dedicated support",
      "Custom deployment",
    ],
    recommended: false,
  },
] as const;

export const modules = [
  { id: "auth", label: "Authentication", default: true },
  { id: "payments", label: "Payments (Stripe)", default: true },
  { id: "ai", label: "AI Workflows", default: false },
  { id: "teams", label: "Teams & Organizations", default: true },
  { id: "blog", label: "Blog & CMS", default: false },
  { id: "helpdesk", label: "Helpdesk", default: false },
  { id: "affiliates", label: "Affiliate Program", default: false },
  { id: "crm", label: "CRM", default: false },
] as const;

export const authProviders = [
  { id: "authjs", label: "Auth.js v5", description: "Self-hosted, any Postgres" },
  { id: "clerk", label: "Clerk", description: "Managed, fastest setup" },
  { id: "better-auth", label: "Better-Auth", description: "Modern self-hosted" },
  { id: "supabase", label: "Supabase Auth", description: "Integrated with Supabase" },
] as const;

export const databases = [
  { id: "neon", label: "Neon Postgres + Drizzle", recommended: true },
  { id: "supabase", label: "Supabase Postgres + Drizzle" },
  { id: "planetscale", label: "PlanetScale MySQL + Drizzle" },
  { id: "postgres", label: "Self-hosted Postgres + Drizzle" },
] as const;

export const aiProviders = [
  { id: "openai", label: "OpenAI" },
  { id: "anthropic", label: "Anthropic" },
  { id: "groq", label: "Groq" },
  { id: "google", label: "Google Gemini" },
  { id: "multi", label: "Multi-provider" },
] as const;

export const queues = [
  { id: "inngest", label: "Inngest", description: "Serverless-first" },
  { id: "bullmq", label: "BullMQ + Redis", description: "Self-hosted" },
  { id: "qstash", label: "Upstash QStash", description: "Minimal cron" },
] as const;

export const loginLayouts = [
  { id: "centered-card", label: "Centered card" },
  { id: "split-screen", label: "Split screen" },
  { id: "illustration", label: "Illustration" },
  { id: "minimal", label: "Minimal" },
  { id: "fullscreen", label: "Fullscreen image" },
] as const;

export const stylePresets = [
  { id: "rounded", label: "Rounded", description: "Notion / Linear" },
  { id: "sharp", label: "Sharp", description: "Figma / Stripe" },
  { id: "outline", label: "Outline", description: "Vercel / Supabase" },
  { id: "gradient", label: "Gradient", description: "Clerk / Resend" },
] as const;

export const deployTargets = [
  { id: "vercel", label: "Vercel", recommended: true },
  { id: "railway", label: "Railway" },
  { id: "fly", label: "Fly.io" },
  { id: "render", label: "Render" },
  { id: "vps", label: "Self-hosted VPS" },
] as const;

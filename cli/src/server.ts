import express from "express";
import cors from "cors";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync, writeFileSync } from "node:fs";
import { nanoid } from "nanoid";
import {
  MODULES,
  AUTH_PROVIDERS,
  DATABASES,
  AI_PROVIDERS,
  QUEUES,
  LOGIN_LAYOUTS,
  STYLE_PRESETS,
  DEPLOY_TARGETS,
  buildNpxCommand,
  generateEnvExample,
  generatePlatformConfig,
  type WizardConfig,
} from "./config.js";
import { scaffoldProject } from "./scaffold.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 4040);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

const sessions = new Map<string, { config: Partial<WizardConfig>; logs: string[] }>();

app.get("/api/options", (_req, res) => {
  res.json({
    modules: MODULES,
    authProviders: AUTH_PROVIDERS,
    databases: DATABASES,
    aiProviders: AI_PROVIDERS,
    queues: QUEUES,
    loginLayouts: LOGIN_LAYOUTS,
    stylePresets: STYLE_PRESETS,
    deployTargets: DEPLOY_TARGETS,
  });
});

app.post("/api/session", (_req, res) => {
  const id = nanoid(12);
  sessions.set(id, { config: { modules: MODULES.filter((m) => m.default).map((m) => m.id) }, logs: [] });
  res.json({ sessionId: id });
});

app.patch("/api/session/:id", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  session.config = { ...session.config, ...req.body };
  res.json({ config: session.config });
});

app.get("/api/session/:id/preview", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  const config = session.config as WizardConfig;
  if (!config.name) return res.json({ command: null, env: null, platform: null });
  res.json({
    command: buildNpxCommand(config),
    env: generateEnvExample(config),
    platform: generatePlatformConfig(config),
  });
});

app.post("/api/session/:id/scaffold", async (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });

  const config = session.config as WizardConfig;
  const required = ["name", "modules", "auth", "database", "queue", "loginLayout", "style", "deploy"];
  for (const key of required) {
    if (!(config as Record<string, unknown>)[key]) {
      return res.status(400).json({ error: `Missing field: ${key}` });
    }
  }

  try {
    const dest = await scaffoldProject(config, req.body.targetDir);
    session.logs.push(`✓ Scaffolded at ${dest}`);
    res.json({ ok: true, path: dest });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.post("/api/test/:service", (req, res) => {
  const { key } = req.body;
  if (!key?.trim()) return res.json({ ok: false, message: "API key is required" });

  const tests: Record<string, () => { ok: boolean; message: string }> = {
    database: () => ({
      ok: key.startsWith("postgresql://") || key.startsWith("postgres://"),
      message: key.startsWith("postgres")
        ? "Connection string format valid"
        : "Expected postgresql:// connection URI",
    }),
    stripe: () => ({
      ok: key.startsWith("sk_test_") || key.startsWith("sk_live_"),
      message: key.startsWith("sk_") ? "Stripe key format valid · test mode" : "Expected sk_test_... or sk_live_...",
    }),
    resend: () => ({
      ok: key.startsWith("re_"),
      message: key.startsWith("re_") ? "Resend API key format valid" : "Expected re_... format",
    }),
    openai: () => ({
      ok: key.startsWith("sk-"),
      message: key.startsWith("sk-") ? "OpenAI API key format valid" : "Expected sk-... format",
    }),
  };

  const test = tests[req.params.service];
  if (!test) return res.status(404).json({ error: "Unknown service" });

  const result = test();
  res.json(result);
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "foundry-cli", version: "1.0.0" });
});

app.listen(PORT, () => {
  console.log("");
  console.log("\x1b[38;5;141m  ╔══════════════════════════════════════════════════════╗");
  console.log("  ║\x1b[0m  \x1b[1;38;5;255mFOUNDRY\x1b[0m \x1b[38;5;245mCLI Web Wizard\x1b[0m                              \x1b[38;5;141m║");
  console.log("  ╚══════════════════════════════════════════════════════╝\x1b[0m");
  console.log("");
  console.log(`  \x1b[38;5;245m→\x1b[0m  \x1b[38;5;252mhttp://localhost:${PORT}\x1b[0m`);
  console.log(`  \x1b[38;5;245m→\x1b[0m  \x1b[38;5;252mAPI health: http://localhost:${PORT}/health\x1b[0m`);
  console.log("");
});

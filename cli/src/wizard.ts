import * as p from "@clack/prompts";
import chalk from "chalk";
import {
  MODULES,
  AUTH_PROVIDERS,
  DATABASES,
  AI_PROVIDERS,
  QUEUES,
  LOGIN_LAYOUTS,
  STYLE_PRESETS,
  DEPLOY_TARGETS,
  type WizardConfig,
} from "./config.js";
import { printBanner, printDivider, colorSuccess, colorInfo } from "./banner.js";

function isCancel<T>(value: T | symbol): value is symbol {
  return p.isCancel(value);
}

export async function runWizard(partial?: Partial<WizardConfig>): Promise<WizardConfig | null> {
  printBanner();

  p.intro(chalk.hex("#a855f7")("  Foundry") + chalk.white(" — Next.js SaaS Starter"));

  const name = partial?.name
    ? partial.name
    : await p.text({
        message: "What is your project name?",
        placeholder: "my-saas-app",
        defaultValue: "my-saas-app",
        validate: (v) => {
          if (!v?.trim()) return "Project name is required";
          if (!/^[a-z0-9-]+$/i.test(v)) return "Use letters, numbers, and hyphens only";
        },
      });
  if (isCancel(name)) {
    p.cancel("Setup cancelled.");
    return null;
  }

  const selectedModules = partial?.modules
    ? partial.modules
    : ((await p.multiselect({
        message: "Which modules do you need?",
        options: MODULES.map((m) => ({
          value: m.id,
          label: m.label,
          hint: m.default ? "enabled by default" : undefined,
        })),
        required: true,
        initialValues: MODULES.filter((m) => m.default).map((m) => m.id),
      })) as string[]);
  if (isCancel(selectedModules)) {
    p.cancel("Setup cancelled.");
    return null;
  }

  const auth = partial?.auth
    ? partial.auth
    : await p.select({
        message: "Choose an auth provider",
        options: AUTH_PROVIDERS.map((a) => ({
          value: a.id,
          label: a.label,
          hint: a.hint,
        })),
        initialValue: "authjs",
      });
  if (isCancel(auth)) {
    p.cancel("Setup cancelled.");
    return null;
  }

  const database = partial?.database
    ? partial.database
    : await p.select({
        message: "Choose your database",
        options: DATABASES.map((d) => ({
          value: d.id,
          label: d.label,
          hint: "hint" in d ? d.hint : undefined,
        })),
        initialValue: "neon",
      });
  if (isCancel(database)) {
    p.cancel("Setup cancelled.");
    return null;
  }

  let ai: string | undefined;
  if (selectedModules.includes("ai")) {
    const aiChoice = partial?.ai
      ? partial.ai
      : await p.select({
          message: "Choose an AI provider",
          options: AI_PROVIDERS.map((a) => ({ value: a.id, label: a.label })),
          initialValue: "openai",
        });
    if (isCancel(aiChoice)) {
      p.cancel("Setup cancelled.");
      return null;
    }
    ai = aiChoice as string;
  }

  const queue = partial?.queue
    ? partial.queue
    : await p.select({
        message: "Choose a queue / jobs provider",
        options: QUEUES.map((q) => ({
          value: q.id,
          label: q.label,
          hint: q.hint,
        })),
        initialValue: "inngest",
      });
  if (isCancel(queue)) {
    p.cancel("Setup cancelled.");
    return null;
  }

  const loginLayout = partial?.loginLayout
    ? partial.loginLayout
    : await p.select({
        message: "Choose a login page layout",
        options: LOGIN_LAYOUTS.map((l) => ({ value: l.id, label: l.label })),
        initialValue: "illustration",
      });
  if (isCancel(loginLayout)) {
    p.cancel("Setup cancelled.");
    return null;
  }

  const style = partial?.style
    ? partial.style
    : await p.select({
        message: "Choose a dashboard style preset",
        options: STYLE_PRESETS.map((s) => ({
          value: s.id,
          label: s.label,
          hint: s.hint,
        })),
        initialValue: "sharp",
      });
  if (isCancel(style)) {
    p.cancel("Setup cancelled.");
    return null;
  }

  const deploy = partial?.deploy
    ? partial.deploy
    : await p.select({
        message: "Choose deployment target",
        options: DEPLOY_TARGETS.map((d) => ({
          value: d.id,
          label: d.label,
          hint: "hint" in d ? d.hint : undefined,
        })),
        initialValue: "vercel",
      });
  if (isCancel(deploy)) {
    p.cancel("Setup cancelled.");
    return null;
  }

  const config: WizardConfig = {
    name: name as string,
    modules: selectedModules as string[],
    auth: auth as string,
    database: database as string,
    ai,
    queue: queue as string,
    loginLayout: loginLayout as string,
    style: style as string,
    deploy: deploy as string,
  };

  printDivider();

  const confirm = await p.confirm({
    message: `Scaffold ${chalk.bold.white(config.name)} with these settings?`,
    initialValue: true,
  });
  if (isCancel(confirm) || !confirm) {
    p.cancel("Setup cancelled.");
    return null;
  }

  return config;
}

export function printSuccessSteps(projectName: string) {
  p.outro(
    colorSuccess(`Project ${projectName} scaffolded successfully!`) +
      "\n\n" +
      colorInfo(`Next: cd ${projectName} && npm run dev`) +
      "\n" +
      colorInfo("Then visit http://localhost:3000/setup to connect services")
  );
}

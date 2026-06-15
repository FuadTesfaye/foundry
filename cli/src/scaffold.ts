import { mkdirSync, writeFileSync, existsSync, cpSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as p from "@clack/prompts";
import type { WizardConfig } from "./config.js";
import { generateEnvExample, generatePlatformConfig } from "./config.js";
import { colorSuccess, colorStep } from "./banner.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_ROOT = join(__dirname, "..", "..");

export async function scaffoldProject(config: WizardConfig, targetDir?: string) {
  const dest = resolve(process.cwd(), targetDir ?? config.name);

  if (existsSync(dest)) {
    throw new Error(`Directory "${config.name}" already exists`);
  }

  const spinner = p.spinner();
  spinner.start(`Scaffolding ${config.name}...`);

  mkdirSync(dest, { recursive: true });

  // Copy base Next.js app from parent foundry project
  const copyDirs = ["src", "public"];
  const copyFiles = [
    "package.json",
    "tsconfig.json",
    "next.config.ts",
    "postcss.config.mjs",
    "eslint.config.mjs",
    ".gitignore",
  ];

  for (const dir of copyDirs) {
    const src = join(TEMPLATE_ROOT, dir);
    if (existsSync(src)) {
      cpSync(src, join(dest, dir), { recursive: true });
      spinner.message(colorStep(`Copied ${dir}/`));
    }
  }

  for (const file of copyFiles) {
    const src = join(TEMPLATE_ROOT, file);
    if (existsSync(src)) {
      cpSync(src, join(dest, file));
      spinner.message(colorStep(`Copied ${file}`));
    }
  }

  // Generated config files
  writeFileSync(join(dest, ".env.example"), generateEnvExample(config));
  writeFileSync(join(dest, "platform.config.ts"), generatePlatformConfig(config));

  // Deploy config
  const deployFiles: Record<string, string> = {
    vercel: "vercel.json",
    railway: "railway.toml",
    fly: "fly.toml",
    render: "render.yaml",
    vps: "docker-compose.prod.yml",
  };

  const deployContent: Record<string, string> = {
    vercel: JSON.stringify({ framework: "nextjs", buildCommand: "npm run build" }, null, 2),
    railway: '[build]\nbuilder = "nixpacks"\n[start]\ncmd = "npm start"',
    fly: 'app = "' + config.name + '"\nprimary_region = "iad"',
    render: "services:\n  - type: web\n    name: " + config.name + "\n    runtime: node",
    vps: "services:\n  app:\n    build: .\n    ports:\n      - '3000:3000'",
  };

  const deployFile = deployFiles[config.deploy];
  if (deployFile) {
    writeFileSync(join(dest, deployFile), deployContent[config.deploy] ?? "");
    spinner.message(colorStep(`Wrote ${deployFile}`));
  }

  // README for new project
  writeFileSync(
    join(dest, "README.md"),
    `# ${config.name}\n\nScaffolded with [Foundry](https://foundry.dev).\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\nVisit \`/setup\` to connect your services.\n`
  );

  spinner.stop(colorSuccess(`Scaffolded ${config.name}`));

  return dest;
}

export function parseArgs(argv: string[]): Partial<WizardConfig> & { help?: boolean } {
  const result: Partial<WizardConfig> & { help?: boolean } = {};
  const args = [...argv];

  if (args.includes("--help") || args.includes("-h")) {
    result.help = true;
    return result;
  }

  const get = (flag: string) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : undefined;
  };

  const name = get("--name");
  if (name) result.name = name;

  const modules = get("--modules");
  if (modules) result.modules = modules.split(",");

  const auth = get("--auth");
  if (auth) result.auth = auth;

  const db = get("--db");
  if (db) result.database = db;

  const ai = get("--ai");
  if (ai) result.ai = ai;

  const queue = get("--queue");
  if (queue) result.queue = queue;

  const loginLayout = get("--login-layout");
  if (loginLayout) result.loginLayout = loginLayout;

  const style = get("--style");
  if (style) result.style = style;

  const deploy = get("--deploy");
  if (deploy) result.deploy = deploy;

  return result;
}

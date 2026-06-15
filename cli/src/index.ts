#!/usr/bin/env node

import { printBanner, colorInfo } from "./banner.js";
import { runWizard, printSuccessSteps } from "./wizard.js";
import { scaffoldProject, parseArgs } from "./scaffold.js";
import chalk from "chalk";

const HELP = `
${chalk.bold.white("create-foundry")} — Foundry SaaS Starter CLI

${chalk.hex("#71717a")("Usage:")}
  npx create-foundry@latest
  npx create-foundry@latest --name my-saas --auth authjs --db neon

${chalk.hex("#71717a")("Flags:")}
  --name            Project name
  --modules         Comma-separated: auth,payments,ai,teams,...
  --auth            authjs | clerk | better-auth | supabase
  --db              neon | supabase | postgres | planetscale
  --ai              openai | anthropic | groq | google | multi
  --queue           inngest | bullmq | qstash
  --login-layout    centered-card | split-screen | illustration | minimal | fullscreen
  --style           rounded | sharp | outline | gradient
  --deploy          vercel | railway | fly | render | vps

${chalk.hex("#71717a")("Web wizard:")}
  npm run dev --prefix cli    Start Express setup UI at http://localhost:4040
`;

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printBanner();
    console.log(HELP);
    process.exit(0);
  }

  const hasAllFlags =
    args.name &&
    args.modules &&
    args.auth &&
    args.database &&
    args.queue &&
    args.loginLayout &&
    args.style &&
    args.deploy;

  try {
    let config;

    if (hasAllFlags) {
      printBanner();
      config = {
        name: args.name!,
        modules: args.modules!,
        auth: args.auth!,
        database: args.database!,
        ai: args.ai,
        queue: args.queue!,
        loginLayout: args.loginLayout!,
        style: args.style!,
        deploy: args.deploy!,
      };
      console.log(colorInfo(`Non-interactive mode: ${config.name}`));
      console.log("");
    } else {
      config = await runWizard(args);
      if (!config) process.exit(1);
    }

    await scaffoldProject(config);
    printSuccessSteps(config.name);
  } catch (err) {
    console.error(chalk.hex("#f87171")("\n✗ Error:"), (err as Error).message);
    process.exit(1);
  }
}

main();

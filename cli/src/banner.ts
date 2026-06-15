import gradient from "gradient-string";
import chalk from "chalk";

const FOUNDRY_ASCII = `
 ███████╗ ██████╗ ██╗   ██╗███╗   ██╗██████╗ ██████╗ ██╗   ██╗
 ██╔════╝██╔═══██╗██║   ██║████╗  ██║██╔══██╗██╔══██╗╚██╗ ██╔╝
 █████╗  ██║   ██║██║   ██║██╔██╗ ██║██║  ██║██████╔╝ ╚████╔╝
 ██╔══╝  ██║   ██║██║   ██║██║╚██╗██║██║  ██║██╔══██╗  ╚██╔╝
 ██║     ╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝██║  ██║   ██║
 ╚═╝      ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝   ╚═╝`;

const rainbow = gradient(["#00f5ff", "#a855f7", "#f472b6", "#fbbf24", "#34d399", "#60a5fa"]);

export function printBanner() {
  console.log("");
  console.log(rainbow.multiline(FOUNDRY_ASCII));
  console.log("");
  console.log(
    chalk.hex("#a1a1aa")("  ") +
      chalk.bold.white("The Complete Next.js SaaS Starter Kit") +
      chalk.hex("#52525b")("  ·  ") +
      chalk.hex("#34d399")("v1.0.0")
  );
  console.log(
    chalk.hex("#71717a")("  Clone · Configure · Connect · Ship in days, not months")
  );
  console.log("");
}

export function printDivider() {
  console.log(chalk.hex("#27272a")("  " + "─".repeat(56)));
}

export function colorSuccess(msg: string) {
  return chalk.hex("#34d399")("✓") + " " + chalk.white(msg);
}

export function colorInfo(msg: string) {
  return chalk.hex("#60a5fa")("◆") + " " + chalk.hex("#d4d4d8")(msg);
}

export function colorStep(msg: string) {
  return chalk.hex("#a855f7")("◇") + " " + chalk.hex("#e4e4e7")(msg);
}

export function colorWarn(msg: string) {
  return chalk.hex("#fbbf24")("⚠") + " " + chalk.hex("#fde68a")(msg);
}

export function colorError(msg: string) {
  return chalk.hex("#f87171")("✗") + " " + chalk.hex("#fca5a5")(msg);
}

export const tagline = gradient(["#00f5ff", "#a855f7", "#f472b6"])("FOUNDRY");

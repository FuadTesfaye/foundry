import { copyFileSync, cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicSrc = join(root, "src", "public");
const publicDist = join(root, "dist", "public");

if (existsSync(publicSrc)) {
  mkdirSync(publicDist, { recursive: true });
  cpSync(publicSrc, publicDist, { recursive: true });
  console.log("✓ Copied public assets to dist/public");
}

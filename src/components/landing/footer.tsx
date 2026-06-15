import Link from "next/link";
import { platform } from "@/lib/config";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Configure", href: "/#picker" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Changelog", href: "/docs/changelog" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api" },
    { label: "Setup Guide", href: "/docs/setup" },
    { label: "Deployment", href: "/docs/deployment" },
  ],
  Company: [
    { label: "GitHub", href: "https://github.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Discord", href: "https://discord.com" },
    { label: "Contact", href: `mailto:${platform.app.supportEmail}` },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container mx-auto px-6 py-16 lg:px-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="-skew-x-12 transform font-mono text-lg font-bold tracking-widest text-white italic">
              FOUNDRY
            </div>
            <p className="mt-4 font-mono text-[10px] leading-relaxed text-white/40">
              {platform.app.description}
            </p>
            <p className="mt-4 font-mono text-[9px] text-white/30">
              STACK: Next.js 15 · React 19 · Drizzle · Auth.js · Stripe · AI SDK
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 font-mono text-[10px] tracking-wider text-white/60">
                {title.toUpperCase()}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-mono text-[11px] text-white/40 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-mono text-[9px] text-white/30">
            © 2025 {platform.app.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-mono text-[9px] text-white/30">
            <span>SYSTEM.ACTIVE</span>
            <div className="h-1 w-1 rounded-full bg-green-500/60" />
            <span>v{platform.version}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

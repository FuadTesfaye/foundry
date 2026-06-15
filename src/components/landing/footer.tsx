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
    <footer className="relative border-t border-white/10 bg-black">
      <div className="grid-bg-fine pointer-events-none absolute inset-0 opacity-20" />

      <div className="container relative mx-auto px-6 py-20 lg:px-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="-skew-x-12 transform font-mono text-lg font-bold tracking-[0.2em] text-white italic">
              FOUNDRY
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/45">{platform.app.description}</p>
            <p className="mt-6 font-mono text-[9px] tracking-wider text-white/25">
              NEXT.JS 15 · REACT 19 · DRIZZLE · AUTH.JS · STRIPE
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 font-mono text-[9px] tracking-[0.2em] text-white/40">
                {title.toUpperCase()}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-white/45 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-mono text-[9px] text-white/25">
            © 2025 {platform.app.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-mono text-[9px] text-white/25">
            <span>SYSTEM.ACTIVE</span>
            <div className="h-1 w-1 rounded-full bg-emerald-500/50" />
            <span>v{platform.version}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

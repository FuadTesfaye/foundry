"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  modules,
  authProviders,
  databases,
  aiProviders,
  queues,
  loginLayouts,
  stylePresets,
  deployTargets,
} from "@/lib/config";
import { cn } from "@/lib/utils";

type Config = {
  selectedModules: Set<string>;
  auth: string;
  database: string;
  ai: string;
  queue: string;
  loginLayout: string;
  style: string;
  deploy: string;
};

const defaultConfig: Config = {
  selectedModules: new Set(modules.filter((m) => m.default).map((m) => m.id)),
  auth: "authjs",
  database: "neon",
  ai: "openai",
  queue: "inngest",
  loginLayout: "illustration",
  style: "sharp",
  deploy: "vercel",
};

function ConfigOption({
  label,
  description,
  selected,
  onClick,
  recommended,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  recommended?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-3 border p-3 text-left transition-all",
        selected
          ? "border-white bg-white/5"
          : "border-white/10 hover:border-white/30 hover:bg-white/[0.02]"
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex h-3 w-3 shrink-0 items-center justify-center border",
          selected ? "border-white bg-white" : "border-white/30"
        )}
      >
        {selected && <Check className="h-2 w-2 text-black" strokeWidth={3} />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-white">{label}</span>
          {recommended && <Badge variant="active">REC</Badge>}
        </div>
        {description && (
          <p className="mt-0.5 font-mono text-[10px] text-white/40">{description}</p>
        )}
      </div>
    </button>
  );
}

function ModuleToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "flex items-center gap-2 border px-3 py-2 font-mono text-[10px] transition-all",
        checked
          ? "border-white bg-white text-black"
          : "border-white/20 text-white/60 hover:border-white/40"
      )}
    >
      {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      {label}
    </button>
  );
}

export function ComponentPicker() {
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [copied, setCopied] = useState(false);

  const hasAi = config.selectedModules.has("ai");

  const command = useMemo(() => {
    const moduleList = Array.from(config.selectedModules).join(",");
    const lines = [
      "npx create-foundry@latest \\",
      "  --name my-saas \\",
      `  --auth ${config.auth} \\`,
      `  --db ${config.database} \\`,
      hasAi ? `  --ai ${config.ai} \\` : null,
      `  --queue ${config.queue} \\`,
      `  --login-layout ${config.loginLayout} \\`,
      `  --style ${config.style} \\`,
      `  --deploy ${config.deploy} \\`,
      `  --modules ${moduleList}`,
    ].filter(Boolean);
    return lines.join("\n");
  }, [config, hasAi]);

  const estimatedBundle = useMemo(() => {
    let kb = 180;
    if (config.selectedModules.has("ai")) kb += 45;
    if (config.selectedModules.has("payments")) kb += 30;
    if (config.selectedModules.has("blog")) kb += 25;
    if (config.selectedModules.has("teams")) kb += 15;
    return kb;
  }, [config.selectedModules]);

  const timeSaved = useMemo(() => {
    let weeks = 2;
    config.selectedModules.forEach((m) => {
      if (m === "ai") weeks += 3;
      if (m === "payments") weeks += 2;
      if (m === "helpdesk") weeks += 1;
    });
    return weeks;
  }, [config.selectedModules]);

  const copyCommand = async () => {
    await navigator.clipboard.writeText(command.replace(/\\\n\s*/g, " "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleModule = (id: string) => {
    setConfig((prev) => {
      const next = new Set(prev.selectedModules);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...prev, selectedModules: next };
    });
  };

  return (
    <section id="picker" className="relative border-t border-white/10 bg-black py-24">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 flex items-center gap-2 opacity-60">
            <div className="h-px w-8 bg-white" />
            <span className="font-mono text-[10px] tracking-wider text-white">003</span>
            <div className="h-px flex-1 bg-white" />
          </div>
          <h2
            className="mb-4 font-mono text-2xl font-bold tracking-wider text-white lg:text-4xl"
            style={{ letterSpacing: "0.08em" }}
          >
            BUILD YOUR STACK
          </h2>
          <p className="font-mono text-sm text-white/60">
            Configure modules, providers, and style — get a personalized npx command instantly.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 font-mono text-[10px] tracking-wider text-white/40">
                MODULES
              </h3>
              <div className="flex flex-wrap gap-2">
                {modules.map((m) => (
                  <ModuleToggle
                    key={m.id}
                    label={m.label}
                    checked={config.selectedModules.has(m.id)}
                    onChange={() => toggleModule(m.id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-mono text-[10px] tracking-wider text-white/40">
                AUTH PROVIDER
              </h3>
              <div className="space-y-2">
                {authProviders.map((p) => (
                  <ConfigOption
                    key={p.id}
                    label={p.label}
                    description={p.description}
                    selected={config.auth === p.id}
                    onClick={() => setConfig((c) => ({ ...c, auth: p.id }))}
                    recommended={p.id === "authjs"}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-mono text-[10px] tracking-wider text-white/40">
                DATABASE
              </h3>
              <div className="space-y-2">
                {databases.map((d) => (
                  <ConfigOption
                    key={d.id}
                    label={d.label}
                    selected={config.database === d.id}
                    onClick={() => setConfig((c) => ({ ...c, database: d.id }))}
                    recommended={"recommended" in d && !!d.recommended}
                  />
                ))}
              </div>
            </div>

            {hasAi && (
              <div>
                <h3 className="mb-3 font-mono text-[10px] tracking-wider text-white/40">
                  AI PROVIDER
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {aiProviders.map((p) => (
                    <ConfigOption
                      key={p.id}
                      label={p.label}
                      selected={config.ai === p.id}
                      onClick={() => setConfig((c) => ({ ...c, ai: p.id }))}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 font-mono text-[10px] tracking-wider text-white/40">QUEUE</h3>
                <div className="space-y-2">
                  {queues.map((q) => (
                    <ConfigOption
                      key={q.id}
                      label={q.label}
                      description={q.description}
                      selected={config.queue === q.id}
                      onClick={() => setConfig((c) => ({ ...c, queue: q.id }))}
                      recommended={q.id === "inngest"}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 font-mono text-[10px] tracking-wider text-white/40">DEPLOY</h3>
                <div className="space-y-2">
                  {deployTargets.map((d) => (
                    <ConfigOption
                      key={d.id}
                      label={d.label}
                      selected={config.deploy === d.id}
                      onClick={() => setConfig((c) => ({ ...c, deploy: d.id }))}
                      recommended={"recommended" in d && !!d.recommended}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 font-mono text-[10px] tracking-wider text-white/40">
                  LOGIN LAYOUT
                </h3>
                <div className="space-y-2">
                  {loginLayouts.map((l) => (
                    <ConfigOption
                      key={l.id}
                      label={l.label}
                      selected={config.loginLayout === l.id}
                      onClick={() => setConfig((c) => ({ ...c, loginLayout: l.id }))}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 font-mono text-[10px] tracking-wider text-white/40">
                  STYLE PRESET
                </h3>
                <div className="space-y-2">
                  {stylePresets.map((s) => (
                    <ConfigOption
                      key={s.id}
                      label={s.label}
                      description={s.description}
                      selected={config.style === s.id}
                      onClick={() => setConfig((c) => ({ ...c, style: s.id }))}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-white/20">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
                <Terminal className="h-3 w-3 text-white/40" />
                <span className="font-mono text-[10px] text-white/40">TERMINAL PREVIEW</span>
              </div>
              <div className="bg-black p-4 font-mono text-[11px] leading-relaxed">
                <p className="text-white/40">◆ Foundry — Next.js SaaS Starter</p>
                <p className="mt-2 text-white/60">◇ Scaffolding my-saas...</p>
                <p className="mt-1 text-green-400/80">✓ Auth: {config.auth}</p>
                <p className="text-green-400/80">✓ Database: {config.database}</p>
                {hasAi && <p className="text-green-400/80">✓ AI: {config.ai}</p>}
                <p className="text-green-400/80">✓ Queue: {config.queue}</p>
                <p className="text-green-400/80">✓ Style: {config.style}</p>
                <p className="text-green-400/80">✓ Deploy: {config.deploy}</p>
                <p className="mt-2 text-white/40">◆ Next: cd my-saas && npm run dev</p>
              </div>
            </div>

            <div className="border border-white/20">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
                <span className="font-mono text-[10px] text-white/40">GENERATED COMMAND</span>
                <Button variant="ghost" size="sm" onClick={copyCommand} className="h-6 px-2">
                  {copied ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[10px] leading-relaxed text-white/70">
                {command}
              </pre>
            </div>

            <div className="grid grid-cols-3 gap-px bg-white/10">
              <div className="bg-black p-4 text-center">
                <p className="font-mono text-2xl font-bold text-white">{estimatedBundle}</p>
                <p className="mt-1 font-mono text-[9px] text-white/40">KB BUNDLE EST.</p>
              </div>
              <div className="bg-black p-4 text-center">
                <p className="font-mono text-2xl font-bold text-white">{timeSaved}w</p>
                <p className="mt-1 font-mono text-[9px] text-white/40">TIME SAVED</p>
              </div>
              <div className="bg-black p-4 text-center">
                <p className="font-mono text-2xl font-bold text-white">$0</p>
                <p className="mt-1 font-mono text-[9px] text-white/40">AT 0 USERS/MO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

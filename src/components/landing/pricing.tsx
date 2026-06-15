"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { plans } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative border-t border-white/10 bg-black py-24">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-2 opacity-60">
              <div className="h-px w-8 bg-white" />
              <span className="font-mono text-[10px] tracking-wider text-white">004</span>
              <div className="h-px flex-1 bg-white" />
            </div>
            <h2
              className="mb-4 font-mono text-2xl font-bold tracking-wider text-white lg:text-4xl"
              style={{ letterSpacing: "0.08em" }}
            >
              SIMPLE PRICING
            </h2>
            <p className="font-mono text-sm text-white/60">
              One config object powers pricing page, checkout, and plan gating everywhere.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px]">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={cn(
                "border px-3 py-1.5 transition-all",
                !annual ? "border-white bg-white text-black" : "border-white/20 text-white/50"
              )}
            >
              MONTHLY
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={cn(
                "border px-3 py-1.5 transition-all",
                annual ? "border-white bg-white text-black" : "border-white/20 text-white/50"
              )}
            >
              ANNUAL
              <span className="ml-1 text-[8px] opacity-60">-17%</span>
            </button>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 md:grid-cols-3">
          {plans.map((plan) => {
            const price = annual ? plan.yearlyPrice : plan.monthlyPrice;
            const displayPrice =
              price === 0 ? "0" : annual ? Math.round(price / 12) : price;

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative bg-black p-8",
                  plan.recommended && "ring-1 ring-white/30 ring-inset"
                )}
              >
                {plan.recommended && (
                  <Badge variant="active" className="absolute -top-2.5 left-6">
                    RECOMMENDED
                  </Badge>
                )}
                <h3 className="font-mono text-sm font-bold tracking-wider text-white">
                  {plan.name.toUpperCase()}
                </h3>
                <p className="mt-2 font-mono text-[10px] text-white/40">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-bold text-white">${displayPrice}</span>
                  <span className="font-mono text-[10px] text-white/40">/mo</span>
                </div>
                {annual && price > 0 && (
                  <p className="mt-1 font-mono text-[9px] text-white/30">
                    Billed ${price}/year
                  </p>
                )}

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-white/50" strokeWidth={2} />
                      <span className="font-mono text-[11px] text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={plan.recommended ? "solid" : "default"}
                  className="mt-8 w-full"
                >
                  <Link href="#picker">
                    {price === 0 ? "START FREE" : "GET STARTED"}
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

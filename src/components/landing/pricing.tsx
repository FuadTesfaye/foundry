"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/landing/section-header";
import { FadeIn } from "@/components/landing/fade-in";
import { plans } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    // <section id="pricing" className="relative border-t border-white/10 bg-black py-24">
    //   <div className="section-glow pointer-events-none absolute inset-0" />

    //   <div className="container relative mx-auto px-6 lg:px-16">
    //     <div className="mb-12 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
    //       <FadeIn>
    //         <SectionHeader
    //           index="006"
    //           title="SIMPLE PRICING"
    //           description="One config object powers pricing page, checkout, and plan gating everywhere."
    //         />
    //       </FadeIn>

    //       <FadeIn delay={0.1}>
    //         <div className="flex items-center gap-2 border border-white/10 p-1">
    //           <button
    //             type="button"
    //             onClick={() => setAnnual(false)}
    //             className={cn(
    //               "px-4 py-2 font-mono text-[10px] tracking-wider transition-all",
    //               !annual ? "bg-white text-black" : "text-white/50 hover:text-white"
    //             )}
    //           >
    //             MONTHLY
    //           </button>
    //           <button
    //             type="button"
    //             onClick={() => setAnnual(true)}
    //             className={cn(
    //               "px-4 py-2 font-mono text-[10px] tracking-wider transition-all",
    //               annual ? "bg-white text-black" : "text-white/50 hover:text-white"
    //             )}
    //           >
    //             ANNUAL <span className="opacity-60">-17%</span>
    //           </button>
    //         </div>
    //       </FadeIn>
    //     </div>

    //     <div className="grid gap-px bg-white/10 lg:grid-cols-3">
    //       {plans.map((plan, i) => {
    //         const price = annual ? plan.yearlyPrice : plan.monthlyPrice;
    //         const displayPrice = price === 0 ? "0" : annual ? Math.round(price / 12) : price;

    //         return (
    //           <FadeIn key={plan.id} delay={i * 0.1}>
    //             <div
    //               className={cn(
    //                 "relative flex h-full flex-col bg-black p-8 lg:p-10",
    //                 plan.recommended && "ring-1 ring-white/25 ring-inset"
    //               )}
    //             >
    //               {plan.recommended && (
    //                 <Badge variant="active" className="absolute -top-2.5 left-8">
    //                   RECOMMENDED
    //                 </Badge>
    //               )}
    //               <h3 className="font-mono text-sm font-bold tracking-[0.15em] text-white">
    //                 {plan.name.toUpperCase()}
    //               </h3>
    //               <p className="mt-2 text-xs text-white/40">{plan.description}</p>

    //               <div className="mt-8 flex items-baseline gap-1">
    //                 <span className="font-mono text-5xl font-bold text-white">${displayPrice}</span>
    //                 <span className="font-mono text-[10px] text-white/40">/mo</span>
    //               </div>
    //               {annual && price > 0 && (
    //                 <p className="mt-1 font-mono text-[9px] text-white/30">Billed ${price}/year</p>
    //               )}

    //               <ul className="mt-8 flex-1 space-y-3 border-t border-white/10 pt-8">
    //                 {plan.features.map((feature) => (
    //                   <li key={feature} className="flex items-start gap-3">
    //                     <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" strokeWidth={2} />
    //                     <span className="text-xs text-white/60">{feature}</span>
    //                   </li>
    //                 ))}
    //               </ul>

    //               <Button
    //                 asChild
    //                 variant={plan.recommended ? "solid" : "default"}
    //                 className="mt-8 w-full"
    //               >
    //                 <Link href="#picker">{price === 0 ? "START FREE" : "GET STARTED"}</Link>
    //               </Button>
    //             </div>
    //           </FadeIn>
    //         );
    //       })}
    //     </div>
      // </div>
    </section>
  );
}

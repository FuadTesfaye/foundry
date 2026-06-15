import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is NexLaunch different from other SaaS starters?",
    answer:
      "Every integration is connected and tested before you write business logic. The CLI wizard and /setup page test real API connections — not just generate .env files. You get auth, payments, AI, jobs, analytics, and admin tools in one cohesive system.",
  },
  {
    question: "What stack does NexLaunch use?",
    answer:
      "Next.js 15, React 19, TypeScript 5, Tailwind CSS v4, shadcn/ui, Drizzle ORM, Auth.js v5, Vercel AI SDK, Inngest, Neon Postgres, Stripe, tRPC, and Hono. All swappable via platform.config.ts.",
  },
  {
    question: "Can I use only some modules?",
    answer:
      "Yes. The CLI strips unused routes, schemas, and dependencies for disabled modules. Enable blog, CRM, or helpdesk later from the admin module marketplace without redeploying.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most developers are running locally in 10–15 minutes: npx create-nexlaunch, answer 5 questions, visit /setup to connect services, and you're building product features on day one.",
  },
  {
    question: "Does it support self-hosting?",
    answer:
      "Yes. Deploy configs ship for Vercel, Railway, Fly.io, Render, and Docker VPS. BullMQ + Redis option for self-hosted queues. Full control with the same codebase.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "The Starter plan is free and includes auth, 5 projects, and 1,000 AI tokens/month. Pro unlocks unlimited projects, AI workflows, and team features at $29/mo.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative border-t border-white/10 bg-black py-24">
      <div className="container mx-auto max-w-3xl px-6 lg:px-16">
        <div className="mb-12">
          <div className="mb-3 flex items-center gap-2 opacity-60">
            <div className="h-px w-8 bg-white" />
            <span className="font-mono text-[10px] tracking-wider text-white">007</span>
            <div className="h-px flex-1 bg-white" />
          </div>
          <h2
            className="font-mono text-2xl font-bold tracking-wider text-white lg:text-4xl"
            style={{ letterSpacing: "0.08em" }}
          >
            FAQ
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

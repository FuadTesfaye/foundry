import { cn } from "@/lib/utils";

export function SectionHeader({
  index,
  title,
  description,
  className,
  align = "left",
}: {
  index: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <div
        className={cn(
          "mb-4 flex items-center gap-2 opacity-50",
          align === "center" && "justify-center"
        )}
      >
        <div className="h-px w-8 bg-white/60" />
        <span className="font-mono text-[10px] tracking-[0.2em] text-white">{index}</span>
        <div className="h-px w-8 bg-white/60" />
      </div>
      <h2
        className="mb-4 font-mono text-2xl font-bold tracking-[0.12em] text-white lg:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="text-sm leading-relaxed text-white/55 lg:text-base">{description}</p>
      )}
    </div>
  );
}

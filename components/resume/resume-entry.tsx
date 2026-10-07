interface ResumeEntryProps {
  organization: string;
  role: string;
  period: string;
  description?: string;
  link?: { label: string; href: string };
}

export function ResumeEntry({ organization, role, period, description, link }: ResumeEntryProps) {
  return (
    <article>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="text-base leading-relaxed">
          <span className="font-semibold">{role}</span>
          {", "}
          <span className="italic">
            {link ? (
              <a
                href={link.href}
                className="underline decoration-border underline-offset-4 hover:decoration-foreground"
              >
                {organization}
              </a>
            ) : (
              organization
            )}
          </span>
        </h3>
        <p className="shrink-0 text-sm tabular-nums text-muted-foreground">{period}</p>
      </div>
      {description && (
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
    </article>
  );
}

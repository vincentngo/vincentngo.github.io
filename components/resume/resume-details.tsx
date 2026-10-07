import { ResumeEntry } from "@/components/resume/resume-entry";
import { resume } from "@/lib/content/resume";

interface ResumeDetailsProps {
  section:
    | "education"
    | "awards"
    | "publications"
    | "research"
    | "skills"
    | "interests"
    | "patents"
    | "talks";
}

const headingClassName = "mb-4 border-b border-border pb-1 text-xl font-semibold tracking-tight";

export function ResumeDetails({ section }: ResumeDetailsProps) {
  if (section === "talks") {
    return (
      <section aria-labelledby="talks-heading">
        <h2 id="talks-heading" className={headingClassName}>
          Tech Talks
        </h2>
        <div className="space-y-4">
          {resume.talks.map((entry) => (
            <ResumeEntry key={entry.role} {...entry} />
          ))}
        </div>
      </section>
    );
  }

  if (section === "education") {
    return (
      <section aria-labelledby="education-heading">
        <h2 id="education-heading" className={headingClassName}>
          Education
        </h2>
        <div className="space-y-4">
          {resume.education.map((entry) => (
            <article key={entry.organization}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-base">
                  {entry.qualification && (
                    <>
                      <span className="font-semibold">{entry.qualification}</span>
                      {", "}
                    </>
                  )}
                  <span className="italic">{entry.organization}</span>
                </h3>
                {entry.period && (
                  <p className="shrink-0 text-sm text-muted-foreground">{entry.period}</p>
                )}
              </div>
              {entry.details && (
                <p className="mt-1 text-sm text-muted-foreground">{entry.details}</p>
              )}
              {entry.activities && (
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Activities: {entry.activities}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section === "awards") {
    return (
      <section aria-labelledby="awards-heading">
        <h2 id="awards-heading" className={headingClassName}>
          Honors & awards
        </h2>
        {resume.awards.map((award) => (
          <article key={award.title} className="mb-4 last:mb-0">
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
              <h3 className="font-semibold">{award.title}</h3>
              <p className="shrink-0 text-sm text-muted-foreground">{award.period}</p>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {award.description}
            </p>
          </article>
        ))}
      </section>
    );
  }

  if (section === "patents") {
    return (
      <section aria-labelledby="patents-heading">
        <h2 id="patents-heading" className={headingClassName}>
          Patents
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Co-inventor on three granted U.S. patents.{" "}
          <a
            href="https://patents.justia.com/inventor/vincent-vy-ngo"
            className="underline underline-offset-4 hover:text-foreground"
          >
            View patents and related applications
          </a>
        </p>
        <div className="space-y-5">
          {resume.patents.map((patent) => (
            <article key={patent.title}>
              <h3 className="font-medium">{patent.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {patent.description}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Inventors: {patent.inventors}</p>
              <ul className="mt-2 space-y-1 text-sm">
                {patent.grants.map((grant) => (
                  <li key={grant.number}>
                    <a
                      href={grant.href}
                      className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                    >
                      US {grant.number}
                    </a>
                    <span className="text-muted-foreground">
                      {" "}
                      · Granted <time dateTime={grant.dateTime}>{grant.date}</time>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section === "publications") {
    const years = [
      ...new Set(resume.publications.map((publication) => publication.dateTime.slice(0, 4))),
    ];
    return (
      <section aria-labelledby="publications-heading">
        <h2 id="publications-heading" className={headingClassName}>
          Publications
        </h2>
        <div className="space-y-5">
          {years.map((year) => (
            <div key={year}>
              <h3 className="mb-3 flex items-center gap-3 text-sm font-medium text-muted-foreground">
                {year}
                <span className="flex-1 border-b border-dotted border-border" aria-hidden="true" />
              </h3>
              <ol
                start={
                  resume.publications.findIndex((publication) =>
                    publication.dateTime.startsWith(year)
                  ) + 1
                }
                className="ml-6 list-decimal space-y-3"
              >
                {resume.publications
                  .filter((publication) => publication.dateTime.startsWith(year))
                  .map((publication) => (
                    <li key={publication.title} className="pl-1">
                      <h4 className="font-medium">
                        <a
                          href={publication.href}
                          className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                        >
                          {publication.title}
                        </a>
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {publication.publisher} · {publication.kind} ·{" "}
                        <time dateTime={publication.dateTime}>{publication.date}</time>
                      </p>
                      {publication.description && (
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {publication.description}
                        </p>
                      )}
                    </li>
                  ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (section === "research") {
    return (
      <section aria-labelledby="research-heading">
        <h2 id="research-heading" className={headingClassName}>
          Research
        </h2>
        <div className="space-y-4">
          {resume.research.map((entry) => (
            <ResumeEntry key={entry.role} {...entry} />
          ))}
        </div>
      </section>
    );
  }

  if (section === "skills") {
    return (
      <section aria-labelledby="skills-heading">
        <h2 id="skills-heading" className={headingClassName}>
          Skills & languages
        </h2>
        <p className="text-sm leading-relaxed">{resume.skills.join(" · ")}</p>
        <dl className="mt-3 space-y-1 text-sm">
          {resume.languages.map((language) => (
            <div key={language.name} className="flex flex-wrap gap-x-2">
              <dt className="font-medium">{language.name}</dt>
              <dd className="text-muted-foreground">{language.proficiency}</dd>
            </div>
          ))}
        </dl>
      </section>
    );
  }

  return (
    <section aria-labelledby="interests-heading">
      <h2 id="interests-heading" className={headingClassName}>
        Interests
      </h2>
      <p className="text-sm leading-relaxed">{resume.interests.join(" · ")}</p>
    </section>
  );
}

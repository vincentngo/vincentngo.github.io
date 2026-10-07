import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResumeEntry } from "@/components/resume/resume-entry";
import { ResumeDetails } from "@/components/resume/resume-details";
import { resume, resumeExperience } from "@/lib/content/resume";
import { Header } from "@/components/layout/header";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface ResumePageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "CV | Vincent Ngo",
  description:
    "Vincent Ngo's experience as a co-founder, software engineer, and author, including publications, patents, research, and awards.",
};

const contactClassName =
  "rounded-sm text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ResumePage({ params }: ResumePageProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <header className="mb-9 text-center">
          <h1 className="mb-2 text-4xl font-semibold tracking-tight">{resume.name}</h1>
          <p className="mb-3 text-sm text-muted-foreground">{resume.summary}</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {resume.contacts.map((contact) => (
              <a key={contact.href} href={contact.href} className={contactClassName}>
                {contact.label}
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Last updated on{" "}
            <time dateTime={resume.updated}>
              {new Date(`${resume.updated}T12:00:00Z`).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
          </p>
          <a
            href="/resume/VincentNgoCV.pdf"
            download
            className="mt-4 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            Download CV (PDF)
          </a>
        </header>

        <div className="space-y-8">
          <ResumeDetails section="education" />
          <section aria-labelledby="experience-heading">
            <h2
              id="experience-heading"
              className="mb-4 border-b border-border pb-1 text-xl font-semibold tracking-tight"
            >
              Positions
            </h2>
            <div className="space-y-4">
              {resumeExperience.map((entry) => (
                <ResumeEntry key={`${entry.organization}-${entry.role}`} {...entry} />
              ))}
            </div>
          </section>

          <ResumeDetails section="awards" />
          <ResumeDetails section="patents" />
          <ResumeDetails section="publications" />
          <ResumeDetails section="research" />
          <ResumeDetails section="skills" />
          <ResumeDetails section="interests" />
        </div>
      </main>
    </>
  );
}

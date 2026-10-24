import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chrome, Footer, ext } from "../../chrome";
import { REPOS, SITE, type Repo } from "@/lib/content";
import { getReadme } from "@/lib/readme";

const find = (slug: string) => REPOS.find((r) => r.name === slug);
const titleOf = (r: Repo) => r.title ?? r.name;

export function generateStaticParams() {
  return REPOS.map((r) => ({ slug: r.name }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const r = find((await params).slug);
  if (!r) return {};
  const title = `${titleOf(r)}: open-source ${r.tags[0]} project`;
  return {
    title,
    description: r.blurb,
    keywords: [titleOf(r), r.name, ...r.tags, "open source", SITE.name],
    alternates: { canonical: `/projects/${r.name}` },
    openGraph: {
      type: "article",
      url: `/projects/${r.name}`,
      siteName: SITE.name,
      title,
      description: r.blurb,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: r.blurb,
    },
  };
}

export default async function Project({
  params,
}: PageProps<"/projects/[slug]">) {
  const r = find((await params).slug);
  if (!r) notFound();
  const readme = await getReadme(r.name);
  const url = `${SITE.url}/projects/${r.name}`;
  const others = REPOS.filter((o) => o !== r);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": r.site
          ? ["SoftwareSourceCode", "SoftwareApplication"]
          : "SoftwareSourceCode",
        "@id": `${url}#software`,
        name: titleOf(r),
        alternateName: r.name,
        description: r.blurb,
        url: r.site ?? url,
        mainEntityOfPage: url,
        codeRepository: r.url,
        keywords: r.tags.join(", "),
        ...(r.shot && { image: SITE.url + r.shot }),
        author: { "@id": `${SITE.url}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: SITE.name, item: SITE.url },
          { name: "Projects", item: `${SITE.url}/projects` },
          { name: titleOf(r), item: url },
        ].map((c, i) => ({ "@type": "ListItem", position: i + 1, ...c })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Chrome />

      <main className="container project">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">~</Link>/<Link href="/projects">projects</Link>/
          <span aria-current="page">{r.name}</span>
        </nav>

        <header className="p-head">
          <p className="kicker">
            <span className="c-green">$</span> cd ~/projects/{r.name}
          </p>
          <h1>{titleOf(r)}</h1>
          <p className="sub">{r.blurb}</p>
          <ul className="tags">
            {r.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="cta">
            {r.site && (
              <a className="btn primary" href={r.site} {...ext}>
                {r.site.replace(/^https?:\/\/(www\.)?/, "")} ↗
              </a>
            )}
            <a className="btn" href={r.url} {...ext}>
              source on github ↗
            </a>
          </div>
        </header>

        {r.shot && (
          <a
            className="shot p-shot"
            href={r.site ?? r.url}
            {...ext}
            aria-label={`Open ${titleOf(r)}`}
          >
            <Image
              src={r.shot}
              alt={`Screenshot of ${titleOf(r)}`}
              width={1200}
              height={750}
              sizes="(max-width: 1080px) 100vw, 1032px"
              priority
            />
          </a>
        )}

        <section className="readme glass" aria-label="README">
          <div className="ex-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{r.name}/README.md</span>
          </div>
          {readme ? (
            <div className="md" dangerouslySetInnerHTML={{ __html: readme }} />
          ) : (
            <div className="md">
              <p>{r.blurb}</p>
              <p>
                <a href={r.url} {...ext}>
                  Read the full README on GitHub ↗
                </a>
              </p>
            </div>
          )}
        </section>

        <section className="more" aria-labelledby="more-h">
          <h2 id="more-h" className="sh">
            <span className="t">more projects</span>
            <span className="rule" aria-hidden="true" />
            <span className="note">ls ~/projects</span>
          </h2>
          <ul className="cards">
            {others.map((o) => (
              <li key={o.name}>
                <Link className="card glass" href={`/projects/${o.name}`}>
                  <h3>
                    <span className="muted">~/</span>
                    {o.name}
                  </h3>
                  <p>{o.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Footer />
      </main>
    </>
  );
}

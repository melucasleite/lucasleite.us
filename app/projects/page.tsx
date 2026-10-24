import type { Metadata } from "next";
import Link from "next/link";
import { Chrome, Footer } from "../chrome";
import { REPOS, SITE } from "@/lib/content";

const description = `Open-source projects by ${SITE.name}: ${REPOS.map(
  (r) => r.title ?? r.name,
).join(", ")}. Swift, TypeScript, Python, C++ and hardware.`;

export const metadata: Metadata = {
  title: "Open-source projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    url: "/projects",
    siteName: SITE.name,
    title: `Open-source projects · ${SITE.name}`,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Open-source projects",
  url: `${SITE.url}/projects`,
  description,
  author: { "@id": `${SITE.url}/#person` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: REPOS.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/projects/${r.name}`,
      name: r.title ?? r.name,
    })),
  },
};

export default function Projects() {
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
          <Link href="/">~</Link>/<span aria-current="page">projects</span>
        </nav>
        <header className="p-head">
          <p className="kicker">
            <span className="c-green">$</span> ls ~/projects
          </p>
          <h1>Open-source projects</h1>
          <p className="sub">
            Side quests, all on GitHub: desktop apps, games, firmware, and the
            occasional piece of furniture.
          </p>
        </header>
        <ul className="cards">
          {REPOS.map((r) => (
            <li key={r.name}>
              <Link className="card glass" href={`/projects/${r.name}`}>
                <h3>
                  <span className="muted">~/</span>
                  {r.name}
                  {r.fresh && <span className="fresh">new</span>}
                </h3>
                <p>{r.blurb}</p>
                <ul className="tags">
                  {r.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
        <Footer />
      </main>
    </>
  );
}

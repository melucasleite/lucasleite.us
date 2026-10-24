import Image from "next/image";
import { Banner, Robot } from "./art";
import { Chrome, Footer, ext } from "./chrome";
import { Carousel } from "./carousel";
import { Explorer } from "./explorer";
import { Kinds } from "./kinds";
import { Work } from "./work";
import {
  LAB,
  LINKS,
  LIVE,
  POSTS,
  REPOS,
  SITE,
  STACK,
  STATS,
} from "@/lib/content";

function Section({
  id,
  n,
  title,
  note,
  children,
}: {
  id: string;
  n: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section">
      <h2 className="sh">
        <span className="n">{n}</span>
        <span className="t">{title}</span>
        <span className="rule" aria-hidden="true" />
        {note && <span className="note">{note}</span>}
      </h2>
      {children}
    </section>
  );
}

const PERSON = `${SITE.url}/#person`;

// Structured data so search engines and AI read this as a person's profile.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON,
      name: SITE.name,
      url: SITE.url,
      jobTitle: SITE.jobTitle,
      description: SITE.description,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Orlando",
        addressRegion: "FL",
        addressCountry: "US",
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "B.Eng. in Control & Automation Engineering",
      },
      award: "1st place worldwide, robotics engineering (Amazon-e, 2017)",
      knowsAbout: STACK.flatMap((l) => l.tools),
      sameAs: Object.values(LINKS),
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE.url}/#profile`,
      url: SITE.url,
      name: SITE.title,
      inLanguage: "en-US",
      mainEntity: { "@id": PERSON },
      hasPart: LIVE.map((p) => ({
        "@type": "WebSite",
        name: p.name,
        url: p.url,
        description: p.blurb,
        creator: { "@id": PERSON },
      })),
    },
    ...REPOS.map((r) => ({
      "@type": r.site
        ? ["SoftwareSourceCode", "SoftwareApplication"]
        : "SoftwareSourceCode",
      "@id": `${SITE.url}/projects/${r.name}#software`,
      mainEntityOfPage: `${SITE.url}/projects/${r.name}`,
      name: r.name,
      description: r.blurb,
      codeRepository: r.url,
      ...(r.site && { url: r.site }),
      keywords: r.tags.join(", "),
      ...(r.shot && { image: SITE.url + r.shot }),
      author: { "@id": PERSON },
    })),
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": PERSON },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Chrome home />

      <main id="top" className="container" data-path="/">
        <section className="hero">
          <div className="hero-text">
            <p className="kicker">
              <span className="c-green">$</span> whoami
            </p>
            <Banner />
            <h1>
              Control &amp; automation engineer turned{" "}
              <em>principal software engineer</em>.
            </h1>
            <p className="sub">
              I build robots, games, reef automation and AI tooling, plus the
              platforms underneath them. Thirteen years of shipping, from a
              world-championship robot to systems that hold 99.99% uptime. Based
              in Orlando, FL.
            </p>
            <div className="cta">
              <a className="btn primary" href="#shipping">
                see what&apos;s shipping ↓
              </a>
              <a className="btn" href={LINKS.github} {...ext}>
                github ↗
              </a>
              <a className="btn" href={LINKS.medium} {...ext}>
                build logs ↗
              </a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <Robot />
            <pre className="caption">
              {"// beep boop.\n// it won a world title once."}
            </pre>
          </div>
        </section>

        <ul className="stats">
          {STATS.map(([big, small]) => (
            <li key={big} className="glass">
              <strong>{big}</strong>
              <span>{small}</span>
            </li>
          ))}
        </ul>

        <Section id="shipping" n="01" title="shipping" note="live, go click">
          <Carousel id="shipping-track" label="Shipping">
            {LIVE.map((p, i) => (
              <article key={p.name} className="live-card glass">
                <a
                  className="shot"
                  href={p.url}
                  {...ext}
                  aria-label={`Open ${p.name}`}
                >
                  <div className="bar">
                    <i />
                    <i />
                    <i />
                    <span>{p.url.replace(/^https?:\/\/(www\.)?/, "")}</span>
                  </div>
                  <Image
                    src={p.shot}
                    alt={`Screenshot of ${p.name}`}
                    width={1200}
                    height={750}
                    sizes="(max-width: 760px) 90vw, 560px"
                    priority={i === 0}
                  />
                </a>
                <div className="live-body">
                  <Kinds kinds={p.kinds} />
                  <h3>
                    <a href={p.url} {...ext}>
                      {p.name} <span className="arrow">↗</span>
                    </a>
                  </h3>
                  <p>{p.blurb}</p>
                  <ul className="tags">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </Carousel>
        </Section>

        <Section id="work" n="02" title="work" note="git log --career">
          <Work />
        </Section>

        <Section
          id="projects"
          n="03"
          title="building in public"
          note="open source, all of it"
        >
          <Explorer repos={REPOS} />
        </Section>

        <Section id="lab" n="04" title="the lab" note="robots and machines">
          <Carousel id="lab-track" label="The lab" per={3}>
            {LAB.map((b) => (
              <a key={b.name} className="build glass" href={b.url} {...ext}>
                <div className="photo">
                  <Image
                    src={b.img}
                    alt={`${b.name}: ${b.blurb}`}
                    fill
                    sizes="(max-width: 760px) 85vw, 340px"
                  />
                  {b.year && <span className="badge">🏆 {b.year}</span>}
                </div>
                <h3>{b.name}</h3>
                <p>{b.blurb}</p>
              </a>
            ))}
          </Carousel>
        </Section>

        <Section
          id="writing"
          n="05"
          title="writing"
          note="build logs on medium"
        >
          <ul className="posts glass">
            {POSTS.map(([year, title, url]) => (
              <li key={url}>
                <a href={url} {...ext}>
                  <span className="year">{year}</span>
                  <span className="title">{title}</span>
                  <span className="arrow">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="stack" n="06" title="stack" note="full stack, literally">
          <p className="work-lede">
            The right tool for the job, from <em>solder to LLMs</em>. A wide
            toolbox, and every layer of it has shipped.
          </p>
          <ol className="layers">
            {STACK.map((l) => (
              <li
                key={l.layer}
                className="layer glass"
                style={{ "--c": l.color } as React.CSSProperties}
              >
                <span className="layer-name">{l.layer}</span>
                <ul className="tools">
                  {l.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <span className="proof">
                  <span aria-hidden="true">shipped ▸ </span>
                  {l.proof}
                </span>
              </li>
            ))}
          </ol>
          <p className="layers-axis" aria-hidden="true">
            <span>↑ cloud &amp; models</span>
            <span>metal ↓</span>
          </p>
        </Section>

        <Footer />
      </main>
    </>
  );
}

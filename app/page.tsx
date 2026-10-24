import Image from "next/image";
import { Banner, Robot } from "./art";
import { Chrome, Footer, ext } from "./chrome";
import { Explorer } from "./explorer";
import {
  CAREER,
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
      knowsAbout: STACK.flatMap(([, v]) => v.split(", ")),
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

      <main id="top" className="container">
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
          <div className="live">
            {LIVE.map((p, i) => (
              <article
                key={p.name}
                className={`live-card glass${i % 2 ? " flip" : ""}`}
              >
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
                    alt={`Screenshot of the ${p.name} homepage`}
                    width={1200}
                    height={750}
                    sizes="(max-width: 760px) 100vw, 560px"
                    priority={i === 0}
                  />
                </a>
                <div className="live-body">
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
          </div>
        </Section>

        <Section id="work" n="02" title="work" note="git log --career">
          <ol className="timeline">
            {CAREER.map((c) => (
              <li key={c.when + c.role}>
                <div className="when">{c.when}</div>
                <div className="what">
                  <h3>
                    {c.role} <span className="where">· {c.where}</span>
                  </h3>
                  <ul>
                    {c.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            <li>
              <div className="when">2013 – 2019</div>
              <div className="what">
                <h3>
                  B.Eng.{" "}
                  <span className="where">
                    · control &amp; automation engineering
                  </span>
                </h3>
              </div>
            </li>
          </ol>
        </Section>

        <Section id="projects" n="03" title="side projects" note="open source">
          <Explorer repos={REPOS} />
        </Section>

        <Section id="lab" n="04" title="the lab" note="robots and machines">
          <div className="lab">
            {LAB.map((b) => (
              <a key={b.name} className="build glass" href={b.url} {...ext}>
                <div className="photo">
                  <Image
                    src={b.img}
                    alt={`${b.name}: ${b.blurb}`}
                    fill
                    sizes="(max-width: 760px) 100vw, 340px"
                  />
                  {b.year && <span className="badge">🏆 {b.year}</span>}
                </div>
                <h3>{b.name}</h3>
                <p>{b.blurb}</p>
              </a>
            ))}
          </div>
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

        <Section id="stack" n="06" title="stack" note="which --all">
          <dl className="stack glass">
            {STACK.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Footer />
      </main>
    </>
  );
}

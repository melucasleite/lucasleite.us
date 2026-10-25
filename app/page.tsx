import Image from "next/image";
import { Banner, Robot } from "./art";
import { Chrome, Footer, ext } from "./chrome";
import { Carousel } from "./carousel";
import { Explorer } from "./explorer";
import { Kinds } from "./kinds";
import { Work } from "./work";
import { CTA, LAB, LINKS, LIVE, REPOS, SITE, STACK } from "@/lib/content";

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
      knowsAbout: STACK,
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
              From circuit board to cloud, I build it and{" "}
              <em>keep it running</em>.
            </h1>
            <p className="sub">
              I&apos;m a control &amp; automation engineer turned principal
              software engineer in Orlando, FL, with 13 years of shipping behind
              me, from a world-title robot to a global platform held at 99.99%
              uptime.
            </p>
            <div className="cta">
              <a className="btn primary" href="#shipping">
                {CTA.primary}
              </a>
              <a className="btn" href={LINKS.email}>
                {CTA.contact}
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

        <Section
          id="shipping"
          n="01"
          title="shipping"
          note="live in production"
        >
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
                      {p.name}
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
          {/* Desloper and Age of Potatoes are open too, but they already
              lead the shipping section; their pages still live at /projects. */}
          <Explorer repos={REPOS.filter((r) => !r.site)} />
        </Section>

        <Section id="lab" n="04" title="the lab" note="robots and machines">
          {/* TODO(owner): confirm this is why you build, in your words. */}
          <p className="work-lede">
            I started with robots because a machine either works or it
            doesn&apos;t. I still hold software to that. I write them up as{" "}
            <a href={LINKS.medium} {...ext}>
              <em>seven build logs on Medium</em>
            </a>
            , 2023 to 2024.
          </p>
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
                  {b.year && (
                    <span className="badge">1st place · {b.year}</span>
                  )}
                </div>
                <h3>{b.name}</h3>
                <p>{b.blurb}</p>
              </a>
            ))}
          </Carousel>
        </Section>

        <Footer home />
      </main>
    </>
  );
}

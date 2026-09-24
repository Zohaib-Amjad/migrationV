import Link from 'next/link'
import type { Metadata } from 'next'
import { Brandmark } from '@/components/Brandmark'
import { LEADERSHIP, CORE_TEAM } from '@/data/site-content'

export const metadata: Metadata = {
  title: 'About Us | HOF Migration',
  description:
    'HOF Migration advises on skilled migration, study, family sponsorship, and investor routes from Dubai — and declines cases it cannot honestly help with.',
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">
              /
            </span>
            <span aria-current="page">About Us</span>
          </nav>

          <div className="page-head">
            <span className="page-head__eyebrow">About Us</span>
            <h1 className="page-head__title">
              Advice built on
              <br />
              the honest answer
            </h1>
            <p className="page-head__lede">
              HOF Migration advises on skilled migration, study, family sponsorship, and investor
              pathways from Dubai — and declines cases it cannot genuinely help with.
            </p>
            <div className="page-head__meta">
              <span className="page-head__chip">Founded in 2020</span>
              <span className="page-head__chip">Dubai, UAE</span>
              <span className="page-head__chip">ICCRC &amp; MARA certified</span>
            </div>
          </div>
        </div>
      </div>

      <main>
        <section className="section-block">
          <div className="wrap">
            <div className="about-intro reveal is-in">
              <h2 className="about-intro__title">
                Migration advice starts with what you do not qualify for.
              </h2>
              <div className="about-intro__body">
                <p>
                  HOF Migration is a Dubai-based consultancy that manages immigration files from the
                  first honest assessment through the year after a decision is issued. We are
                  registered with ICCRC and MARA and work across Canada, Australia, the UK, the US,
                  and Europe.
                </p>
                <p>
                  The company was built around one observation: most people do not fail because they
                  are ineligible. They fail because nobody told them early enough and clearly enough
                  which route was right for them, or because the file was sent without saying what it
                  needed to say.
                </p>
                <p>
                  That is why the first conversation is an assessment, not a sales pitch. If the
                  answer is that you need to wait six months, retake a test, or that we are not the
                  right team for your case, that is the answer you get. It costs us short-term work,
                  but it is the only way to make the process worth the effort.
                </p>
              </div>
            </div>

            <div className="about-stats reveal is-in">
              <div className="about-stat">
                <b>6</b>
                <span>years of Gulf immigration advisory experience</span>
              </div>
              <div className="about-stat">
                <b>5</b>
                <span>destination systems we work with internally</span>
              </div>
              <div className="about-stat">
                <b>2</b>
                <span>regulatory bodies we are accredited with — ICCRC and MARA</span>
              </div>
              <div className="about-stat">
                <b>1</b>
                <span>assessment before any commitment, always</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block section-block--tight">
          <div className="wrap">
            <div className="brandmark reveal is-in" data-brandmark="">
              <span className="brandmark__glow" aria-hidden="true"></span>
              <span className="brandmark__ring" aria-hidden="true"></span>
              <div className="brandmark__lockup">
                <Brandmark />
              </div>
              <span className="brandmark__sheen" aria-hidden="true"></span>
              <span className="brandmark__caption">Founded in Dubai · 2020</span>
            </div>
          </div>
        </section>

        <section className="section-block" id="leadership">
          <div className="wrap">
            <div className="block-head reveal is-in">
              <span className="block-head__num">01</span>
              <h2 className="block-head__title">Leadership</h2>
              <p className="block-head__note">
                The people responsible for the cases the firm takes on and how they are managed.
              </p>
            </div>

            <div className="people">
              {LEADERSHIP.map((person) => (
                <Link
                  key={person.slug}
                  className="person reveal is-in"
                  href={`/team/${person.routeSlug}`}
                  style={{ '--mono': person.mono } as React.CSSProperties}
                >
                  <span className="person__mono" aria-hidden="true">
                    {person.initials}
                  </span>
                  <span className="person__role">{person.role}</span>
                  <h3 className="person__name">{person.name}</h3>
                  <p className="person__text">{person.short}</p>
                  <span className="person__link">Read the full profile</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block" id="team">
          <div className="wrap">
            <div className="block-head reveal is-in">
              <span className="block-head__num">02</span>
              <h2 className="block-head__title">Our Core Team</h2>
              <p className="block-head__note">The people who manage case files on a day-to-day basis.</p>
            </div>

            <div className="people">
              {CORE_TEAM.map((person) => (
                <Link
                  key={person.slug}
                  className="person reveal is-in"
                  href={`/team/${person.routeSlug}`}
                  style={{ '--mono': person.mono } as React.CSSProperties}
                >
                  <span className="person__mono" aria-hidden="true">
                    {person.initials}
                  </span>
                  <span className="person__role">{person.role}</span>
                  <h3 className="person__name">{person.name}</h3>
                  <p className="person__text">{person.short}</p>
                  <span className="person__link">Read the full profile</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

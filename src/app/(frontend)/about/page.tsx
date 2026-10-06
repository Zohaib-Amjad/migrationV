import Link from 'next/link'
import type { Metadata } from 'next'
import { Brandmark } from '@/components/Brandmark'
import { getPageContent, getTeamMembers } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'About Us | HOF Migration',
  description:
    'HOF Migration advises on skilled migration, study, family sponsorship, and investor routes from Dubai — and declines cases it cannot honestly help with.',
}

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const [team, contentData] = await Promise.all([getTeamMembers(), getPageContent('about')])
  const content = contentData as {
    hero?: { eyebrow?: string; titleLine1?: string; titleLine2?: string; lede?: string; chips?: string[] }
    intro?: { title?: string; paragraphs?: string[] }
    stats?: [string, string][]
    leadership?: { title?: string; body?: string }
    team?: { title?: string; body?: string }
    profileLink?: string
    brandmarkCaption?: string
  } | null
  const leadership = team.filter((person) => person.group === 'leadership')
  const coreTeam = team.filter((person) => person.group === 'core')
  return (
    <div className="about-page">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">
              /
            </span>
            <span aria-current="page">{content?.hero?.eyebrow || ''}</span>
          </nav>

          <div className="page-head">
            <span className="page-head__eyebrow">{content?.hero?.eyebrow || ''}</span>
            <h1 className="page-head__title">
              {content?.hero?.titleLine1 || ''}
              <br />
              {content?.hero?.titleLine2 || ''}
            </h1>
            <p className="page-head__lede">{content?.hero?.lede || ''}</p>
            <div className="page-head__meta">
              {(content?.hero?.chips || []).map((chip) => <span key={chip} className="page-head__chip">{chip}</span>)}
            </div>
          </div>
        </div>
      </div>

      <main>
        <section className="section-block">
          <div className="wrap">
            <div className="about-intro reveal is-in">
              <h2 className="about-intro__title">{content?.intro?.title || ''}</h2>
              <div className="about-intro__body">
                {(content?.intro?.paragraphs || []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>

            <div className="about-stats reveal is-in">
              {(content?.stats || []).map(([value, label]) => (
                <div key={`${value}-${label}`} className="about-stat"><b>{value}</b><span>{label}</span></div>
              ))}
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
              <span className="brandmark__caption">{content?.brandmarkCaption || ''}</span>
            </div>
          </div>
        </section>

        <section className="section-block" id="leadership">
          <div className="wrap">
            <div className="block-head reveal is-in">
              <span className="block-head__num">01</span>
              <h2 className="block-head__title">{content?.leadership?.title || ''}</h2>
              <p className="block-head__note">{content?.leadership?.body || ''}</p>
            </div>

            <div className="people">
              {leadership.map((person) => (
                <Link
                  key={person.slug}
                  className="person reveal is-in"
                  href={`/team/${person.slug}`}
                  style={{ '--mono': person.mono } as React.CSSProperties}
                >
                  <span className="person__mono" aria-hidden="true">
                    {person.initials}
                  </span>
                  <span className="person__role">{person.role}</span>
                  <h3 className="person__name">{person.name}</h3>
                  <p className="person__text">{person.short}</p>
                  <span className="person__link">{content?.profileLink || ''}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block" id="team">
          <div className="wrap">
            <div className="block-head reveal is-in">
              <span className="block-head__num">02</span>
              <h2 className="block-head__title">{content?.team?.title || ''}</h2>
              <p className="block-head__note">{content?.team?.body || ''}</p>
            </div>

            <div className="people">
              {coreTeam.map((person) => (
                <Link
                  key={person.slug}
                  className="person reveal is-in"
                  href={`/team/${person.slug}`}
                  style={{ '--mono': person.mono } as React.CSSProperties}
                >
                  <span className="person__mono" aria-hidden="true">
                    {person.initials}
                  </span>
                  <span className="person__role">{person.role}</span>
                  <h3 className="person__name">{person.name}</h3>
                  <p className="person__text">{person.short}</p>
                  <span className="person__link">{content?.profileLink || ''}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

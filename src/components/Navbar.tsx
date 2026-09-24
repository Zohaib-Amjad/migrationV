'use client'

import { useState, useEffect, useRef, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n } from '@/components/I18nProvider'
import { SERVICES } from '@/data/site-content'
import { SearchModal } from '@/components/SearchModal'
import { BrandLogo } from '@/components/BrandLogo'

export function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesAccordionOpen, setServicesAccordionOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [isCompacted, setIsCompacted] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const { isArabic, toggleLang } = useI18n()

  // Detect active service detail page: /services/[slug]
  const serviceSlugMatch = pathname?.match(/^\/services\/([a-z0-9-]+)\/?$/)
  const currentServiceSlug = serviceSlugMatch ? serviceSlugMatch[1] : null
  const currentService = currentServiceSlug
    ? SERVICES.find((s) => s.routeSlug === currentServiceSlug || s.slug === currentServiceSlug)
    : null

  // On service detail pages, the center vertical trunk takes the Section 1 background color (svc.tint).
  // On all other pages, it retains the default brand sage color #8DABA4.
  const centerLineColor = currentService ? currentService.tint : '#8DABA4'

  useEffect(() => {
    setDropdownOpen(false)
    setMobileMenuOpen(false)
  }, [pathname])

  // Detect when menu items are compacted or would collide
  useEffect(() => {
    const checkCompaction = () => {
      if (typeof window === 'undefined') return
      const width = window.innerWidth
      // At screen widths <= 1280px, items are compacted
      if (width <= 1280) {
        setIsCompacted(true)
      } else {
        if (navRef.current) {
          const navWidth = navRef.current.clientWidth
          // If available space in nav pill drops below 1040px, switch to hamburger
          if (navWidth < 1040) {
            setIsCompacted(true)
            return
          }
        }
        setIsCompacted(false)
      }
    }

    checkCompaction()
    window.addEventListener('resize', checkCompaction)
    return () => window.removeEventListener('resize', checkCompaction)
  }, [])

  // Close drawer on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false)
        setDropdownOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="nav-wrapper">
      <div className="nav-wrapper__inner">
        <header
          ref={navRef}
          className={`nav ${isCompacted ? 'is-compacted' : ''}`}
          style={
            currentService
              ? ({
                  '--svc-accent': currentService.accent,
                  '--svc-tint': currentService.tint,
                } as CSSProperties)
              : undefined
          }
        >
        <div className="nav__group">
        <Link href="/" className="nav__logo" aria-label="HOF Migration">
          <BrandLogo centerColor={centerLineColor} />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <div
            className={`nav__item ${dropdownOpen ? 'is-open' : ''}`}
            data-nav-menu=""
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              href="/#services"
              className="nav__link nav__link--dropdown"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onClick={(e) => {
                // on touch devices, first tap opens dropdown
                if (window.matchMedia('(hover: none)').matches && !dropdownOpen) {
                  e.preventDefault()
                  setDropdownOpen(true)
                }
              }}
            >
              Services
              <img src="/assets/icons-v2/chevron-down.svg" alt="" className="nav__chevron" />
            </Link>

            <div className="nav__menu" data-nav-panel="">
              <Link
                className="nav__menu-item"
                href="/services/skilled-migration"
                style={{ ['--dot']: '#0095ff' }}
                onClick={() => setDropdownOpen(false)}
              >
                <span className="nav__menu-dot" aria-hidden="true"></span>
                <span className="nav__menu-copy">
                  <b>Skilled Migration</b>
                  <small>Canada &amp; Australia</small>
                </span>
              </Link>
              <Link
                className="nav__menu-item"
                href="/services/study-abroad"
                style={{ ['--dot']: '#ff5900' }}
                onClick={() => setDropdownOpen(false)}
              >
                <span className="nav__menu-dot" aria-hidden="true"></span>
                <span className="nav__menu-copy">
                  <b>Study Abroad</b>
                  <small>Student Visas</small>
                </span>
              </Link>
              <Link
                className="nav__menu-item"
                href="/services/family-sponsorship"
                style={{ ['--dot']: '#179b66' }}
                onClick={() => setDropdownOpen(false)}
              >
                <span className="nav__menu-dot" aria-hidden="true"></span>
                <span className="nav__menu-copy">
                  <b>Family Sponsorship</b>
                  <small>Reunification</small>
                </span>
              </Link>
              <Link
                className="nav__menu-item"
                href="/services/usa-visas"
                style={{ ['--dot']: '#6b81cf' }}
                onClick={() => setDropdownOpen(false)}
              >
                <span className="nav__menu-dot" aria-hidden="true"></span>
                <span className="nav__menu-copy">
                  <b>U.S. NIW &amp; Investor</b>
                  <small>EB-2 NIW, E-2, L-1</small>
                </span>
              </Link>
              <Link
                className="nav__menu-item"
                href="/services/europe-visas"
                style={{ ['--dot']: '#fd0148' }}
                onClick={() => setDropdownOpen(false)}
              >
                <span className="nav__menu-dot" aria-hidden="true"></span>
                <span className="nav__menu-copy">
                  <b>Europe</b>
                  <small>Golden &amp; Visitor Visas</small>
                </span>
              </Link>
              <Link
                className="nav__menu-all"
                href="/services"
                onClick={() => setDropdownOpen(false)}
              >
                All services
              </Link>
            </div>
          </div>

          <Link href="/success-stories" className="nav__link">
            Success Stories
          </Link>
          <Link href="/#reviews" className="nav__link">
            Reviews
          </Link>
          <Link href="/about" className="nav__link">
            About Us
          </Link>
        </nav>
      </div>

      <div className="nav__group nav__group--right">
        <button
          type="button"
          onClick={toggleLang}
          className="nav__lang"
          dir="auto"
          data-lang-toggle=""
          data-no-translate=""
          lang={isArabic ? 'en' : 'ar'}
          aria-label={isArabic ? 'Switch the site to English' : 'Switch the site to Arabic'}
        >
          {isArabic ? 'ENGLISH' : 'العربية'}
        </button>

        <span className="nav__divider" aria-hidden="true"></span>

        <button
          type="button"
          className="nav__icon-btn"
          aria-label="Search"
          onClick={() => setSearchModalOpen(true)}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        <Link href="/#consultation" className="btn btn--panel">
          Book a free consultation
          <img src="/assets/icons-v2/arrow-up-right.svg" alt="" className="btn__icon" />
        </Link>

        {/* Hamburger Toggle Button (shown when compacted or <= 1280px) */}
        <button
          type="button"
          className="nav__hamburger"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Hamburger Menu Toggle Drawer (placed directly under navbar in toggle format) */}
      {mobileMenuOpen && (
        <div className="nav__drawer" data-nav-drawer="">
          {/* Services group with expandable toggle accordion */}
          <div className="nav__drawer-services-group">
            <button
              type="button"
              className={`nav__drawer-accordion-btn ${servicesAccordionOpen ? 'is-active' : ''}`}
              onClick={() => setServicesAccordionOpen(!servicesAccordionOpen)}
              aria-expanded={servicesAccordionOpen}
            >
              <div className="nav__drawer-accordion-left">
                <span className="nav__drawer-accordion-icon" aria-hidden="true">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                </span>
                <span className="nav__drawer-accordion-label">Services</span>
                <span className="nav__drawer-badge">5 services</span>
              </div>
              <span className={`nav__drawer-chevron-wrap ${servicesAccordionOpen ? 'is-open' : ''}`}>
                <svg className="nav__drawer-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            {servicesAccordionOpen && (
              <div className="nav__drawer-subitems-panel">
                <div className="nav__drawer-subitems-list">
                  <Link
                    className="nav__drawer-subitem"
                    href="/services/skilled-migration"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="nav__drawer-subitem-icon" style={{ backgroundColor: '#eaf2fd' }}>
                      <span className="nav__drawer-subitem-dot" style={{ backgroundColor: '#0095ff' }} />
                    </div>
                    <div className="nav__drawer-subitem-text">
                      <b className="nav__drawer-subitem-name">Skilled Migration</b>
                      <small className="nav__drawer-subitem-desc">Canada &amp; Australia</small>
                    </div>
                    <span className="nav__drawer-subitem-arrow" aria-hidden="true">→</span>
                  </Link>

                  <Link
                    className="nav__drawer-subitem"
                    href="/services/study-abroad"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="nav__drawer-subitem-icon" style={{ backgroundColor: '#fdf2eb' }}>
                      <span className="nav__drawer-subitem-dot" style={{ backgroundColor: '#ff5900' }} />
                    </div>
                    <div className="nav__drawer-subitem-text">
                      <b className="nav__drawer-subitem-name">Study Abroad</b>
                      <small className="nav__drawer-subitem-desc">Student Visas</small>
                    </div>
                    <span className="nav__drawer-subitem-arrow" aria-hidden="true">→</span>
                  </Link>

                  <Link
                    className="nav__drawer-subitem"
                    href="/services/family-sponsorship"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="nav__drawer-subitem-icon" style={{ backgroundColor: '#f0f9f4' }}>
                      <span className="nav__drawer-subitem-dot" style={{ backgroundColor: '#179b66' }} />
                    </div>
                    <div className="nav__drawer-subitem-text">
                      <b className="nav__drawer-subitem-name">Family Sponsorship</b>
                      <small className="nav__drawer-subitem-desc">Reunification</small>
                    </div>
                    <span className="nav__drawer-subitem-arrow" aria-hidden="true">→</span>
                  </Link>

                  <Link
                    className="nav__drawer-subitem"
                    href="/services/usa-visas"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="nav__drawer-subitem-icon" style={{ backgroundColor: '#ecf1ff' }}>
                      <span className="nav__drawer-subitem-dot" style={{ backgroundColor: '#6b81cf' }} />
                    </div>
                    <div className="nav__drawer-subitem-text">
                      <b className="nav__drawer-subitem-name">U.S. NIW &amp; Investor</b>
                      <small className="nav__drawer-subitem-desc">EB-2 NIW, E-2, L-1</small>
                    </div>
                    <span className="nav__drawer-subitem-arrow" aria-hidden="true">→</span>
                  </Link>

                  <Link
                    className="nav__drawer-subitem"
                    href="/services/europe-visas"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="nav__drawer-subitem-icon" style={{ backgroundColor: '#ffe8ef' }}>
                      <span className="nav__drawer-subitem-dot" style={{ backgroundColor: '#fd0148' }} />
                    </div>
                    <div className="nav__drawer-subitem-text">
                      <b className="nav__drawer-subitem-name">Europe</b>
                      <small className="nav__drawer-subitem-desc">Golden &amp; Visitor Visas</small>
                    </div>
                    <span className="nav__drawer-subitem-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>

                <Link
                  className="nav__drawer-all-link"
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>All services</span>
                  <span className="nav__drawer-all-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </div>

          <div className="nav__drawer-links">
            <Link
              href="/success-stories"
              className="nav__drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Success Stories</span>
              <span className="nav__drawer-link-arrow" aria-hidden="true">→</span>
            </Link>

            <Link
              href="/#reviews"
              className="nav__drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Reviews</span>
              <span className="nav__drawer-link-arrow" aria-hidden="true">→</span>
            </Link>

            <Link
              href="/about"
              className="nav__drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>About Us</span>
              <span className="nav__drawer-link-arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="nav__drawer-divider" />

          <div className="nav__drawer-bottom">
            <button
              type="button"
              onClick={() => {
                toggleLang()
                setMobileMenuOpen(false)
              }}
              className="nav__drawer-lang"
              dir="auto"
              data-no-translate=""
              lang={isArabic ? 'en' : 'ar'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{isArabic ? 'ENGLISH' : 'تغيير اللغة إلى العربية'}</span>
            </button>
          </div>

          <Link
            href="/#consultation"
            className="btn btn--panel nav__drawer-cta"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a free consultation
            <img src="/assets/icons-v2/arrow-up-right.svg" alt="" className="btn__icon" />
          </Link>
        </div>
      )}
        </header>
      </div>
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </div>
  )
}

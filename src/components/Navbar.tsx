'use client'

import { useState, useEffect, useRef, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n } from '@/components/I18nProvider'
import { SERVICES } from '@/data/site-content'

function BrandLogo({ centerColor }: { centerColor?: string }) {
  const stemColor = centerColor || '#8DABA4'
  return (
    <svg
      width="387"
      height="91"
      viewBox="0 0 387 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="nav__logo-img nav__logo-svg"
      aria-label="HOF Migration"
    >
      {/* Radiating palm fronds - always black */}
      <path
        d="M69.7078 44.5057C69.6079 46.0505 69.671 48.6821 69.6586 50.2984C66.3469 48.4352 63.008 46.6207 59.6429 44.8556C56.8553 43.4142 54.4246 42.2416 51.6458 40.7081C51.8771 41.0564 52.8092 42.1437 53.1111 42.5144C54.7891 44.5752 56.5835 46.5855 58.3304 48.5942C61.3161 52.0511 64.2311 55.5682 67.0737 59.1435C65.9238 60.4704 64.5937 62.4808 63.5048 63.9359C62.7838 62.5833 60.8938 59.8202 60.0112 58.5142L54.2858 50.0693L48.1805 41.1676C47.2187 39.7625 45.8421 37.5112 44.7688 36.3324C44.3459 35.7331 44.1803 35.5607 43.4278 35.4278C42.1512 35.2024 39.4967 35.6615 39.1451 37.1248C38.7206 37.8069 38.2803 38.505 37.8914 39.205C33.8752 46.4327 28.9171 53.1592 24.1099 59.8773C23.1293 61.2476 22.2997 62.5912 21.1904 63.8827C20.2212 62.4384 18.8051 60.423 17.684 59.1234C19.0375 57.8914 20.7429 55.5987 22.0784 54.1457C24.7756 51.2106 27.5131 48.2248 30.1007 45.1977C31.0814 44.0506 32.8883 42.025 33.6303 40.786C31.5592 41.8648 29.5299 43.1235 27.4213 44.1926C23.6447 46.1073 18.8864 48.2706 15.3222 50.5026C15.3451 48.7726 15.3417 46.3358 15.0959 44.6387C15.2801 44.5935 15.4625 44.5421 15.643 44.4842C16.9829 44.042 18.7151 43.2514 20.0682 42.734C23.2461 41.5189 26.3728 40.1288 29.5915 39.0164C30.0115 38.8711 32.0838 38.2023 32.2143 37.9414C31.7364 37.5022 19.5948 35.9846 17.9915 35.8309C18.547 34.4834 20.1906 31.885 21.0044 30.5938C21.927 31.1925 34.5613 34.8775 35.1076 34.6229C35.0704 34.2221 27.6035 26.3392 26.6264 25.4554C27.8775 24.6057 31.0068 22.8938 31.8276 22.0516C32.545 23.1436 33.759 24.8996 34.4599 25.9673C35.3354 27.3011 38.3017 32.4531 39.3095 33.1887L39.459 33.1559C39.6634 32.5588 39.5248 28.3093 39.5165 27.4313C39.4848 24.9477 39.4796 22.4638 39.501 19.98C41.3648 20.0015 43.2287 20.008 45.0925 19.9996C45.0975 21.3488 44.5111 32.5983 44.9353 33.1286L45.0963 33.1177C45.7923 32.5991 46.693 31.2251 47.2674 30.4951C49.3333 27.8692 51.0418 25.0697 53.078 22.4219C54.7875 23.3389 56.6035 24.5555 58.2595 25.5773C56.4764 27.0561 54.2484 29.6084 52.6022 31.3191C51.8436 32.1074 50.2767 33.8545 49.6845 34.6844C52.1512 34.5001 61.7589 31.5908 63.4245 30.199C63.6445 30.6795 64.0407 31.1623 64.3347 31.6122C65.1873 32.9173 66.26 34.3455 66.7186 35.8357C65.9111 35.8707 65.0178 36.0628 64.203 36.1303C61.6901 36.3382 59.1855 36.7993 56.7039 37.2289C56.0323 37.3451 52.6466 37.4468 52.3831 37.5953C52.4854 37.8076 52.6693 37.9059 52.8904 37.9891C58.5057 40.1034 64.2164 42.0764 69.7078 44.5057Z"
        fill="black"
        className="nav__logo-fronds"
      />
      {/* Center vertical line/stem - dynamic color per service detail page */}
      <path
        d="M46.0659 70.0659C43.7308 47.5806 45.0929 26.697 46.0659 19.0659H39.0119C40.5686 32.8472 38.3632 58.8081 37.0659 70.0659H46.0659Z"
        fill={stemColor}
        className="nav__logo-stem"
      />
      {/* Wordmark "HOF MIGRATION" - always black */}
      <path
        d="M100.148 57.5659V25.1659H105.044V39.2299H119.588V25.1659H124.484V57.5659H119.588V42.6379H105.044V57.5659H100.148ZM140.334 57.8059C135.566 57.8059 132.062 56.4939 129.822 53.8699C127.598 51.2299 126.486 47.0619 126.486 41.3659C126.486 35.6539 127.598 31.4859 129.822 28.8619C132.046 26.2219 135.55 24.9019 140.334 24.9019C145.102 24.9019 148.606 26.2219 150.846 28.8619C153.086 31.5019 154.206 35.6699 154.206 41.3659C154.206 47.0619 153.086 51.2299 150.846 53.8699C148.606 56.4939 145.102 57.8059 140.334 57.8059ZM140.334 54.3979C142.99 54.3979 145.15 53.5419 146.814 51.8299C148.478 50.1179 149.31 46.6299 149.31 41.3659C149.31 36.0699 148.478 32.5739 146.814 30.8779C145.15 29.1659 142.99 28.3099 140.334 28.3099C137.694 28.3099 135.542 29.1659 133.878 30.8779C132.214 32.5739 131.382 36.0699 131.382 41.3659C131.382 46.6299 132.214 50.1179 133.878 51.8299C135.542 53.5419 137.694 54.3979 140.334 54.3979ZM155.467 57.5659V25.1659H175.867V28.5739H160.387V40.7419H174.619V44.0059H160.387V57.5659H155.467ZM185.987 57.5659V25.1659H193.979L202.475 52.2859H202.571L211.067 25.1659H219.059V57.5659H214.235V28.5739H214.115L205.451 55.7899H199.595L190.931 28.5739H190.811V57.5659H185.987ZM222.508 57.5659V29.1019H227.38V57.5659H222.508ZM222.508 21.3259H227.38V25.6219H222.508V21.3259ZM241.811 68.7019C238.691 68.7019 236.067 67.9979 233.939 66.5899C231.827 65.1979 230.643 62.7819 230.387 59.3419H235.163C235.275 60.8459 235.611 62.0459 236.171 62.9419C236.747 63.8539 237.531 64.5179 238.523 64.9339C239.531 65.3659 240.683 65.5819 241.979 65.5819C244.107 65.5819 245.811 65.0059 247.091 63.8539C248.371 62.7019 249.011 60.4859 249.011 57.2059V34.9339L250.259 29.1259H253.883V56.7499C253.883 59.7899 253.331 62.1819 252.227 63.9259C251.139 65.6859 249.747 66.9179 248.051 67.6219C246.355 68.3419 244.275 68.7019 241.811 68.7019ZM240.059 57.7579C236.651 57.7579 234.083 56.5579 232.355 54.1579C230.643 51.7579 229.787 48.1339 229.787 43.2859C229.787 38.4379 230.635 34.8219 232.331 32.4379C234.043 30.0539 236.603 28.8619 240.011 28.8619C243.115 28.8619 245.739 29.6619 247.883 31.2619C250.027 32.8619 251.099 34.5019 251.099 36.1819L249.011 38.6299C249.011 36.9819 248.283 35.5099 246.827 34.2139C245.387 32.9019 243.659 32.2459 241.643 32.2459C239.499 32.2459 237.803 33.0299 236.555 34.5979C235.307 36.1499 234.683 39.0539 234.683 43.3099C234.683 47.5659 235.307 50.4779 236.555 52.0459C237.803 53.5979 239.499 54.3739 241.643 54.3739C243.659 54.3739 245.387 53.7179 246.827 52.4059C248.283 51.0939 249.011 49.6059 249.011 47.9419L251.147 50.5579C251.147 52.2859 250.075 53.9179 247.931 55.4539C245.787 56.9899 243.163 57.7579 240.059 57.7579ZM273.497 42.3739C273.497 38.4699 273.025 35.8139 272.081 34.4059C271.153 32.9819 269.785 32.2699 267.977 32.2699C265.913 32.2699 264.289 32.9659 263.105 34.3579C261.921 35.7339 261.329 37.2939 261.329 39.0379L259.457 37.6699C259.457 35.2379 260.385 33.1659 262.241 31.4539C264.097 29.7419 266.593 28.8859 269.729 28.8859C272.961 28.8859 275.201 29.9659 276.449 32.1259C277.713 34.2699 278.345 37.6859 278.345 42.3739H273.497ZM256.505 57.5659V29.1259H260.321L261.353 34.6219V57.5659H256.505ZM289.346 57.8299C287.874 57.8299 286.538 57.7019 285.338 57.4459C284.154 57.1739 283.122 56.7179 282.242 56.0779C281.378 55.4379 280.714 54.5659 280.25 53.4619C279.802 52.3419 279.578 50.9339 279.578 49.2379C279.578 47.6059 279.802 46.2539 280.25 45.1819C280.698 44.0939 281.338 43.2379 282.17 42.6139C283.018 41.9739 284.042 41.5179 285.242 41.2459C286.442 40.9739 287.786 40.8379 289.274 40.8379H298.562V39.2299C298.562 37.5499 298.282 36.1979 297.722 35.1739C297.162 34.1339 296.362 33.3739 295.322 32.8939C294.282 32.4139 293.05 32.1739 291.626 32.1739C290.394 32.1739 289.29 32.3899 288.314 32.8219C287.338 33.2539 286.53 33.9499 285.89 34.9099C285.266 35.8539 284.834 37.1179 284.594 38.7019L279.842 37.4299C280.098 35.8619 280.57 34.5339 281.258 33.4459C281.962 32.3579 282.826 31.4779 283.85 30.8059C284.89 30.1339 286.066 29.6459 287.378 29.3419C288.69 29.0219 290.098 28.8619 291.602 28.8619C294.13 28.8619 296.274 29.2139 298.034 29.9179C299.794 30.6219 301.13 31.7499 302.042 33.3019C302.97 34.8539 303.434 36.9099 303.434 39.4699V57.5659H299.378L298.97 53.9659C298.762 54.3659 298.402 54.7899 297.89 55.2379C297.378 55.6859 296.722 56.1099 295.922 56.5099C295.122 56.8939 294.17 57.2139 293.066 57.4699C291.978 57.7099 290.738 57.8299 289.346 57.8299ZM290.402 54.6379C291.858 54.6379 293.138 54.4619 294.242 54.1099C295.362 53.7419 296.282 53.2779 297.002 52.7179C297.722 52.1579 298.218 51.5819 298.49 50.9899V43.5739H290.402C289.586 43.5739 288.818 43.6539 288.098 43.8139C287.378 43.9579 286.746 44.2299 286.202 44.6299C285.674 45.0139 285.258 45.5659 284.954 46.2859C284.65 47.0059 284.498 47.9259 284.498 49.0459C284.498 50.1979 284.642 51.1339 284.93 51.8539C285.234 52.5739 285.658 53.1339 286.202 53.5339C286.746 53.9339 287.378 54.2219 288.098 54.3979C288.818 54.5579 289.586 54.6379 290.402 54.6379ZM317.501 57.8779C315.405 57.8779 313.653 57.4219 312.245 56.5099C310.837 55.5819 310.133 53.8699 310.133 51.3739V32.5339H303.485V29.1259H310.133V22.6939H315.005V29.1259H324.413V32.5339H315.005V50.2459C315.005 51.9899 315.365 53.1419 316.085 53.7019C316.805 54.2619 317.821 54.5419 319.133 54.5419C320.301 54.5419 321.437 54.3579 322.541 53.9899V57.2779C320.941 57.6779 319.261 57.8779 317.501 57.8779ZM326.514 57.5659V29.1019H331.386V57.5659H326.514ZM326.514 21.3259H331.386V25.6219H326.514V21.3259ZM346.297 57.7579C342.057 57.7579 338.913 56.5819 336.865 54.2299C334.817 51.8619 333.793 48.2059 333.793 43.2619C333.793 38.3179 334.817 34.6779 336.865 32.3419C338.913 29.9899 342.057 28.8139 346.297 28.8139C350.553 28.8139 353.697 29.9899 355.729 32.3419C357.777 34.6779 358.801 38.3179 358.801 43.2619C358.801 48.2059 357.777 51.8619 355.729 54.2299C353.697 56.5819 350.553 57.7579 346.297 57.7579ZM346.297 54.4219C348.521 54.4219 350.353 53.6459 351.793 52.0939C353.233 50.5259 353.953 47.5899 353.953 43.2859C353.953 38.9819 353.233 36.0539 351.793 34.5019C350.353 32.9499 348.521 32.1739 346.297 32.1739C344.073 32.1739 342.241 32.9499 340.801 34.5019C339.361 36.0539 338.641 38.9819 338.641 43.2859C338.641 47.5899 339.361 50.5259 340.801 52.0939C342.241 53.6459 344.073 54.4219 346.297 54.4219ZM360.605 57.5659V29.1259H364.421L365.453 34.6219V57.5659H360.605ZM378.437 57.5659V41.3179C378.437 38.0219 377.941 35.6859 376.949 34.3099C375.973 32.9339 374.485 32.2459 372.485 32.2459C370.485 32.2459 368.789 32.9819 367.397 34.4539C366.005 35.9259 365.309 37.7819 365.309 40.0219L362.957 38.5339C362.957 36.1979 364.005 33.9979 366.101 31.9339C368.213 29.8699 370.925 28.8379 374.237 28.8379C377.533 28.8379 379.861 29.9499 381.221 32.1739C382.597 34.3819 383.285 37.4219 383.285 41.2939V57.5659H378.437Z"
        fill="black"
        className="nav__logo-wordmark"
      />
    </svg>
  )
}

export function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesAccordionOpen, setServicesAccordionOpen] = useState(false)
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
                style={{ ['--dot' as any]: '#0095ff' }}
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
                style={{ ['--dot' as any]: '#ff5900' }}
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
                style={{ ['--dot' as any]: '#179b66' }}
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
                style={{ ['--dot' as any]: '#6b81cf' }}
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
                style={{ ['--dot' as any]: '#fd0148' }}
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
    </div>
  )
}

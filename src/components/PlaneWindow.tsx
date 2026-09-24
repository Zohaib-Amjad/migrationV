'use client'

import { useEffect, useRef, useState } from 'react'

const DESTINATIONS = [
  {
    src: '/assets/destinations/sydney.jpg',
    alt: 'Sydney Opera House, Australia',
  },
  {
    src: '/assets/destinations/new-york.jpg',
    alt: 'Brooklyn Bridge, New York, USA',
  },
  {
    src: '/assets/destinations/toronto.jpg',
    alt: 'Toronto skyline, Canada',
  },
]

export function PlaneWindow() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [leavingSlide, setLeavingSlide] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [_isDark, setIsDark] = useState(false)

  // Initialize theme from localStorage or default
  useEffect(() => {
    const saved = localStorage.getItem('hof-theme')
    const dark = saved === 'dark'
    setIsDark(dark)
    if (dark) {
      document.documentElement.classList.add('is-dark')
      setIsOpen(false)
    } else {
      // open shade automatically after a beat
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 420)
      return () => clearTimeout(timer)
    }
  }, [])

  // Advance destination slides when open
  useEffect(() => {
    if (!isOpen) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % DESTINATIONS.length
        setLeavingSlide(prev)
        setTimeout(() => {
          setLeavingSlide(null)
        }, 680)
        return next
      })
    }, 2100)

    return () => clearInterval(interval)
  }, [isOpen])

  const toggleShade = () => {
    const nextOpen = !isOpen
    setIsClosing(!nextOpen)
    setIsOpen(nextOpen)

    if (nextOpen) {
      window.setTimeout(() => setIsClosing(false), 1700)
    }

    // Shade closed means dark theme, shade open means light theme
    const nextDark = !nextOpen
    setIsDark(nextDark)

    document.documentElement.classList.add('theme-switching')
    if (nextDark) {
      document.documentElement.classList.add('is-dark')
      localStorage.setItem('hof-theme', 'dark')
    } else {
      document.documentElement.classList.remove('is-dark')
      localStorage.setItem('hof-theme', 'light')
    }

    setTimeout(() => {
      document.documentElement.classList.remove('theme-switching')
    }, 650)
  }

  return (
    <div
      ref={rootRef}
      className={`plane-window ${isOpen ? 'is-open' : ''} ${isClosing ? 'is-closing' : ''}`}
      onClick={toggleShade}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleShade()
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={!isOpen}
      aria-label="Close the window shade to switch the site to dark mode"
    >
      <img className="plane-window__frame" src="/assets/window-svg/window-frame.svg" alt="" decoding="async" />
      <img
        className="plane-window__frame plane-window__frame--dark"
        src="/assets/window-svg/window-frame-dark.svg"
        alt=""
        decoding="async"
      />

      <div className="plane-window__view">
        {DESTINATIONS.map((dest, i) => {
          const isActive = i === currentSlide
          const isLeaving = i === leavingSlide
          return (
            <div
              key={dest.src}
              className={`plane-window__slide ${isActive ? 'is-active' : ''} ${isLeaving ? 'is-leaving' : ''}`}
            >
              <img src={dest.src} alt={dest.alt} decoding="async" />
            </div>
          )
        })}
      </div>

      <svg
        className="plane-window__overlay"
        viewBox="0 0 900 1232"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="pw-aperture">
            <rect x="108" y="108" width="684" height="1016" rx="142" ry="142" />
          </clipPath>
          <linearGradient id="pw-shade-face" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0" stopColor="#f6f7f8" />
            <stop offset="0.5" stopColor="#e8ebee" />
            <stop offset="1" stopColor="#d4d9dd" />
          </linearGradient>
          <linearGradient id="pw-shade-lip" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0" stopColor="#fbfcfc" />
            <stop offset="0.45" stopColor="#e2e6e9" />
            <stop offset="1" stopColor="#bfc6cc" />
          </linearGradient>
          <linearGradient id="pw-cast" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0" stopColor="#05141b" stopOpacity="0.42" />
            <stop offset="1" stopColor="#05141b" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="pw-vignette" cx="0.5" cy="0.44" r="0.74">
            <stop offset="0.52" stopColor="#000000" stopOpacity="0" />
            <stop offset="1" stopColor="#000000" stopOpacity="0.34" />
          </radialGradient>
          <linearGradient id="pw-sheen" x1="0" y1="0" x2="0.9" y2="1">
            <stop offset="0.16" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.35" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="0.48" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pw-seal-edge" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0" stopColor="#4c5157" />
            <stop offset="1" stopColor="#8f969d" />
          </linearGradient>
          <linearGradient
            id="pw-etch"
            gradientUnits="userSpaceOnUse"
            x1="450"
            y1="175"
            x2="450"
            y2="1041"
          >
            <stop offset="0" stopColor="#868b91" />
            <stop offset="0.45" stopColor="#6c7075" />
            <stop offset="0.68" stopColor="#83888e" />
            <stop offset="1" stopColor="#6a6e73" />
          </linearGradient>
          <linearGradient
            id="pw-etch-text"
            gradientUnits="userSpaceOnUse"
            x1="450"
            y1="736"
            x2="450"
            y2="822"
          >
            <stop offset="0" stopColor="#8d9299" />
            <stop offset="0.55" stopColor="#74787e" />
            <stop offset="1" stopColor="#686c71" />
          </linearGradient>
          <filter id="pw-etch-relief" x="-4%" y="-4%" width="108%" height="108%">
            <feDropShadow
              dx="0"
              dy="-2.5"
              stdDeviation="0"
              floodColor="#080b0e"
              floodOpacity="0.65"
            />
            <feDropShadow
              dx="0"
              dy="2.5"
              stdDeviation="0"
              floodColor="#ffffff"
              floodOpacity="0.08"
            />
          </filter>
        </defs>

        <g clipPath="url(#pw-aperture)">
          <rect x="108" y="108" width="684" height="1016" fill="url(#pw-vignette)" />
          <rect x="108" y="108" width="684" height="1016" fill="url(#pw-sheen)" />
          <rect className="pw-dim" x="108" y="108" width="684" height="1016" fill="#071a22" />

          <g className="pw-shade">
            <rect x="90" y="-40" width="720" height="1164" fill="url(#pw-shade-face)" />
            <rect x="90" y="1124" width="720" height="84" fill="url(#pw-cast)" />
            <rect x="292" y="1056" width="316" height="56" rx="28" fill="url(#pw-shade-lip)" />
            <rect
              className="pw-lip-edge"
              x="292"
              y="1056"
              width="316"
              height="56"
              rx="28"
              fill="none"
              stroke="#9aa2a9"
              strokeWidth="1.5"
              opacity="0.55"
            />
            <text className="pw-lip-label pw-lip-label--open" x="450" y="1094" textAnchor="middle">
              Open
            </text>
            <text className="pw-lip-label pw-lip-label--close" x="450" y="1094" textAnchor="middle">
              Close
            </text>

            <g className="pw-message">
              <rect
                x="169"
                y="175"
                width="562"
                height="866"
                rx="102"
                ry="102"
                fill="none"
                stroke="url(#pw-etch)"
                strokeWidth="5"
                filter="url(#pw-etch-relief)"
              />
              <image
                className="pw-message__lock"
                href="/assets/icons-v2/lock-3d.png"
                x="270"
                y="358"
                width="350"
                height="350"
                preserveAspectRatio="xMidYMid meet"
              />
              <text
                className="pw-message__text"
                textAnchor="middle"
                fill="url(#pw-etch-text)"
                filter="url(#pw-etch-relief)"
              >
                <tspan x="450" y="768">
                  Keep your window open
                </tspan>
                <tspan x="450" y="810">
                  to new opportunities
                </tspan>
              </text>
            </g>
          </g>
        </g>

        <rect
          x="108"
          y="108"
          width="684"
          height="1016"
          rx="142"
          ry="142"
          fill="none"
          stroke="url(#pw-seal-edge)"
          strokeWidth="4"
        />
      </svg>
    </div>
  )
}

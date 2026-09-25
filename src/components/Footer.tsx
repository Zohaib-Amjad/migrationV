'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter-subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('success')
      }
    } catch {
      setStatus('success')
    }
  }

  return (
    <footer className="footer">
      <div className="footer__top">
        <div>
          <h3 className="footer__heading">Newsletter</h3>
          {status === 'success' ? (
            <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
              Thank you for subscribing!
            </p>
          ) : (
            <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="footer__newsletter-input"
                placeholder="Enter your email address"
                aria-label="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="footer__subscribe" disabled={status === 'loading'}>
                {status === 'loading' ? '...' : 'Subscribe'}
                <span className="footer__subscribe-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17L17 7M17 7H9M17 7v8"
                      stroke="#14161a"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </form>
          )}
          <p className="footer__newsletter-tagline">Let’s transform your vision into results.</p>
        </div>

        <div>
          <h3 className="footer__heading">Links</h3>
          <ul className="footer__links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/success-stories">Success Stories</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="footer__heading">Company</h3>
          <ul className="footer__links">
            <li>
              <Link href="/about#team">Our Team</Link>
            </li>
            <li>
              <Link href="#">Careers</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__info">
        <div className="footer__info-item">
          <span className="footer__info-label">Email</span>
          <a href="mailto:info@hofmigration.com" className="footer__info-value">
            info@hofmigration.com
          </a>
        </div>
        <div className="footer__info-item">
          <span className="footer__info-label">Visit Us</span>
          <a
            href="https://maps.google.com/?q=Business+Bay,+Dubai,+UAE"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__info-value"
          >
            Business Bay, Dubai, UAE
          </a>
        </div>
        <div className="footer__info-item">
          <span className="footer__info-label">Call Us Now</span>
          <a href="tel:+97143852200" className="footer__info-value">
            +971 4 385 2200
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-top">
          <Link href="/" className="footer__brand" aria-label="HOF Migration Home">
            <img
              src="/assets/icons-v2/logo-brand-white.svg"
              alt="HOF Migration"
              className="footer__brand-logo"
            />
          </Link>
          <div className="footer__legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms">Terms</Link>
            <span>•</span>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
        <div className="footer__bottom-divider"></div>
        <div className="footer__bottom-bottom">
          <div className="footer__social">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
          </div>
          <span className="footer__copy">© 2026. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

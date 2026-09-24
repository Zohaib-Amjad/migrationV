'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useI18n } from '@/components/I18nProvider'
import {
  SERVICES,
  STORIES,
  LEADERSHIP,
  CORE_TEAM,
  FAQS,
  type ServiceItem,
  type SuccessStoryItem,
  type TeamMemberItem,
} from '@/data/site-content'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchResult {
  id: string
  title: string
  subtitle: string
  category: 'Service' | 'Story' | 'Team' | 'FAQ' | 'Page'
  url: string
  tag?: string
}

const STATIC_PAGES = [
  { title: 'Home Page', subtitle: 'HOF Migration main overview and hero', category: 'Page' as const, url: '/' },
  { title: 'About Us', subtitle: 'Leadership team, core mission, and accreditation', category: 'Page' as const, url: '/about' },
  { title: 'All Services', subtitle: 'Explore the 5 Pillars of Migration', category: 'Page' as const, url: '/services' },
  { title: 'Success Stories', subtitle: 'Client journeys and case studies', category: 'Page' as const, url: '/success-stories' },
  { title: 'Contact Us', subtitle: 'Global offices, callback request & location info', category: 'Page' as const, url: '/#consultation' },
  { title: 'Branding & Identity', subtitle: 'Visual identity and brand guidelines', category: 'Page' as const, url: '/branding' },
  { title: 'Privacy Policy', subtitle: 'Data privacy, security, and client data handling', category: 'Page' as const, url: '/privacy-policy' },
  { title: 'Terms of Service', subtitle: 'Consultancy terms, agreement & disclaimers', category: 'Page' as const, url: '/terms' },
  { title: 'Cookie Policy', subtitle: 'Local storage, preferences, and cookie usage', category: 'Page' as const, url: '/cookies' },
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { isArabic } = useI18n()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Compute search results
  const q = query.trim().toLowerCase()
  const results: SearchResult[] = []

  if (q.length > 0) {
    // 1. Services
    SERVICES.forEach((s: ServiceItem) => {
      if (
        s.navName.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.short.toLowerCase().includes(q) ||
        s.lede.toLowerCase().includes(q) ||
        s.chips.some((chip) => chip.toLowerCase().includes(q))
      ) {
        results.push({
          id: `svc-${s.slug}`,
          title: s.title,
          subtitle: s.lede,
          category: 'Service',
          url: `/services/${s.routeSlug}`,
          tag: s.navName,
        })
      }
    })

    // 2. Success Stories
    STORIES.forEach((st: SuccessStoryItem) => {
      if (
        st.name.toLowerCase().includes(q) ||
        st.headline.toLowerCase().includes(q) ||
        st.route.toLowerCase().includes(q) ||
        st.caption.toLowerCase().includes(q) ||
        st.excerpt.toLowerCase().includes(q)
      ) {
        results.push({
          id: `story-${st.slug}`,
          title: `${st.name} — ${st.route}`,
          subtitle: st.headline,
          category: 'Story',
          url: `/success-stories/${st.routeSlug}`,
          tag: 'Case Study',
        })
      }
    })

    // 3. Team Members (LEADERSHIP + CORE_TEAM)
    const teamMembers: TeamMemberItem[] = [...LEADERSHIP, ...CORE_TEAM]
    teamMembers.forEach((tm: TeamMemberItem) => {
      if (
        tm.name.toLowerCase().includes(q) ||
        tm.role.toLowerCase().includes(q) ||
        tm.short.toLowerCase().includes(q)
      ) {
        results.push({
          id: `team-${tm.slug}`,
          title: tm.name,
          subtitle: `${tm.role} — ${tm.short}`,
          category: 'Team',
          url: `/team/${tm.routeSlug}`,
          tag: tm.role,
        })
      }
    })

    // 4. FAQs
    FAQS.forEach((faq, idx: number) => {
      if (faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)) {
        results.push({
          id: `faq-${idx}`,
          title: faq.q,
          subtitle: faq.a,
          category: 'FAQ',
          url: '/#faq',
          tag: 'FAQ',
        })
      }
    })

    // 5. Static pages
    STATIC_PAGES.forEach((page) => {
      if (
        page.title.toLowerCase().includes(q) ||
        page.subtitle.toLowerCase().includes(q)
      ) {
        results.push({
          id: `page-${page.url}`,
          title: page.title,
          subtitle: page.subtitle,
          category: 'Page',
          url: page.url,
          tag: 'Navigation',
        })
      }
    })
  }

  const handleKeyDownNav = (e: React.KeyboardEvent) => {
    if (results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
    }
  }

  const popularTags = [
    { label: 'Skilled Migration', url: '/services/skilled-migration', icon: '🇨🇦' },
    { label: 'Study Abroad', url: '/services/study-abroad', icon: '🎓' },
    { label: 'USA NIW', url: '/services/usa-visas', icon: '🇺🇸' },
    { label: 'Australia PR', url: '/services/skilled-migration', icon: '🇦🇺' },
    { label: 'Success Stories', url: '/success-stories', icon: '🌟' },
    { label: 'Book Consultation', url: '/#consultation', icon: '📅' },
  ]

  return (
    <div
      className="search-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search website"
    >
      <div
        className="search-modal-container"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownNav}
      >
        {/* Search Input Bar */}
        <div className="search-modal-header">
          <svg
            className="search-modal-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder={
              isArabic
                ? 'ابحث عن الخدمات، التأشيرات، فريق العمل، أو الأسئلة الشائعة...'
                : 'Search services, visas, team, success stories, FAQs...'
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="search-modal-clear"
              aria-label="Clear search"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="search-modal-esc"
            aria-label="Close modal"
          >
            ESC
          </button>
        </div>

        {/* Modal Body / Results */}
        <div className="search-modal-body">
          {query.trim() === '' ? (
            <div>
              <div className="search-modal-section-title">
                {isArabic ? 'عمليات البحث الشائعة' : 'Popular Searches'}
              </div>
              <div className="search-modal-pills">
                {popularTags.map((tag) => (
                  <Link
                    key={tag.label}
                    href={tag.url}
                    onClick={onClose}
                    className="search-modal-pill"
                  >
                    <span>{tag.icon}</span>
                    <span>{tag.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="search-modal-section-title">
                {results.length} {isArabic ? 'نتائج تم العثور عليها' : 'Results Found'}
              </div>
              <div className="search-modal-results">
                {results.map((res, index) => {
                  const isSelected = index === selectedIndex
                  return (
                    <Link
                      key={res.id}
                      href={res.url}
                      onClick={onClose}
                      className={`search-modal-item ${isSelected ? 'is-selected' : ''}`}
                    >
                      <div className="search-modal-item-badge">
                        {res.category === 'Service' && '✈️'}
                        {res.category === 'Story' && '🌟'}
                        {res.category === 'Team' && '👤'}
                        {res.category === 'FAQ' && '❓'}
                        {res.category === 'Page' && '📄'}
                      </div>
                      <div className="search-modal-item-info">
                        <div className="search-modal-item-top">
                          <span className="search-modal-item-title">{res.title}</span>
                          {res.tag && (
                            <span className="search-modal-item-category">{res.tag}</span>
                          )}
                        </div>
                        <div className="search-modal-item-desc">{res.subtitle}</div>
                      </div>
                      <span className="search-modal-item-arrow" aria-hidden="true">→</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="search-modal-empty">
              <div className="search-modal-empty-title">
                {isArabic ? 'لم يتم العثور على نتائج لـ' : 'No results found for'} &quot;{query}&quot;
              </div>
              <div className="search-modal-empty-desc">
                {isArabic
                  ? 'جرب البحث عن كلمات أخرى مثل "كندا"، "أستراليا"، "استشارة"'
                  : 'Try searching for keywords like "Canada", "Australia", "Consultation"'}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="search-modal-footer">
          <span>HOF Migration Spotlight</span>
          <div className="search-modal-shortcuts">
            <span className="search-modal-kbd"><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
            <span className="search-modal-kbd"><kbd>↵</kbd> Select</span>
            <span className="search-modal-kbd"><kbd>ESC</kbd> Close</span>
          </div>
        </div>
      </div>
    </div>
  )
}

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
    { label: 'Skilled Migration', url: '/services/skilled-migration' },
    { label: 'Study Abroad', url: '/services/study-abroad' },
    { label: 'USA NIW', url: '/services/usa-visas' },
    { label: 'Canada PR', url: '/services/skilled-migration' },
    { label: 'Australia PR', url: '/services/skilled-migration' },
    { label: 'Success Stories', url: '/success-stories' },
    { label: 'Contact Us', url: '/#consultation' },
  ]

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/60 px-4 pt-16 sm:pt-24 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search website"
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 shadow-2xl backdrop-blur-xl transition-all"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownNav}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <svg
            className="h-5 w-5 text-gray-400 ltr:mr-3 rtl:ml-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-base text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
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
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ltr:ml-2 rtl:mr-2 rounded-md bg-gray-100 dark:bg-gray-800 px-2.5 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            ESC
          </button>
        </div>

        {/* Modal Body / Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {isArabic ? 'عمليات البحث الشائعة' : 'Popular Searches'}
              </p>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Link
                    key={tag.label}
                    href={tag.url}
                    onClick={onClose}
                    className="rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 transition hover:border-[#179b66] hover:bg-[#179b66]/10 hover:text-[#179b66]"
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {results.length} {isArabic ? 'نتائج' : 'Results Found'}
              </p>
              {results.map((res, index) => {
                const isSelected = index === selectedIndex
                return (
                  <Link
                    key={res.id}
                    href={res.url}
                    onClick={onClose}
                    className={`group flex items-start gap-3 rounded-xl p-3 transition-colors ${
                      isSelected
                        ? 'bg-[#179b66]/10 border border-[#179b66]/30 text-gray-900 dark:text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800/70 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 group-hover:bg-[#179b66] group-hover:text-white">
                      {res.category === 'Service' && '✈️'}
                      {res.category === 'Story' && '🌟'}
                      {res.category === 'Team' && '👤'}
                      {res.category === 'FAQ' && '❓'}
                      {res.category === 'Page' && '📄'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold text-sm text-gray-900 dark:text-white">
                          {res.title}
                        </span>
                        {res.tag && (
                          <span className="inline-block rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                            {res.tag}
                          </span>
                        )}
                      </div>
                      <p className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {res.subtitle}
                      </p>
                    </div>
                    <span className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                      →
                    </span>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              <p className="text-sm font-medium">
                {isArabic ? 'لم يتم العثور على نتائج لـ' : 'No results found for'} &quot;{query}&quot;
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {isArabic
                  ? 'جرب البحث عن كلمات أخرى مثل "كندا"، "أستراليا"، "استشارة"'
                  : 'Try searching for keywords like "Canada", "Australia", "Consultation"'}
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 px-4 py-2.5 text-[11px] text-gray-400 bg-gray-50/50 dark:bg-gray-900/50">
          <span>HOF Migration Quick Search</span>
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  icon?: string
}

interface DefaultSearchCategory {
  titleEn: string
  titleAr: string
  items: {
    titleEn: string
    titleAr: string
    descEn: string
    descAr: string
    url: string
    icon: string
    tagEn: string
    tagAr: string
  }[]
}

const DEFAULT_CATEGORIES: DefaultSearchCategory[] = [
  {
    titleEn: 'Leadership & Team',
    titleAr: 'القيادة وفريق العمل',
    items: [
      {
        titleEn: 'Leadership',
        titleAr: 'فريق القيادة التنفيذية',
        descEn: 'Meet our Managing Partner & Senior Practice Directors',
        descAr: 'تعرف على الشركاء الإداريين ومديري أقسام الهجرة',
        url: '/about#leadership',
        icon: '👑',
        tagEn: 'About',
        tagAr: 'من نحن',
      },
      {
        titleEn: 'Our Core Team',
        titleAr: 'فريق العمل الرئيسي',
        descEn: 'Case managers, legal specialists, and authorized advisors',
        descAr: 'مستشارو الهجرة المعتمدون وأخصائيو معالجة الملفات',
        url: '/about#team',
        icon: '👥',
        tagEn: 'Team',
        tagAr: 'الفريق',
      },
    ],
  },
  {
    titleEn: 'Services & Visa Detail Pages',
    titleAr: 'خدمات وصفحات تفاصيل التأشيرات',
    items: [
      {
        titleEn: 'Skilled Migration',
        titleAr: 'هجرة الكفاءات وأصحاب المهن',
        descEn: 'Canada Express Entry, Australia PR Subclass 189/190, UK & NZ visas',
        descAr: 'الهجرة السريعة لكندا والإقامة الدائمة لأستراليا ونيوزيلندا وبريطانيا',
        url: '/services/skilled-migration',
        icon: '🇨🇦',
        tagEn: 'Service',
        tagAr: 'خدمة',
      },
      {
        titleEn: 'Study Abroad',
        titleAr: 'الدراسة في الخارج والتأشيرات الطلابية',
        descEn: 'Top university admissions, post-study work permits & student visas',
        descAr: 'القبول بالجامعات العالمية وتصاريح العمل بعد التخرج',
        url: '/services/study-abroad',
        icon: '🎓',
        tagEn: 'Service',
        tagAr: 'خدمة',
      },
      {
        titleEn: 'Family & Spouse Sponsorship',
        titleAr: 'لم شمل الأسرة ورعاية الزوجين',
        descEn: 'Spousal sponsorship, dependent child & parent reunion visas',
        descAr: 'تأشيرات إلحاق الزوجين والأبناء ولم شمل الوالدين',
        url: '/services/family-sponsorship',
        icon: '👨‍👩‍👧',
        tagEn: 'Service',
        tagAr: 'خدمة',
      },
      {
        titleEn: 'U.S. Visas & EB-2 NIW',
        titleAr: 'تأشيرات أمريكا وإعفاء المصلحة الوطنية',
        descEn: 'National Interest Waiver (EB-2 NIW), EB-5 investor & L-1 transfer',
        descAr: 'تأشيرات إعفاء المصلحة الوطنية ونقل المديرين والاستثمار في أمريكا',
        url: '/services/usa-visas',
        icon: '🇺🇸',
        tagEn: 'Service',
        tagAr: 'خدمة',
      },
      {
        titleEn: 'Europe Visas & Global Residency',
        titleAr: 'تأشيرات أوروبا والإقامة الذهبية',
        descEn: 'EU Golden Visas, Schengen business visas & European citizenship',
        descAr: 'الإقامة الذهبية الأوروبية وتأشيرات شنغن الاستثمارية',
        url: '/services/europe-visas',
        icon: '🇪🇺',
        tagEn: 'Service',
        tagAr: 'خدمة',
      },
    ],
  },
  {
    titleEn: 'All Pages',
    titleAr: 'كافة صفحات الموقع',
    items: [
      {
        titleEn: 'Home Page',
        titleAr: 'الصفحة الرئيسية',
        descEn: 'HOF Migration main overview and hero experience',
        descAr: 'الواجهة الرئيسية واستكشاف خدمات الهجرة والتأشيرات',
        url: '/',
        icon: '🏠',
        tagEn: 'Page',
        tagAr: 'صفحة',
      },
      {
        titleEn: 'About Us',
        titleAr: 'من نحن',
        descEn: 'Our history, licensed accreditations, and firm values',
        descAr: 'مسيرة الشركة والاعتمادات الرسمية والقيم المهنية',
        url: '/about',
        icon: '🏛️',
        tagEn: 'Page',
        tagAr: 'صفحة',
      },
      {
        titleEn: 'All Services Overview',
        titleAr: 'نظرة عامة على الخدمات',
        descEn: 'Explore the 5 Pillars of Migration',
        descAr: 'استكشف ركائز الهجرة والتأشيرات الخمسة',
        url: '/services',
        icon: '🧭',
        tagEn: 'Page',
        tagAr: 'صفحة',
      },
      {
        titleEn: 'Success Stories',
        titleAr: 'قصص النجاح',
        descEn: 'Verified client migration journeys & case studies',
        descAr: 'تجارب وقصص نجاح عملائنا في الهجرة والحصول على الإقامة',
        url: '/success-stories',
        icon: '🌟',
        tagEn: 'Page',
        tagAr: 'صفحة',
      },
      {
        titleEn: 'Book a Consultation',
        titleAr: 'حجز استشارة',
        descEn: 'Global offices, callback request & expert evaluation',
        descAr: 'طلب استشارة مجانية والتواصل مع مكاتبنا حول العالم',
        url: '/#consultation',
        icon: '📅',
        tagEn: 'Form',
        tagAr: 'نموذج',
      },
      {
        titleEn: 'Privacy Policy',
        titleAr: 'سياسة الخصوصية',
        descEn: 'Client data protection and international privacy standards',
        descAr: 'حماية بيانات العملاء ومعايير الخصوصية الدولية',
        url: '/privacy-policy',
        icon: '🔒',
        tagEn: 'Legal',
        tagAr: 'قانوني',
      },
      {
        titleEn: 'Terms of Service',
        titleAr: 'شروط الخدمة',
        descEn: 'Advisory agreements, retainer terms, and governance',
        descAr: 'شروط التعاقد والتمثيل الاستشاري والحوكمة',
        url: '/terms',
        icon: '📜',
        tagEn: 'Legal',
        tagAr: 'قانوني',
      },
      {
        titleEn: 'Cookie Policy',
        titleAr: 'سياسة ملفات الارتباط',
        descEn: 'Local storage and browsing preference management',
        descAr: 'إدارة التخزين المحلي وتفضيلات التصفح',
        url: '/cookies',
        icon: '🍪',
        tagEn: 'Legal',
        tagAr: 'قانوني',
      },
    ],
  },
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter()
  const { isArabic } = useI18n()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleNavigate = useCallback(
    (url: string) => {
      onClose()
      if (url.startsWith('/#')) {
        const hash = url.replace('/', '')
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
          const el = document.querySelector(hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
            return
          }
        }
      }
      router.push(url)
    },
    [onClose, router]
  )

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)

      const prevBodyOverflow = document.body.style.overflow
      const prevHtmlOverflow = document.documentElement.style.overflow
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = prevBodyOverflow
        document.documentElement.style.overflow = prevHtmlOverflow
      }
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

  // Compute search results when typing
  const q = query.trim().toLowerCase()
  const results: SearchResult[] = []

  if (q.length > 0) {
    // 1. Explicit matches for Leadership & Core Team sections
    if (
      'leadership'.includes(q) ||
      'قيادة'.includes(q) ||
      'leaders'.includes(q) ||
      'directors'.includes(q)
    ) {
      results.push({
        id: 'section-leadership',
        title: isArabic ? 'فريق القيادة التنفيذية' : 'Leadership',
        subtitle: isArabic
          ? 'تعرف على الشركاء الإداريين ومديري أقسام الهجرة'
          : 'Meet our Managing Partner & Senior Practice Directors',
        category: 'Team',
        url: '/about#leadership',
        tag: isArabic ? 'من نحن' : 'About',
        icon: '👑',
      })
    }

    if (
      'our core team'.includes(q) ||
      'core team'.includes(q) ||
      'فريق العمل'.includes(q) ||
      'team'.includes(q)
    ) {
      results.push({
        id: 'section-core-team',
        title: isArabic ? 'فريق العمل الرئيسي' : 'Our Core Team',
        subtitle: isArabic
          ? 'مستشارو الهجرة المعتمدون وأخصائيو معالجة الملفات'
          : 'Case managers, legal specialists, and authorized advisors',
        category: 'Team',
        url: '/about#team',
        tag: isArabic ? 'الفريق' : 'Team',
        icon: '👥',
      })
    }

    // 2. Services
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
          icon: '✈️',
        })
      }
    })

    // 3. Success Stories
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
          icon: '🌟',
        })
      }
    })

    // 4. Team Members (LEADERSHIP + CORE_TEAM)
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
          icon: '👤',
        })
      }
    })

    // 5. FAQs
    FAQS.forEach((faq, idx: number) => {
      if (faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)) {
        results.push({
          id: `faq-${idx}`,
          title: faq.q,
          subtitle: faq.a,
          category: 'FAQ',
          url: '/#faq',
          tag: 'FAQ',
          icon: '❓',
        })
      }
    })

    // 6. Static / Core Pages
    DEFAULT_CATEGORIES[2].items.forEach((page) => {
      if (
        page.titleEn.toLowerCase().includes(q) ||
        page.titleAr.toLowerCase().includes(q) ||
        page.descEn.toLowerCase().includes(q) ||
        page.descAr.toLowerCase().includes(q)
      ) {
        results.push({
          id: `page-${page.url}`,
          title: isArabic ? page.titleAr : page.titleEn,
          subtitle: isArabic ? page.descAr : page.descEn,
          category: 'Page',
          url: page.url,
          tag: isArabic ? page.tagAr : page.tagEn,
          icon: page.icon,
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
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[selectedIndex]) {
        handleNavigate(results[selectedIndex].url)
      }
    }
  }

  return (
    <div
      className="search-modal-backdrop"
      onClick={onClose}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Search website"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div
        className="search-modal-container"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
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
                ? 'ابحث عن الخدمات، القيادة، فريق العمل، أو صفحات الموقع...'
                : 'Search services, leadership, core team, pages...'
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
            /* Categorized Initial State when Search is Opened */
            <div className="space-y-6">
              {DEFAULT_CATEGORIES.map((cat, catIdx) => (
                <div key={catIdx} className="mb-5 last:mb-0">
                  <div className="search-modal-section-title">
                    {isArabic ? cat.titleAr : cat.titleEn}
                  </div>
                  <div className="search-modal-results">
                    {cat.items.map((item, itemIdx) => (
                      <Link
                        key={itemIdx}
                        href={item.url}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavigate(item.url)
                        }}
                        className="search-modal-item"
                      >
                        <div className="search-modal-item-badge">
                          <span>{item.icon}</span>
                        </div>
                        <div className="search-modal-item-info">
                          <div className="search-modal-item-top">
                            <span className="search-modal-item-title">
                              {isArabic ? item.titleAr : item.titleEn}
                            </span>
                            <span className="search-modal-item-category">
                              {isArabic ? item.tagAr : item.tagEn}
                            </span>
                          </div>
                          <div className="search-modal-item-desc">
                            {isArabic ? item.descAr : item.descEn}
                          </div>
                        </div>
                        <span className="search-modal-item-arrow" aria-hidden="true">
                          {isArabic ? '←' : '→'}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
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
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavigate(res.url)
                      }}
                      className={`search-modal-item ${isSelected ? 'is-selected' : ''}`}
                    >
                      <div className="search-modal-item-badge">
                        <span>{res.icon || '📄'}</span>
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
                      <span className="search-modal-item-arrow" aria-hidden="true">
                        {isArabic ? '←' : '→'}
                      </span>
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
                  ? 'جرب البحث عن "القيادة"، "فريق العمل"، "كندا"، "أستراليا"، أو "استشارة"'
                  : 'Try searching for "Leadership", "Core Team", "Canada", "Australia", or "Consultation"'}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="search-modal-footer">
          <span>{isArabic ? 'HOF Migration — البحث السريع' : 'HOF Migration Spotlight'}</span>
          <div className="search-modal-shortcuts">
            <span className="search-modal-kbd"><kbd>↑</kbd><kbd>↓</kbd> {isArabic ? 'تنقل' : 'Navigate'}</span>
            <span className="search-modal-kbd"><kbd>↵</kbd> {isArabic ? 'اختيار' : 'Select'}</span>
            <span className="search-modal-kbd"><kbd>ESC</kbd> {isArabic ? 'إغلاق' : 'Close'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

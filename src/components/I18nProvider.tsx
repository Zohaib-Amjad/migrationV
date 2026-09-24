'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { AR_DICTIONARY, AR_ATTRS, AR_WORD_DICTIONARY } from '@/lib/i18n'

interface I18nContextType {
  lang: 'en' | 'ar'
  dir: 'ltr' | 'rtl'
  isArabic: boolean
  toggleLang: () => void
  setLang: (lang: 'en' | 'ar') => void
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  dir: 'ltr',
  isArabic: false,
  toggleLang: () => {},
  setLang: () => {},
})

const ATTRS = ['placeholder', 'aria-label', 'title', 'alt']
const STORE_KEY = 'hof-lang'
const ATTR_SELECTORS = '[' + ATTRS.join('],[') + ']'
const SAVED_ATTR_SELECTORS = '[' + ATTRS.map((a) => 'data-en-' + a).join('],[') + ']'

function walkTextNodes(root: Node, fn: (node: Text) => void) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p = node.parentNode as HTMLElement | null
      if (!p) return NodeFilter.FILTER_REJECT
      const tag = p.nodeName
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') {
        return NodeFilter.FILTER_REJECT
      }
      if (p.closest && p.closest('[data-lang-toggle], .nav__lang, .nav__drawer-lang, [data-no-translate]')) {
        return NodeFilter.FILTER_REJECT
      }
      return node.nodeValue && node.nodeValue.trim()
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT
    },
  })
  let node: Node | null
  while ((node = walker.nextNode())) {
    fn(node as Text)
  }
}

interface I18nTextNode extends Text {
  __enText?: string
}

// Pre-sort dictionary entries by descending length for greedy matching
const sortedEntries = Object.entries(AR_DICTIONARY).sort((a, b) => b[0].length - a[0].length)

function normalizeText(str: string): string {
  return str
    .replace(/\s+/g, ' ')
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .trim()
}

// Pre-build normalized lookup map
const normalizedMap = new Map<string, string>()
for (const [key, val] of Object.entries(AR_DICTIONARY)) {
  const norm = normalizeText(key)
  if (!normalizedMap.has(norm)) {
    normalizedMap.set(norm, val)
  }
}

// Word regex list for automated word-level translation of newly introduced content
const wordRegexList: Array<[RegExp, string]> = []
for (const [enWord, arWord] of Object.entries(AR_WORD_DICTIONARY)) {
  if (!enWord || !arWord) continue
  wordRegexList.push([new RegExp(`\\b${enWord}\\b`, 'gi'), arWord])
}

const translationCache = new Map<string, string>()

export function translateEnToAr(raw: string): string {
  if (!raw || !raw.trim()) return raw
  if (!/[a-zA-Z]/.test(raw)) return raw

  const leading = raw.match(/^\s*/)?.[0] || ''
  const trailing = raw.match(/\s*$/)?.[0] || ''
  const trimmed = raw.trim()

  if (translationCache.has(trimmed)) {
    return leading + translationCache.get(trimmed)! + trailing
  }

  // 1. Direct match
  if (AR_DICTIONARY[trimmed]) {
    const hit = AR_DICTIONARY[trimmed]
    translationCache.set(trimmed, hit)
    return leading + hit + trailing
  }

  // 2. Normalized match
  const norm = normalizeText(trimmed)
  if (normalizedMap.has(norm)) {
    const hit = normalizedMap.get(norm)!
    translationCache.set(trimmed, hit)
    return leading + hit + trailing
  }

  // 3. Delimiter decomposition (handles lines, bullets, slashes, dashes)
  const delimRegex = /^(.+?)(\s*(?:[•·|/\n]| - | — )\s*)(.+)$/
  const match = trimmed.match(delimRegex)
  if (match) {
    const [, p1, delim, p2] = match
    const t1 = translateEnToAr(p1).trim()
    const t2 = translateEnToAr(p2).trim()
    if (t1 !== p1 || t2 !== p2) {
      const combined = `${t1}${delim}${t2}`
      translationCache.set(trimmed, combined)
      return leading + combined + trailing
    }
  }

  // 4. Substring greedy matching for multi-phrase blocks
  let working = trimmed
  for (const [key, hit] of sortedEntries) {
    if (!key || key === hit || key.length < 4) continue
    if (working.includes(key)) {
      working = working.split(key).join(hit)
    }
  }

  // 5. Word-by-word fallback for any remaining English words (automated fallback)
  if (/[a-zA-Z]{2,}/.test(working)) {
    for (const [regex, arWord] of wordRegexList) {
      if (regex.test(working)) {
        working = working.replace(regex, arWord)
      }
    }
  }

  translationCache.set(trimmed, working)
  return leading + working + trailing
}

let isTranslating = false

export function translateToArabic() {
  if (typeof document === 'undefined' || isTranslating) return
  isTranslating = true

  try {
    // 1. Walk DOM text nodes
    walkTextNodes(document.body, (node) => {
      const textNode = node as I18nTextNode
      if (textNode.__enText === undefined) {
        textNode.__enText = node.nodeValue || ''
      }
      const raw = textNode.__enText
      if (!raw || !raw.trim()) return

      const translated = translateEnToAr(raw)
      if (translated !== node.nodeValue) {
        node.nodeValue = translated
      }
    })

    // 2. Select option elements
    document.querySelectorAll('option').forEach((opt) => {
      if (opt.getAttribute('data-en-text') === null) {
        opt.setAttribute('data-en-text', opt.textContent || '')
      }
      const orig = opt.getAttribute('data-en-text') || ''
      const hit = AR_DICTIONARY[orig.trim()] || translateEnToAr(orig)
      if (hit && hit !== opt.textContent) {
        opt.textContent = hit
      }
    })

    // 3. Attributes (placeholder, aria-label, title, alt)
    document.querySelectorAll(ATTR_SELECTORS).forEach((el) => {
      ATTRS.forEach((attr) => {
        const val = el.getAttribute(attr)
        if (!val) return
        if (el.getAttribute('data-en-' + attr) === null) {
          el.setAttribute('data-en-' + attr, val)
        }
        const orig = el.getAttribute('data-en-' + attr) || val
        const hit =
          AR_ATTRS[orig.trim()] ||
          AR_DICTIONARY[orig.trim()] ||
          translateEnToAr(orig)
        if (hit && hit !== val) {
          el.setAttribute(attr, hit)
        }
      })
    })
  } finally {
    isTranslating = false
  }
}

export function restoreToEnglish() {
  if (typeof document === 'undefined') return

  walkTextNodes(document.body, (node) => {
    const textNode = node as I18nTextNode
    if (textNode.__enText !== undefined) {
      node.nodeValue = textNode.__enText
    }
  })

  document.querySelectorAll('option').forEach((opt) => {
    const orig = opt.getAttribute('data-en-text')
    if (orig !== null) {
      opt.textContent = orig
    }
  })

  document.querySelectorAll(SAVED_ATTR_SELECTORS).forEach((el) => {
    ATTRS.forEach((attr) => {
      const saved = el.getAttribute('data-en-' + attr)
      if (saved !== null) {
        el.setAttribute(attr, saved)
      }
    })
  })
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<'en' | 'ar'>('en')
  const pathname = usePathname()

  const applyLanguage = useCallback((targetLang: 'en' | 'ar') => {
    const isAr = targetLang === 'ar'
    const html = document.documentElement

    html.setAttribute('lang', isAr ? 'ar' : 'en')
    html.setAttribute('dir', isAr ? 'rtl' : 'ltr')

    if (isAr) {
      translateToArabic()
    } else {
      restoreToEnglish()
    }

    try {
      localStorage.setItem(STORE_KEY, targetLang)
    } catch {}

    // Adjust carousel scroll offsets on flip
    document.querySelectorAll('.reviews__track').forEach((track) => {
      const el = track as HTMLElement
      const behavior = el.style.scrollBehavior
      el.style.scrollBehavior = 'auto'
      el.scrollLeft = 0
      el.style.scrollBehavior = behavior
    })

    window.dispatchEvent(new Event('resize'))
  }, [])

  // Restore saved language preference on mount
  useEffect(() => {
    let initialLang: 'en' | 'ar' = 'en'
    try {
      const saved = localStorage.getItem(STORE_KEY)
      if (saved === 'ar' || saved === 'en') {
        initialLang = saved
      }
    } catch {}

    setLangState(initialLang)
    applyLanguage(initialLang)
  }, [applyLanguage])

  // Continuous translation listener when Arabic is active
  useEffect(() => {
    if (lang !== 'ar') {
      return
    }

    // Run stepped timers for Next.js App Router streaming/chunk renders
    translateToArabic()
    const t1 = setTimeout(translateToArabic, 80)
    const t2 = setTimeout(translateToArabic, 250)
    const t3 = setTimeout(translateToArabic, 600)

    // MutationObserver to translate any newly mounted DOM branches (accordions, tabs, forms)
    let debouncedTimer: ReturnType<typeof setTimeout> | null = null
    const observer = new MutationObserver(() => {
      if (isTranslating) return
      if (debouncedTimer) clearTimeout(debouncedTimer)
      debouncedTimer = setTimeout(() => {
        translateToArabic()
      }, 40)
    })

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
    }

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      if (debouncedTimer) clearTimeout(debouncedTimer)
      observer.disconnect()
    }
  }, [pathname, lang])

  const setLang = useCallback(
    (newLang: 'en' | 'ar') => {
      setLangState(newLang)
      applyLanguage(newLang)
    },
    [applyLanguage]
  )

  const toggleLang = useCallback(() => {
    const next = lang === 'ar' ? 'en' : 'ar'
    setLang(next)
  }, [lang, setLang])

  return (
    <I18nContext.Provider
      value={{
        lang,
        dir: lang === 'ar' ? 'rtl' : 'ltr',
        isArabic: lang === 'ar',
        toggleLang,
        setLang,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}

export default I18nProvider

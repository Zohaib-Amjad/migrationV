'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Frontend error caught by boundary:', error)
  }, [error])

  return (
    <div className="page-shell">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">Error</span>
          </nav>
          <div className="page-head">
            <h1 className="page-head__title">Something went wrong</h1>
            <p className="page-head__lede">
              An unexpected error occurred while rendering this page.
            </p>
            <div className="page-head__meta mt-4 flex gap-4">
              <button
                type="button"
                onClick={() => reset()}
                className="btn btn--panel cursor-pointer"
              >
                Try Again
              </button>
              <Link href="/" className="btn btn--dark">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

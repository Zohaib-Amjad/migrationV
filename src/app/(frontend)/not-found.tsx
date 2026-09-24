import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="page-shell">
      <div className="page-band">
        <div className="page-band__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">/</span>
            <span aria-current="page">Page Not Found</span>
          </nav>
          <div className="page-head">
            <h1 className="page-head__title">Page Not Found</h1>
            <p className="page-head__lede">
              The page you are looking for does not exist or has been moved.
            </p>
            <div className="page-head__meta mt-4 flex gap-4">
              <Link href="/" className="btn btn--panel">
                Return to Homepage
              </Link>
              <Link href="/services" className="btn btn--dark">
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

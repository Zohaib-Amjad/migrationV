/**
 * Lightweight check for whether Payload CMS is likely available.
 * We intentionally avoid importing `pg` directly because it may not
 * be resolvable on all deployment targets (e.g. Vercel). Instead we
 * simply verify the DATABASE_URI env var is present and non-placeholder.
 * Actual connection errors are caught by the route handler wrapper.
 */
export async function isPayloadAvailable(): Promise<boolean> {
  const connectionString = process.env.DATABASE_URI?.trim()

  if (!connectionString) {
    return false
  }

  // Reject obvious placeholder values that won't connect
  if (
    connectionString.includes('[YOUR-') ||
    connectionString === 'postgresql://postgres:placeholder@localhost:5432/postgres'
  ) {
    return false
  }

  return true
}


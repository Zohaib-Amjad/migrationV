import { Pool } from 'pg'

const PAYLOAD_CHECK_TIMEOUT_MS = 3000

export async function isPayloadAvailable(): Promise<boolean> {
  const connectionString = process.env.DATABASE_URI?.trim()

  if (!connectionString) {
    return false
  }

  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  })

  try {
    await Promise.race([
      pool.query('SELECT 1'),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Database connection timeout')), PAYLOAD_CHECK_TIMEOUT_MS)
      }),
    ])

    return true
  } catch {
    return false
  } finally {
    await pool.end()
  }
}

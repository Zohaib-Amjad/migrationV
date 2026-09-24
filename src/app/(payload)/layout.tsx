/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { isPayloadAvailable } from '@/lib/payload-health'
import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const cmsUnavailableMessage =
  'CMS is currently unavailable. Please ensure PostgreSQL is running and DATABASE_URI is configured.'

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'

  if (!(await isPayloadAvailable())) {
    return { error: cmsUnavailableMessage }
  }

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = async ({ children }: Args) => {
  if (!(await isPayloadAvailable())) {
    return (
      <html lang="en">
        <body>
          <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>CMS unavailable</h1>
            <p>{cmsUnavailableMessage}</p>
          </main>
          {children}
        </body>
      </html>
    )
  }

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}

export default Layout

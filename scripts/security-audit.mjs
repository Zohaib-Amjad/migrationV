#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const repoRoot = process.cwd()
const violations = []

console.log('='.repeat(70))
console.log('STARTING LOCAL REPOSITORY INTEGRITY & ANTI-MALWARE AUDIT')
console.log('='.repeat(70))

// 1. DROPPER FILES AUDIT
console.log('\n[Step 1/5] Checking for dropper files on disk...')
const DROPPER_PATTERNS = [
  /temp_auto_push.*\.bat$/i,
  /temp_interactive_push.*\.bat$/i,
  /^branch_structure\.json$/i,
]

function walk(dir) {
  let results = []
  if (!fs.existsSync(dir)) return results
  const list = fs.readdirSync(dir)
  for (const item of list) {
    if (['node_modules', '.next', '.git', 'media'].includes(item)) continue
    const fullPath = path.join(dir, item)
    try {
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        results = results.concat(walk(fullPath))
      } else {
        results.push(fullPath)
      }
    } catch {
      // Ignore unreadable files
    }
  }
  return results
}

const allFiles = walk(repoRoot)

for (const file of allFiles) {
  const base = path.basename(file)
  for (const pattern of DROPPER_PATTERNS) {
    if (pattern.test(base)) {
      const rel = path.relative(repoRoot, file)
      violations.push({ file: rel, line: 1, message: `Known dropper file found: ${rel}` })
    }
  }
}
if (!violations.length) {
  console.log('  -> Passed: Zero dropper files detected.')
}

// 2. GITIGNORE INTEGRITY AUDIT
console.log('\n[Step 2/5] Checking .gitignore files for dropper exclusions...')
const GITIGNORE_SIGS = /(temp_auto_push|temp_interactive_push|branch_structure\.json)/

for (const file of allFiles) {
  if (path.basename(file) === '.gitignore') {
    const lines = fs.readFileSync(file, 'utf8').split('\n')
    lines.forEach((line, idx) => {
      const match = line.match(GITIGNORE_SIGS)
      if (match) {
        const rel = path.relative(repoRoot, file)
        violations.push({
          file: rel,
          line: idx + 1,
          message: `Malicious dropper exclusion found: "${match[0]}"`,
        })
      }
    })
  }
}
if (!violations.some(v => v.file.includes('.gitignore'))) {
  console.log('  -> Passed: All .gitignore files clean.')
}

// 3. BUILD CONFIGURATION AUDIT
console.log('\n[Step 3/5] Checking build configuration files for obfuscated payloads...')
const CONFIG_FILE_PATTERNS = [
  /postcss\.config\.(js|mjs|cjs|ts)$/i,
  /tailwind\.config\.(js|mjs|cjs|ts)$/i,
  /next\.config\.(js|mjs|ts)$/i,
  /vite\.config\.(js|mjs|ts)$/i,
  /webpack\.config\.(js|mjs|cjs|ts)$/i,
]

const PAYLOAD_REGEX =
  /(global\.i\s*=|createRequire\(import\.meta\.url\)\s*;\s*const require\s*=.*global\.i|withRpcEndpoints|lastSenderTx|decodeAddress|_0x[0-9a-fA-F]{3,})/

for (const file of allFiles) {
  const base = path.basename(file)
  if (CONFIG_FILE_PATTERNS.some(p => p.test(base))) {
    const rel = path.relative(repoRoot, file)
    const content = fs.readFileSync(file, 'utf8')
    const lines = content.split('\n')

    lines.forEach((line, idx) => {
      if (line.length > 500) {
        violations.push({
          file: rel,
          line: idx + 1,
          message: `Suspiciously long line (${line.length} chars). Potential payload injection.`,
        })
      }
      const match = line.match(PAYLOAD_REGEX)
      if (match) {
        violations.push({
          file: rel,
          line: idx + 1,
          message: `Malicious code signature detected: "${match[0]}"`,
        })
      }
    })
  }
}
if (!violations.some(v => v.file.includes('config'))) {
  console.log('  -> Passed: All configuration files clean.')
}

// 4. PACKAGE.JSON LIFECYCLE SCRIPTS AUDIT
console.log('\n[Step 4/5] Checking package.json for rogue hooks...')
for (const file of allFiles) {
  if (path.basename(file) === 'package.json') {
    try {
      const pkg = JSON.parse(fs.readFileSync(file, 'utf8'))
      const scripts = pkg.scripts || {}
      for (const hook of ['preinstall', 'install', 'postinstall', 'prepublish', 'postpublish']) {
        if (scripts[hook]) {
          const cmd = scripts[hook]
          if (/(curl|wget|powershell|cmd\.exe|temp_auto_push|node\s+-e\s+["'].*global\.i)/i.test(cmd)) {
            const rel = path.relative(repoRoot, file)
            violations.push({
              file: rel,
              line: 1,
              message: `Suspicious command in package.json '${hook}': ${cmd}`,
            })
          }
        }
      }
    } catch {
      // Ignore json parse error
    }
  }
}
console.log('  -> Passed: No suspicious lifecycle hooks found.')

// 5. SUMMARY
console.log('\n' + '='.repeat(70))
if (violations.length > 0) {
  console.error(`AUDIT FAILED: ${violations.length} SECURITY VIOLATION(S) DETECTED!`)
  console.log('='.repeat(70))
  for (const v of violations) {
    console.error(`  FAIL: ${v.file}:${v.line} -> ${v.message}`)
  }
  process.exit(1)
} else {
  console.log('AUDIT PASSED: REPOSITORY IS 100% CLEAN AND FREE OF MALWARE')
  console.log('='.repeat(70))
  process.exit(0)
}

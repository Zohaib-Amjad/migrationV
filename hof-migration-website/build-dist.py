#!/usr/bin/env python3
"""
Assemble a deploy-ready copy of the site in dist/.

The working directory carries a lot that should not be hosted: earlier
prototypes (index.html, artifact*.html, hero-airplane-window*.html), the
stylesheets only those used, and ~11MB of reference artwork under
assets/reference. Rather than maintain a list of things to leave out, this
walks the pages that are actually part of the site and copies only what they
reach.

Two things change on the way out:

  * hero-full.html becomes index.html, so the site has a root URL, and every
    link to it is rewritten. Shipping both would serve identical content at
    two URLs, which is a duplicate-content problem the SEO team would have to
    undo later.
  * nothing else. The files are otherwise byte-for-byte the local ones.

Run after build-pages.py:

    python3 build-pages.py && python3 build-dist.py
"""

import os
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DIST = ROOT / 'dist'

HOME = 'hero-full.html'
HOME_OUT = 'index.html'

# The pages that make up the site. Everything else is reached from these.
ENTRY = [HOME, 'services.html', 'success-stories.html', 'about.html', 'branding.html']


def referenced(entries):
    """Every local file the entry pages reach, following html and css."""
    seen, queue = set(), list(entries)
    while queue:
        name = queue.pop()
        if name in seen:
            continue
        path = ROOT / name
        if not path.is_file():
            continue
        seen.add(name)
        text = path.read_text(encoding='utf-8', errors='ignore')
        refs = re.findall(r'url\(["\']?([^"\')]+)', text)
        if name.endswith('.html'):
            refs += re.findall(r'(?:src|href)="([^"#?][^"]*?)"', text)
        for ref in refs:
            ref = ref.split('?')[0].split('#')[0]
            if not ref or ref.startswith(('http', 'mailto:', 'data:', '/')):
                continue
            if (ROOT / ref).is_file():
                queue.append(ref)
    return sorted(seen)


def main():
    for entry in ENTRY:
        if not (ROOT / entry).is_file():
            sys.exit(f'missing entry page: {entry} — run build-pages.py first')

    files = referenced(ENTRY)

    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()

    # hero-full.html -> index.html, everywhere
    link = re.compile(r'(?<=")' + re.escape(HOME) + r'(?=["#])')

    for name in files:
        out_name = HOME_OUT if name == HOME else name
        dest = DIST / out_name
        dest.parent.mkdir(parents=True, exist_ok=True)
        if name.endswith('.html'):
            dest.write_text(link.sub(HOME_OUT, (ROOT / name).read_text(encoding='utf-8')),
                            encoding='utf-8')
        else:
            shutil.copy2(ROOT / name, dest)

    # A preview build is a public URL carrying placeholder copy. Keeping it
    # out of the index costs nothing now and saves un-indexing it later; a
    # production build must NOT carry this file.
    if '--preview' in sys.argv:
        (DIST / 'robots.txt').write_text(
            '# Preview build — placeholder content, not for indexing.\n'
            '# Delete this file before deploying to production.\n'
            'User-agent: *\n'
            'Disallow: /\n',
            encoding='utf-8')
        print('robots.txt: indexing disallowed (preview build)')

    total = sum(f.stat().st_size for f in DIST.rglob('*') if f.is_file())
    pages = sum(1 for f in DIST.rglob('*.html'))
    print(f'dist/  {len(files)} files, {pages} pages, {total / 1e6:.1f} MB')

    # a link that survived the rename would 404 on the host
    stale = [f.name for f in DIST.rglob('*.html')
             if HOME in f.read_text(encoding='utf-8')]
    if stale:
        sys.exit(f'links still pointing at {HOME}: {stale}')
    print('no stale links')


if __name__ == '__main__':
    main()

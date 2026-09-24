/**
 * Services section — horizontal scroll-hijack.
 *
 * Pattern: a tall wrapper (`.services__scroll`) whose height equals
 * viewport height + the horizontal distance the track needs to travel.
 * A `position: sticky` viewport (`.services__sticky`) pins in place while
 * that wrapper scrolls past, and the track's translateX is driven 1:1 from
 * how far the wrapper has scrolled — so the user's vertical scroll input
 * directly controls horizontal movement, with no wheel-event hijacking or
 * scroll-locking involved. That keeps it reliable across trackpads, mouse
 * wheels, and keyboard/scrollbar scrolling alike.
 *
 * Small screens and prefers-reduced-motion get a plain native horizontally
 * swipeable row instead (see services.css) — this script no-ops for them.
 */
(function () {
  function initServicesScroll(root) {
    // `root` is the element carrying [data-services-scroll], which IS
    // `.services__scroll` itself — querySelector only matches descendants,
    // so it has to be used directly rather than queried for.
    var scrollEl = root;
    var stickyEl = root.querySelector('.services__sticky');
    var headerEl = root.querySelector('.services__header');
    var viewportEl = root.querySelector('.services__viewport');
    var trackEl = root.querySelector('.services__track');
    if (!scrollEl || !stickyEl || !viewportEl || !trackEl) return;

    var mq = window.matchMedia('(max-width: 900px), (prefers-reduced-motion: reduce)');
    var maxScroll = 0;
    var ticking = false;

    // Reference aspect ratio of the card design (Figma node 118:1244: 1079×1079 — square).
    var CARD_ASPECT = 1079 / 1079;
    // How many cards (incl. the partial one) should fill the viewport width.
    var VISIBLE_CARDS = 2.5;
    // Fraction of the space below the heading a card may use, leaving
    // breathing room above and below so it never touches either edge.
    var MAX_HEIGHT_FRACTION = 0.94;

    function sizeCards() {
      var gap = parseFloat(getComputedStyle(trackEl).columnGap) || 40;
      var viewportWidth = viewportEl.clientWidth;
      var headerHeight = headerEl ? headerEl.offsetHeight : 0;
      // Budget measured from the window, not from .services__viewport: that
      // element's height is what this function ends up setting, so reading it
      // here would feed back on itself and shrink the cards on every resize.
      var heightBudget = window.innerHeight - headerHeight;

      // Width so that ~2.5 cards fit across...
      var widthFit = (viewportWidth - 2 * gap) / VISIBLE_CARDS;
      var heightFromWidthFit = widthFit / CARD_ASPECT;

      // ...but never taller than the room left under the heading, so the
      // cards stay fully visible for the whole scroll (a hard rule that
      // takes priority over the exact 2.5-card count on short screens).
      var cardHeight = Math.min(heightFromWidthFit, heightBudget * MAX_HEIGHT_FRACTION);
      var cardWidth = cardHeight * CARD_ASPECT;

      trackEl.style.setProperty('--card-w', cardWidth + 'px');
      trackEl.style.setProperty('--card-h', cardHeight + 'px');
    }

    function measure() {
      if (mq.matches) {
        scrollEl.style.height = '';
        trackEl.style.transform = '';
        maxScroll = 0;
        return;
      }
      sizeCards();
      var viewportWidth = viewportEl.clientWidth;
      var trackWidth = trackEl.scrollWidth;
      maxScroll = Math.max(0, trackWidth - viewportWidth);
      // The wrapper reserves exactly one pinned viewport plus the distance
      // the track has to travel — no more, so nothing empty is left over
      // once the last card has been reached.
      scrollEl.style.height = stickyEl.offsetHeight + maxScroll + 'px';
    }

    function update() {
      ticking = false;
      if (mq.matches || maxScroll <= 0) return;

      var rect = scrollEl.getBoundingClientRect();
      // How far we've scrolled into the wrapper, in px, clamped to [0, maxScroll].
      var progressPx = -rect.top;
      if (progressPx < 0) progressPx = 0;
      if (progressPx > maxScroll) progressPx = maxScroll;

      // in a right-to-left row the track starts at the right edge, so the
      // same scroll progress has to push it the other way
      var dir = document.documentElement.getAttribute('dir') === 'rtl' ? 1 : -1;
      trackEl.style.transform = 'translateX(' + dir * progressPx + 'px)';
    }

    function onScroll() {
      // Apply immediately so the track never reads stale on a throttled/
      // backgrounded rAF (some automation and low-power contexts suspend
      // rAF), then let rAF coalesce any further updates within the frame.
      update();
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    function onResize() {
      measure();
      update();
    }

    measure();
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    mq.addEventListener
      ? mq.addEventListener('change', onResize)
      : mq.addListener(onResize);
  }

  function init() {
    document.querySelectorAll('[data-services-scroll]').forEach(initServicesScroll);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

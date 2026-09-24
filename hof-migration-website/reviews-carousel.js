/**
 * Reviews carousel — simple prev/next arrows scrolling a native
 * horizontally-scrollable row (scroll-snap). No hijacking, no pinning —
 * the row is just a plain overflow-x track the buttons nudge along.
 */
(function () {
  function initReviews(root) {
    var track = root.querySelector('.reviews__track');
    var prev = root.querySelector('.reviews__arrow--prev');
    var next = root.querySelector('.reviews__arrow--next');
    if (!track || !prev || !next) return;

    function cardStep() {
      var card = track.querySelector('.review-card');
      if (!card) return track.clientWidth;
      var style = getComputedStyle(card);
      var gap = parseFloat(style.marginRight || 0) || parseFloat(style.marginLeft || 0) || 0;
      return card.getBoundingClientRect().width + gap;
    }

    // scrollLeft runs the other way in a right-to-left track, so "next" still
    // means "further along the row" in either direction
    function forward() {
      return document.documentElement.getAttribute('dir') === 'rtl' ? -1 : 1;
    }

    prev.addEventListener('click', function () {
      track.scrollBy({ left: -cardStep() * forward(), behavior: 'smooth' });
    });

    next.addEventListener('click', function () {
      track.scrollBy({ left: cardStep() * forward(), behavior: 'smooth' });
    });
  }

  function init() {
    document.querySelectorAll('[data-reviews]').forEach(initReviews);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

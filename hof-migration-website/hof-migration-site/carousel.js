/**
 * Airplane-window image carousel.
 *
 * Crossfades between `.window__slide` elements inside a `[data-carousel]`
 * container. This is placeholder imagery for now — the final destination
 * photography will replace these slides without needing to touch this logic.
 */
(function () {
  function initCarousel(root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('.window__slide'));
    if (slides.length < 2) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    var interval = parseInt(root.getAttribute('data-interval'), 10) || 5000;
    var current = slides.findIndex(function (s) {
      return s.classList.contains('is-active');
    });
    if (current === -1) current = 0;

    setInterval(function () {
      var next = (current + 1) % slides.length;
      slides[current].classList.remove('is-active');
      slides[next].classList.add('is-active');
      current = next;
    }, interval);
  }

  function init() {
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

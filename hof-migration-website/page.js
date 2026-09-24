/**
 * Reveal on scroll for the pages beyond Home.
 *
 * Elements marked .reveal start hidden in CSS and are shown as they arrive.
 * If the observer never reports — some embedded and backgrounded contexts
 * never run it — a timeout shows everything, so nothing is left invisible.
 */
(function () {
  var targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  function showAll() {
    targets.forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    showAll();
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
  );

  targets.forEach(function (el) {
    io.observe(el);
  });

  window.setTimeout(showAll, 2500);
})();

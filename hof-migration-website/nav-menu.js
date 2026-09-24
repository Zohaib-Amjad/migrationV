/**
 * Services dropdown.
 *
 * Hover opens it on pointer devices; click opens it everywhere, which is also
 * what keyboard and touch get. The parent link keeps its own href — on the
 * Home page it still scrolls to the services section — so a click on a device
 * with a real pointer follows the link, and only a tap (no hover available)
 * is intercepted to open the panel instead.
 */
(function () {
  var items = document.querySelectorAll('[data-nav-menu]');
  if (!items.length) return;

  var hoverable = window.matchMedia('(hover: hover)').matches;

  items.forEach(function (item) {
    var link = item.querySelector('.nav__link');
    var timer = null;

    function open() {
      window.clearTimeout(timer);
      item.classList.add('is-open');
      if (link) link.setAttribute('aria-expanded', 'true');
    }

    function close() {
      item.classList.remove('is-open');
      if (link) link.setAttribute('aria-expanded', 'false');
    }

    if (hoverable) {
      item.addEventListener('mouseenter', open);
      item.addEventListener('mouseleave', function () {
        // a short grace period so crossing the gap to the panel doesn't drop it
        timer = window.setTimeout(close, 120);
      });
    }

    if (link) {
      link.addEventListener('click', function (event) {
        if (hoverable) return; // let the link do its job
        if (!item.classList.contains('is-open')) {
          event.preventDefault();
          open();
        }
      });
    }

    item.addEventListener('focusin', open);
    item.addEventListener('focusout', function (event) {
      if (!item.contains(event.relatedTarget)) close();
    });

    document.addEventListener('click', function (event) {
      if (!item.contains(event.target)) close();
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    items.forEach(function (item) {
      item.classList.remove('is-open');
      var link = item.querySelector('.nav__link');
      if (link) link.setAttribute('aria-expanded', 'false');
    });
  });
})();

/**
 * Animated hero airplane window.
 *
 * Sequence: the shade is down when the page loads, lifts once the window is
 * actually on screen, and the destinations then slide through the glass from
 * left to right, one every HOLD ms.
 *
 * The shade travel and the slide itself are CSS (see plane-window.css); this
 * decides when they run and re-parks each outgoing slide once it has left the
 * frame, which has to be scripted — the reset has to happen with transitions
 * off, or the image would travel back across the glass in view.
 */
(function () {
  var OPEN_DELAY = 420; // a beat before the shade lifts
  var OPEN_DURATION = 1700; // must match the CSS animation
  var HOLD = 1500; // how long each destination is up
  var SLIDE = 600; // must match the CSS transform transition

  function initWindow(root) {
    var slides = Array.prototype.slice.call(
      root.querySelectorAll('.plane-window__slide')
    );
    if (!slides.length) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var current = 0;
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains('is-active')) current = i;
    }

    // Send a slide that has finished leaving back to its waiting position off
    // the left edge. Both positions are outside the glass, so with the
    // transition suppressed the jump is never visible.
    function park(slide) {
      slide.style.transition = 'none';
      slide.classList.remove('is-leaving');
      void slide.offsetWidth;
      slide.style.transition = '';
    }

    function advance() {
      var next = (current + 1) % slides.length;
      var leaving = slides[current];

      slides[next].classList.add('is-active');
      leaving.classList.remove('is-active');
      leaving.classList.add('is-leaving');

      window.setTimeout(function () {
        if (!leaving.classList.contains('is-active')) park(leaving);
      }, SLIDE + 80);

      current = next;
    }

    var timer = null;
    var opened = false;
    var shut = false; // closed again by the viewer, rather than not yet opened

    function startCycling() {
      if (timer || slides.length < 2 || shut) return;
      timer = window.setInterval(advance, HOLD);
    }

    function stopCycling() {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    }

    function open() {
      if (opened) return;
      opened = true;
      root.classList.add('is-open');
      window.setTimeout(startCycling, OPEN_DURATION);
    }

    /* ----------------------------------------------------------------------
       Click to close the shade and take the whole site dark; click again to
       lift it and bring the light back. The theme itself lives in
       dark-mode.css — the .theme-switching class is only on long enough to
       cross-fade, so it never sits on top of component transitions.
       ---------------------------------------------------------------------- */

    var root_el = document.documentElement;
    var switching = null;

    function setTheme(dark) {
      root_el.classList.add('theme-switching');
      root_el.classList.toggle('is-dark', dark);
      // The shade is the only theme control on the site, and it only exists
      // here. Recording the choice is what lets the inner pages open in the
      // same treatment — see the head snippet they carry. The Home page does
      // not read it back: the hero always starts with the shade up.
      try {
        window.localStorage.setItem('hof-theme', dark ? 'dark' : 'light');
      } catch (e) {
        /* private browsing — the choice just won't carry */
      }
      window.clearTimeout(switching);
      switching = window.setTimeout(function () {
        root_el.classList.remove('theme-switching');
      }, 650);
    }

    function closeWindow() {
      shut = true;
      stopCycling();
      root.classList.remove('is-open');
      root.classList.add('is-closing');
      root.setAttribute('aria-pressed', 'true');
      setTheme(true);
    }

    function reopenWindow() {
      shut = false;
      root.classList.remove('is-closing');
      root.classList.add('is-open');
      root.setAttribute('aria-pressed', 'false');
      setTheme(false);
      window.setTimeout(startCycling, OPEN_DURATION);
    }

    function toggle() {
      // if the hero was never scrolled into view the window is still shut, so
      // treat the first click as the thing that opens it rather than a no-op
      if (!opened) {
        open();
        return;
      }
      if (shut) reopenWindow();
      else closeWindow();
    }

    root.addEventListener('click', toggle);
    root.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        toggle();
      }
    });

    if (reduceMotion) {
      // open immediately and skip the reveal, but the window is still a
      // working light/dark switch
      opened = true;
      root.classList.add('is-open');
      return;
    }

    if (!('IntersectionObserver' in window)) {
      window.setTimeout(open, OPEN_DELAY);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            if (!opened) window.setTimeout(open, OPEN_DELAY);
            else startCycling();
          } else if (!entry.isIntersecting) {
            // nothing to animate while the hero is scrolled past
            stopCycling();
          }
        });
      },
      { threshold: [0, 0.25] }
    );

    observer.observe(root);
  }

  function init() {
    document.querySelectorAll('[data-plane-window]').forEach(initWindow);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

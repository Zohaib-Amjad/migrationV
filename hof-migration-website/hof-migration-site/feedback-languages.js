/**
 * "We care about you" — the line beside the Share Your Feedback ask types its
 * way through the five languages in the Figma reference.
 *
 * The phrases live in the markup (hidden) rather than in here, so the set is
 * legible without running the script and assistive tech reads whole strings
 * instead of a field mutating character by character.
 *
 * Text is advanced by grapheme, not by code unit: Devanagari and Telugu build
 * a syllable out of a consonant plus combining marks, and slicing between them
 * would flash a stray matra on its own before the letter it belongs to.
 */
(function () {
  var CYCLE = 2000; // ms a language holds the line, per the brief
  var TYPE = 760; // spent typing it in
  var HOLD = 820; // spent complete
  var ERASE = 320; // spent clearing it

  // Intl.Segmenter splits on real grapheme clusters; Array.from at least keeps
  // surrogate pairs intact where it isn't available.
  var segment =
    typeof Intl !== 'undefined' && Intl.Segmenter
      ? (function () {
          var seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
          return function (text) {
            var out = [];
            var it = seg.segment(text)[Symbol.iterator]();
            for (var r = it.next(); !r.done; r = it.next()) out.push(r.value.segment);
            return out;
          };
        })()
      : function (text) {
          return Array.prototype.slice.call(text);
        };

  function initLine(root) {
    var typed = root.querySelector('.feedback__typed');
    var store = root.querySelector('[data-feedback-sources]');
    if (!typed || !store) return;

    var langs = Array.prototype.slice.call(store.children).map(function (el) {
      return {
        lang: el.getAttribute('lang') || 'en',
        dir: el.getAttribute('dir') || 'ltr',
        parts: segment(el.textContent.trim())
      };
    });
    if (langs.length < 2) return;

    var index = 0;
    var timers = [];
    var running = false;

    function later(fn, ms) {
      timers.push(window.setTimeout(fn, ms));
    }

    function clearTimers() {
      timers.forEach(window.clearTimeout);
      timers = [];
    }

    function render(entry, count) {
      typed.setAttribute('lang', entry.lang);
      typed.setAttribute('dir', entry.dir);
      typed.textContent = entry.parts.slice(0, count).join('');
    }

    function run() {
      if (!running) return;
      var entry = langs[index];
      var n = entry.parts.length;
      var step = TYPE / n;

      render(entry, 0);
      for (var i = 1; i <= n; i++) {
        (function (count) {
          later(function () {
            render(entry, count);
          }, step * count);
        })(i);
      }

      var eraseStep = ERASE / n;
      for (var j = 1; j <= n; j++) {
        (function (count) {
          later(function () {
            render(entry, n - count);
          }, TYPE + HOLD + eraseStep * count);
        })(j);
      }

      later(function () {
        index = (index + 1) % langs.length;
        run();
      }, CYCLE);
    }

    function start() {
      if (running) return;
      running = true;
      run();
    }

    function stop() {
      running = false;
      clearTimers();
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // one language, typed out and left alone
      return;
    }

    if (!('IntersectionObserver' in window)) {
      start();
      return;
    }

    // nothing to type while the section is off screen
    new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) start();
          else stop();
        });
      },
      { threshold: 0.1 }
    ).observe(root);
  }

  function init() {
    document.querySelectorAll('[data-feedback-languages]').forEach(initLine);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

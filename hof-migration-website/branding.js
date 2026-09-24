/**
 * Brand page — theme switch, swatch copying, and a reveal on scroll.
 *
 * The page carries its own light/dark class (brand-dark) rather than the
 * site's is-dark: this is a showcase that flips on demand, not the product
 * theme, and the two should not fight over the same hook.
 */
(function () {
  var THEME_KEY = 'hof-brand-theme';

  /* ---------------------------------------------------------------- theme */

  function initTheme() {
    var btn = document.querySelector('[data-theme-toggle]');
    var label = document.querySelector('[data-theme-label]');
    var mast = document.querySelector('[data-logo-mast]');
    if (!btn) return;

    function apply(dark) {
      document.documentElement.classList.toggle('brand-dark', dark);
      btn.setAttribute('aria-pressed', String(dark));
      if (label) label.textContent = dark ? 'Light' : 'Dark';
      // the masthead lockup has to swap artwork, not invert — the wordmark
      // needs real white drawing
      if (mast) {
        mast.src = dark
          ? 'assets/icons-v2/logo-brand-white.svg'
          : 'assets/icons-v2/logo-brand.svg';
      }
      try {
        window.localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
      } catch (e) {
        /* private browsing — the choice just won't persist */
      }
    }

    var saved = null;
    try {
      saved = window.localStorage.getItem(THEME_KEY);
    } catch (e) {
      /* ignore */
    }
    if (saved === 'dark') apply(true);

    btn.addEventListener('click', function () {
      apply(!document.documentElement.classList.contains('brand-dark'));
    });
  }

  /* ----------------------------------------------------------- copy a hex */

  function initCopy() {
    var toast = document.querySelector('[data-toast]');
    var timer = null;

    function say(text) {
      if (!toast) return;
      toast.textContent = text;
      toast.classList.add('is-visible');
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        toast.classList.remove('is-visible');
      }, 1400);
    }

    document.querySelectorAll('[data-hex]').forEach(function (el) {
      el.addEventListener('click', function () {
        var hex = el.getAttribute('data-hex');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(hex).then(
            function () {
              say(hex + ' copied');
            },
            function () {
              say(hex);
            }
          );
        } else {
          say(hex);
        }
      });
    });
  }

  /* --------------------------------------------------------- reveal on cue */

  function initReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    var targets = document.querySelectorAll('.section__head, .specimen, .logo-tile, .cert-stage, .motion-stage, .colour-hero, .ramp');
    targets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 620ms cubic-bezier(0.2,0,0.1,1), transform 620ms cubic-bezier(0.2,0,0.1,1)';
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach(function (el) {
      io.observe(el);
    });

    // If the observer never reports — some embedded and backgrounded contexts
    // never run it — clear the inline styles so nothing is left invisible.
    window.setTimeout(function () {
      targets.forEach(function (el) {
        if (el.style.opacity === '0') {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
    }, 2500);
  }

  function init() {
    initTheme();
    initCopy();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

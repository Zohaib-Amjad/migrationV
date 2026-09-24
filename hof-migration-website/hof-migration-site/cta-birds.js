/**
 * CTA bird scene.
 *
 * The flock sits on the tree until the banner is actually reached, then takes
 * flight once — the paths themselves live in cta-banner.css, this only decides
 * when they run. The class is removed again once the section has left the
 * viewport entirely, which re-perches the birds off-screen so the scene is
 * always at rest when you next scroll down to it.
 */
(function () {
  function init() {
    var scene = document.querySelector('[data-bird-scene]');
    if (!scene) return;

    if (!('IntersectionObserver' in window)) {
      scene.classList.add('is-flying');
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio >= 0.3) {
            scene.classList.add('is-flying');
          } else if (!entry.isIntersecting) {
            scene.classList.remove('is-flying');
          }
        });
      },
      { threshold: [0, 0.3] }
    );

    observer.observe(scene);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/**
 * FAQ accordion — toggles one `.faq-item` open/closed at a time by setting
 * `data-open`. Height animates via a CSS grid-template-rows transition
 * (0fr -> 1fr) rather than a JS-measured max-height, so it stays correct
 * even if the answer text reflows.
 */
(function () {
  function initFaq(root) {
    var items = root.querySelectorAll('.faq-item');

    items.forEach(function (item) {
      var question = item.querySelector('.faq-item__question');
      if (!question) return;

      question.addEventListener('click', function () {
        var isOpen = item.getAttribute('data-open') === 'true';
        items.forEach(function (other) {
          other.setAttribute('data-open', 'false');
          other.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.setAttribute('data-open', 'true');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function init() {
    document.querySelectorAll('[data-faq]').forEach(initFaq);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

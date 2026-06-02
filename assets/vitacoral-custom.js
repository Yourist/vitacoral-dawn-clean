/* Vitacoral foundation script placeholder.
   Add non-blocking theme interactions here as the rebuild progresses. */

(() => {
  const revealSelector = '.vitacoral-reveal';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const showElements = (elements) => {
    elements.forEach((element) => {
      element.classList.add('is-visible');
    });
  };

  const initReveal = () => {
    const revealElements = Array.from(document.querySelectorAll(revealSelector));
    if (!revealElements.length) return;

    if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
      showElements(revealElements);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15,
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal, { once: true });
    return;
  }

  initReveal();
})();

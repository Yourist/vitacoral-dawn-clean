/* Vitacoral foundation script placeholder.
   Add non-blocking theme interactions here as the rebuild progresses. */

(() => {
  const revealSelector = '.vitacoral-reveal, .vc-reveal';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const inDesignMode = Boolean(window.Shopify && window.Shopify.designMode);
  const staggeredTargets = [
    '.vitacoral-product-family__item',
    '.vitacoral-featured-products__item',
    '.vitacoral-trust__item',
    '.vitacoral-social-proof__item',
    '.vitacoral-education__item',
    '.vitacoral-faq__item',
    '.vitacoral-product-story__card',
    '.vc-product-card',
  ];
  const revealTargets = [
    '.vitacoral-editorial-media__intro',
    '.vitacoral-editorial-media__visual',
    '.vitacoral-quiz__content',
    '.vitacoral-quiz__visual',
    '.vitacoral-hero__content',
    '.vitacoral-hero__media-column',
    '.vitacoral-product-family__header',
    '.vitacoral-product-family__footer',
    '.vitacoral-featured-products__header',
    '.vitacoral-featured-products__footer',
    '.vitacoral-trust__intro',
    '.vitacoral-trust__cards',
    '.vitacoral-social-proof__header',
    '.vitacoral-social-proof__footer',
    '.vitacoral-education__header',
    '.vitacoral-education__footer',
    '.vitacoral-faq__intro',
    '.vitacoral-faq__items',
  ];

  const showElements = (elements) => {
    elements.forEach((element) => {
      element.classList.add('is-visible');
      element.dataset.vcRevealReady = 'true';
    });
  };

  const addRevealClass = (element, classes) => {
    if (!element) return;
    classes.forEach((className) => element.classList.add(className));
  };

  const registerMotionTargets = (root) => {
    revealTargets.forEach((selector) => {
      root.querySelectorAll(selector).forEach((element) => {
        addRevealClass(element, ['vc-reveal']);
      });
    });

    staggeredTargets.forEach((selector) => {
      root.querySelectorAll(selector).forEach((element) => {
        addRevealClass(element, ['vc-reveal', 'vc-reveal--stagger']);
      });
    });
  };

  const assignStaggerDelays = (elements) => {
    const staggerGroups = new Map();

    elements.forEach((element) => {
      if (!element.classList.contains('vc-reveal--stagger')) {
        element.style.removeProperty('--vc-reveal-delay');
        return;
      }

      const parent = element.parentElement;
      if (!parent) return;

      if (!staggerGroups.has(parent)) {
        staggerGroups.set(parent, []);
      }

      staggerGroups.get(parent).push(element);
    });

    staggerGroups.forEach((group) => {
      group.forEach((element, index) => {
        element.style.setProperty('--vc-reveal-delay', `${Math.min(index, 5) * 70}ms`);
      });
    });
  };

  const normalizeText = (value) => (value || '').toLocaleLowerCase('tr-TR').trim();

  const routeRoutineCards = (scope = document) => {
    const root = scope instanceof Element || scope instanceof Document ? scope : document;
    const routineRoutes = [
      { matcher: 'kadın rutin paketi', href: '/pages/kadin-rutini' },
      { matcher: 'erkek rutin paketi', href: '/pages/erkek-rutini' },
      { matcher: 'aile günlük rutini', href: '/pages/aile-rutini' },
      { matcher: 'hafif rutin paketi', href: '/pages/hafif-rutin' },
    ];

    root.querySelectorAll('.vitacoral-product-family__card').forEach((card) => {
      const title = normalizeText(card.querySelector('.vitacoral-product-family__title')?.textContent);
      const route = routineRoutes.find((item) => title.includes(item.matcher));
      if (!route) return;

      card.querySelectorAll('a[href]').forEach((link) => {
        link.setAttribute('href', route.href);
      });
    });
  };

  const ensureFooterToolsLink = (scope = document) => {
    const root = scope instanceof Element || scope instanceof Document ? scope : document;
    const footer = root.querySelector('.footer') || document.querySelector('.footer');
    if (!footer || footer.querySelector('.vc-footer-tools-link')) return;

    const target = footer.querySelector('.footer__content-bottom-wrapper:last-of-type') || footer;
    const wrapper = document.createElement('div');
    wrapper.className = 'vc-footer-tools-link';
    wrapper.innerHTML = '<a class="vc-footer-tools-link__anchor" href="/pages/saglik-hesaplama-araclari"><span class="vc-footer-tools-link__dot" aria-hidden="true"></span><span>Sağlık araçları ve rutin rehberi</span></a>';
    target.prepend(wrapper);
  };

  const initReveal = (scope = document) => {
    const root = scope instanceof Element || scope instanceof Document ? scope : document;
    registerMotionTargets(root);
    routeRoutineCards(root);
    ensureFooterToolsLink(root);

    const revealElements = Array.from(root.querySelectorAll(revealSelector)).filter(
      (element) => !element.closest('.shopify-section-header')
    );
    if (!revealElements.length) return;

    assignStaggerDelays(revealElements);

    if (inDesignMode || prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
      showElements(revealElements);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-visible');
          entry.target.dataset.vcRevealReady = 'true';
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.14,
      }
    );

    revealElements.forEach((element) => {
      if (element.dataset.vcRevealReady === 'true') return;

      element.classList.remove('is-visible');
      observer.observe(element);
    });
  };

  const boot = () => initReveal(document);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  document.addEventListener('shopify:section:load', (event) => {
    initReveal(event.target);
  });

  if (typeof prefersReducedMotion.addEventListener === 'function') {
    prefersReducedMotion.addEventListener('change', () => initReveal(document));
  }
})();
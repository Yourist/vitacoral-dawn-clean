/* Vitacoral foundation script.
   Non-blocking theme interactions for the Dawn rebuild. */

(() => {
  const styleId = 'vc-motion-layer';
  const revealSelector = '.vitacoral-reveal, .vc-reveal';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const inDesignMode = Boolean(window.Shopify && window.Shopify.designMode);

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
    '.vitacoral-featured-products__campaign',
    '.vitacoral-featured-products__footer',
    '.vitacoral-trust__intro',
    '.vitacoral-trust__cards',
    '.vitacoral-social-proof__header',
    '.vitacoral-social-proof__footer',
    '.vitacoral-education__header',
    '.vitacoral-education__footer',
    '.vitacoral-faq__intro',
    '.vitacoral-faq__items',
    '.vc-campaign-spotlight__inner',
  ];

  const staggeredTargets = [
    '.vitacoral-hero__chip',
    '.vitacoral-product-family__item',
    '.vitacoral-featured-products__item',
    '.vitacoral-trust__item',
    '.vitacoral-social-proof__item',
    '.vitacoral-education__item',
    '.vitacoral-faq__item',
    '.vitacoral-product-story__card',
    '.vc-product-card',
  ];

  const injectMotionStyles = () => {
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .vc-reveal,
      .vitacoral-reveal {
        opacity: 0;
        transform: translate3d(0, 18px, 0);
        transition: opacity .72s cubic-bezier(.22, 1, .36, 1), transform .72s cubic-bezier(.22, 1, .36, 1);
        transition-delay: var(--vc-reveal-delay, 0ms);
        will-change: opacity, transform;
      }
      .vc-reveal.is-visible,
      .vitacoral-reveal.is-visible {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      .vitacoral-hero__content.vc-reveal,
      .vitacoral-hero__media-column.vc-reveal {
        transform: translate3d(0, 14px, 0) scale(.992);
      }
      .vitacoral-hero__content.vc-reveal.is-visible,
      .vitacoral-hero__media-column.vc-reveal.is-visible {
        transform: translate3d(0, 0, 0) scale(1);
      }
      .vitacoral-featured-products__card,
      .vitacoral-product-family__card,
      .vc-campaign-surface__trigger,
      .vc-campaign-spotlight__inner {
        transition: transform .28s cubic-bezier(.22, 1, .36, 1), box-shadow .28s cubic-bezier(.22, 1, .36, 1), border-color .28s ease;
      }
      .vc-campaign-surface__trigger,
      .vc-campaign-spotlight__inner {
        position: relative;
        overflow: hidden;
      }
      .vc-campaign-surface__trigger::after,
      .vc-campaign-spotlight__inner::after {
        content: '';
        position: absolute;
        inset: -35% auto auto -25%;
        width: 44%;
        height: 180%;
        background: linear-gradient(100deg, transparent 0%, rgba(255,255,255,.26) 46%, transparent 74%);
        transform: translateX(-120%) rotate(12deg);
        pointer-events: none;
        transition: transform .9s cubic-bezier(.22, 1, .36, 1);
      }
      .vc-campaign-surface__trigger:hover::after,
      .vc-campaign-spotlight__inner:hover::after {
        transform: translateX(340%) rotate(12deg);
      }
      @media (hover: hover) and (pointer: fine) {
        .vitacoral-featured-products__card:hover,
        .vitacoral-product-family__card:hover {
          transform: translateY(-6px);
        }
        .vc-campaign-surface__trigger:hover {
          transform: translateY(-2px);
        }
      }
      @media screen and (max-width: 749px) {
        .vc-reveal,
        .vitacoral-reveal {
          transform: translate3d(0, 12px, 0);
          transition-duration: .56s;
        }
        .vc-campaign-surface__trigger::after,
        .vc-campaign-spotlight__inner::after {
          display: none;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .vc-reveal,
        .vitacoral-reveal,
        .vitacoral-featured-products__card,
        .vitacoral-product-family__card,
        .vc-campaign-surface__trigger,
        .vc-campaign-spotlight__inner {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
          animation: none !important;
        }
        .vc-campaign-surface__trigger::after,
        .vc-campaign-spotlight__inner::after {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  };

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
      root.querySelectorAll(selector).forEach((element) => addRevealClass(element, ['vc-reveal']));
    });

    staggeredTargets.forEach((selector) => {
      root.querySelectorAll(selector).forEach((element) => addRevealClass(element, ['vc-reveal', 'vc-reveal--stagger']));
    });
  };

  const assignStaggerDelays = (elements) => {
    const groups = new Map();

    elements.forEach((element) => {
      if (!element.classList.contains('vc-reveal--stagger')) {
        element.style.removeProperty('--vc-reveal-delay');
        return;
      }

      const parent = element.parentElement;
      if (!parent) return;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(element);
    });

    groups.forEach((group) => {
      group.forEach((element, index) => {
        element.style.setProperty('--vc-reveal-delay', `${Math.min(index, 5) * 70}ms`);
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
    injectMotionStyles();
    registerMotionTargets(root);
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
      { rootMargin: '0px 0px -8% 0px', threshold: 0.14 }
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

  document.addEventListener('shopify:section:load', (event) => initReveal(event.target));

  if (typeof prefersReducedMotion.addEventListener === 'function') {
    prefersReducedMotion.addEventListener('change', () => initReveal(document));
  }
})();
/* Vitacoral custom interactions. */
(() => {
  const styleId = 'vc-motion-layer';
  const revealSelector = '.vitacoral-reveal, .vc-reveal';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const designMode = Boolean(window.Shopify && window.Shopify.designMode);
  const revealTargets = ['.vitacoral-editorial-media__intro','.vitacoral-editorial-media__visual','.vitacoral-quiz__content','.vitacoral-quiz__visual','.vitacoral-hero__content','.vitacoral-hero__media-column','.vitacoral-product-family__header','.vitacoral-product-family__footer','.vitacoral-featured-products__header','.vitacoral-featured-products__campaign','.vitacoral-featured-products__footer','.vitacoral-trust__intro','.vitacoral-trust__cards','.vitacoral-social-proof__header','.vitacoral-social-proof__footer','.vitacoral-education__header','.vitacoral-education__footer','.vitacoral-faq__intro','.vitacoral-faq__items','.vc-campaign-spotlight__inner'];
  const staggerTargets = ['.vitacoral-hero__chip','.vitacoral-product-family__item','.vitacoral-featured-products__item','.vitacoral-trust__item','.vitacoral-social-proof__item','.vitacoral-education__item','.vitacoral-faq__item','.vitacoral-product-story__card','.vc-product-card'];
  const baseMotion = `.vc-reveal,.vitacoral-reveal{opacity:0;transform:translate3d(0,18px,0);transition:opacity .72s cubic-bezier(.22,1,.36,1),transform .72s cubic-bezier(.22,1,.36,1);transition-delay:var(--vc-reveal-delay,0ms);will-change:opacity,transform}.vc-reveal.is-visible,.vitacoral-reveal.is-visible{opacity:1;transform:translate3d(0,0,0)}.vitacoral-hero__content.vc-reveal,.vitacoral-hero__media-column.vc-reveal{transform:translate3d(0,14px,0) scale(.992)}.vitacoral-hero__content.vc-reveal.is-visible,.vitacoral-hero__media-column.vc-reveal.is-visible{transform:translate3d(0,0,0) scale(1)}.vitacoral-featured-products__card,.vitacoral-product-family__card,.vc-campaign-surface__trigger,.vc-campaign-spotlight__inner{transition:transform .28s cubic-bezier(.22,1,.36,1),box-shadow .28s cubic-bezier(.22,1,.36,1),border-color .28s ease}.vc-campaign-surface__trigger,.vc-campaign-spotlight__inner{position:relative;overflow:hidden}.vc-campaign-surface__trigger::after,.vc-campaign-spotlight__inner::after{content:'';position:absolute;inset:-35% auto auto -25%;width:44%;height:180%;background:linear-gradient(100deg,transparent 0%,rgba(255,255,255,.26) 46%,transparent 74%);transform:translateX(-120%) rotate(12deg);pointer-events:none;transition:transform .9s cubic-bezier(.22,1,.36,1)}.vc-campaign-surface__trigger:hover::after,.vc-campaign-spotlight__inner:hover::after{transform:translateX(340%) rotate(12deg)}`;
  const pdpMotion = `product-info[data-vc-has-sticky-atc="true"]{background:radial-gradient(circle at 12% 0%,rgba(225,117,61,.12),transparent 27rem),radial-gradient(circle at 88% 8%,rgba(34,89,82,.12),transparent 30rem),linear-gradient(180deg,rgba(247,250,249,.92),#fff 64%)}product-info[data-vc-has-sticky-atc="true"] .product.grid{align-items:flex-start}product-info[data-vc-has-sticky-atc="true"] .product__media-wrapper{position:relative}product-info[data-vc-has-sticky-atc="true"] .product__media-wrapper::before{content:'';position:absolute;inset:1.2rem 1.8rem auto auto;width:8rem;height:8rem;border-radius:999px;background:rgba(225,117,61,.12);filter:blur(1.8rem);pointer-events:none;z-index:0}product-info[data-vc-has-sticky-atc="true"] .product__media-wrapper::after{content:'';position:absolute;inset:auto auto 1.4rem 1.4rem;width:10rem;height:10rem;border-radius:999px;background:rgba(34,89,82,.09);filter:blur(2rem);pointer-events:none;z-index:0}product-info[data-vc-has-sticky-atc="true"] .product__media-list{position:relative;z-index:1}product-info[data-vc-has-sticky-atc="true"] .product__media-list .product__media-item:first-child>*{display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 38%,#fff 0%,rgba(255,249,244,.86) 46%,rgba(34,89,82,.065) 100%);border-color:rgba(34,89,82,.06);box-shadow:0 1.7rem 4.2rem rgba(21,44,41,.085)}product-info[data-vc-has-sticky-atc="true"] .product__media img{margin:auto;transition:transform .42s cubic-bezier(.22,1,.36,1),filter .42s cubic-bezier(.22,1,.36,1);filter:drop-shadow(0 1.35rem 1.8rem rgba(21,44,41,.12))}product-info[data-vc-has-sticky-atc="true"] .product__info-container{position:relative;overflow:hidden;border-color:rgba(34,89,82,.14);box-shadow:0 2rem 5.5rem rgba(21,44,41,.105)}product-info[data-vc-has-sticky-atc="true"] .product__info-container::before{content:'Resmi Vitacoral mağazası';display:inline-flex;align-items:center;width:max-content;max-width:100%;min-height:2.6rem;padding:.42rem .78rem;border-radius:999px;background:rgba(34,89,82,.08);color:#173c37;font-family:var(--vitacoral-font-ui,'Manrope',Arial,sans-serif);font-size:.98rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}product-info[data-vc-has-sticky-atc="true"] [data-vc-price-source]{padding:.75rem .95rem;border-radius:1.25rem;background:rgba(34,89,82,.065);border:.1rem solid rgba(34,89,82,.09)}product-info[data-vc-has-sticky-atc="true"] .product-form__submit{box-shadow:0 1.4rem 3rem rgba(21,44,41,.2);transition:transform .22s cubic-bezier(.22,1,.36,1),box-shadow .22s cubic-bezier(.22,1,.36,1)}product-info[data-vc-has-sticky-atc="true"] .shopify-payment-button__button{box-shadow:0 .9rem 2.2rem rgba(21,44,41,.08)}`;
  const collectionMotion = `.vc-collection .card,.vc-collection .quick-add__submit,.vc-collection .card__media .media img{transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s cubic-bezier(.22,1,.36,1),border-color .3s ease,filter .3s cubic-bezier(.22,1,.36,1)}.vc-collection .card{will-change:transform}.vc-collection .card:active{transform:scale(.992)}@media (hover:hover) and (pointer:fine){.vc-collection .card:hover{transform:translateY(-.36rem);box-shadow:0 1.8rem 4.4rem rgba(21,44,41,.105);border-color:rgba(225,117,61,.22)}.vc-collection .card:hover .card__media .media img{transform:scale(1.026);filter:drop-shadow(0 1.1rem 1.5rem rgba(21,44,41,.12))}.vc-collection .quick-add__submit:hover{transform:translateY(-2px);box-shadow:0 1rem 2.3rem rgba(21,44,41,.16)}}`;
  const hoverMotion = `@media (hover:hover) and (pointer:fine){.vitacoral-featured-products__card:hover,.vitacoral-product-family__card:hover{transform:translateY(-6px)}.vc-campaign-surface__trigger:hover{transform:translateY(-2px)}product-info[data-vc-has-sticky-atc="true"] .product__media-item:first-child:hover img{transform:scale(1.018)}product-info[data-vc-has-sticky-atc="true"] .product-form__submit:hover{transform:translateY(-2px);box-shadow:0 1.7rem 3.5rem rgba(21,44,41,.24)}}`;
  const mobileMotion = `@media screen and (max-width:749px){.vc-reveal,.vitacoral-reveal{transform:translate3d(0,12px,0);transition-duration:.56s}.vc-campaign-surface__trigger::after,.vc-campaign-spotlight__inner::after{display:none}product-info[data-vc-has-sticky-atc="true"]{background:radial-gradient(circle at 10% 0%,rgba(225,117,61,.13),transparent 18rem),linear-gradient(180deg,rgba(247,250,249,.98),#fff 70%)}product-info[data-vc-has-sticky-atc="true"] .page-width{padding-left:1.25rem;padding-right:1.25rem}product-info[data-vc-has-sticky-atc="true"] .product.grid{gap:.7rem}product-info[data-vc-has-sticky-atc="true"] .product__media-wrapper::before{inset:.5rem 1.2rem auto auto;width:6rem;height:6rem}product-info[data-vc-has-sticky-atc="true"] .product__media-wrapper::after{width:7rem;height:7rem}product-info[data-vc-has-sticky-atc="true"] .product__media-item>*{border-radius:1.7rem}product-info[data-vc-has-sticky-atc="true"] .product__media-list .product__media-item:first-child>*{box-shadow:0 1.1rem 2.6rem rgba(21,44,41,.085)}product-info[data-vc-has-sticky-atc="true"] .product__media img{max-height:25rem;padding:.8rem}product-info[data-vc-has-sticky-atc="true"] .product__info-container{gap:.7rem;padding:1rem 1.05rem 1.12rem;border-radius:1.85rem;box-shadow:0 1.4rem 3.4rem rgba(21,44,41,.1)}product-info[data-vc-has-sticky-atc="true"] .product__info-container::before{min-height:2.25rem;padding:.34rem .64rem;font-size:.82rem;letter-spacing:.07em}product-info[data-vc-has-sticky-atc="true"] .product__title h1{font-size:2.32rem;line-height:1.02}product-info[data-vc-has-sticky-atc="true"] [data-vc-price-source]{padding:.62rem .78rem;border-radius:1.1rem}product-info[data-vc-has-sticky-atc="true"] .price--large{font-size:1.82rem}product-info[data-vc-has-sticky-atc="true"] .product-form__submit{min-height:4.85rem}}`;
  const reducedMotion = `@media (prefers-reduced-motion:reduce){.vc-reveal,.vitacoral-reveal,.vitacoral-featured-products__card,.vitacoral-product-family__card,.vc-campaign-surface__trigger,.vc-campaign-spotlight__inner,product-info[data-vc-has-sticky-atc="true"] .product__media img,product-info[data-vc-has-sticky-atc="true"] .product-form__submit,.vc-collection .card,.vc-collection .quick-add__submit,.vc-collection .card__media .media img{opacity:1!important;transform:none!important;transition:none!important;animation:none!important}.vc-campaign-surface__trigger::after,.vc-campaign-spotlight__inner::after{display:none!important}}`;
  const css = baseMotion + pdpMotion + collectionMotion + hoverMotion + mobileMotion + reducedMotion;

  const injectStyles = () => {
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
  };

  const showElements = (elements) => elements.forEach((element) => {
    element.classList.add('is-visible');
    element.dataset.vcRevealReady = 'true';
  });

  const registerTargets = (root) => {
    revealTargets.forEach((selector) => root.querySelectorAll(selector).forEach((element) => element.classList.add('vc-reveal')));
    staggerTargets.forEach((selector) => root.querySelectorAll(selector).forEach((element) => element.classList.add('vc-reveal', 'vc-reveal--stagger')));
  };

  const assignDelays = (elements) => {
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
    groups.forEach((group) => group.forEach((element, index) => element.style.setProperty('--vc-reveal-delay', `${Math.min(index, 5) * 70}ms`)));
  };

  const ensureFooterToolsLink = (scope = document) => {
    const root = scope instanceof Element || scope instanceof Document ? scope : document;
    const footer = root.querySelector('.footer') || document.querySelector('.footer');
    if (!footer || footer.querySelector('.vc-footer-tools-link')) return;
    const target = footer.querySelector('.footer__content-bottom-wrapper:last-of-type') || footer;
    const wrapper = document.createElement('div');
    const link = document.createElement('a');
    const dot = document.createElement('span');
    const text = document.createElement('span');
    wrapper.className = 'vc-footer-tools-link';
    link.className = 'vc-footer-tools-link__anchor';
    link.href = '/pages/saglik-hesaplama-araclari';
    dot.className = 'vc-footer-tools-link__dot';
    dot.setAttribute('aria-hidden', 'true');
    text.textContent = 'Sağlık araçları ve rutin rehberi';
    link.append(dot, text);
    wrapper.appendChild(link);
    target.prepend(wrapper);
  };

  const init = (scope = document) => {
    const root = scope instanceof Element || scope instanceof Document ? scope : document;
    injectStyles();
    registerTargets(root);
    ensureFooterToolsLink(root);
    const revealElements = Array.from(root.querySelectorAll(revealSelector)).filter((element) => !element.closest('.shopify-section-header'));
    if (!revealElements.length) return;
    assignDelays(revealElements);
    if (designMode || reduced.matches || !('IntersectionObserver' in window)) {
      showElements(revealElements);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.dataset.vcRevealReady = 'true';
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.14 });
    revealElements.forEach((element) => {
      if (element.dataset.vcRevealReady === 'true') return;
      element.classList.remove('is-visible');
      observer.observe(element);
    });
  };

  const boot = () => init(document);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
  document.addEventListener('shopify:section:load', (event) => init(event.target));
  if (typeof reduced.addEventListener === 'function') reduced.addEventListener('change', () => init(document));
})();
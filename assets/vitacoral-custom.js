/* Vitacoral foundation script.
   Non-blocking theme interactions for the Dawn rebuild. */

(() => {
  const styleId = 'vc-motion-layer';
  const revealSelector = '.vitacoral-reveal, .vc-reveal';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const inDesignMode = Boolean(window.Shopify && window.Shopify.designMode);

  const revealTargets = [
    '.vitacoral-editorial-media__intro', '.vitacoral-editorial-media__visual',
    '.vitacoral-quiz__content', '.vitacoral-quiz__visual',
    '.vitacoral-hero__content', '.vitacoral-hero__media-column',
    '.vitacoral-product-family__header', '.vitacoral-product-family__footer',
    '.vitacoral-featured-products__header', '.vitacoral-featured-products__campaign', '.vitacoral-featured-products__footer',
   
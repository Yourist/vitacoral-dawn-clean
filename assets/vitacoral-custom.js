/* Vitacoral foundation script. Non-blocking theme interactions for the Dawn rebuild. */
(() => {
  const styleId = 'vc-motion-layer';
  const revealSelector = '.vitacoral-reveal, .vc-reveal';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const inDesignMode = Boolean(window.Shopify && window.Shopify.designMode);

  const reveal
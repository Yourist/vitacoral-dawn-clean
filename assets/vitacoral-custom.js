/* Vitacoral foundation script.
   Non-blocking theme interactions for the Dawn rebuild. */

(() => {
  const motionStyleId = 'vc-motion-interaction-layer';
  const revealSelector = '.vitacoral-reveal, .vc-reveal';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const inDesignMode = Boolean(window.Shopify && window.Shopify.designMode);


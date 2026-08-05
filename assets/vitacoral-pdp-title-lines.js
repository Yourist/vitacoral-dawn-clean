(() => {
  const applyTitleLines = () => {
    const productInfo = document.querySelector('product-info[data-url]');
    if (!productInfo) return;

    const url = productInfo.getAttribute('data-url') || '';
    const config = window.VC_PDP_TITLE_LINES || {};
    let line1 = typeof config.line1 === 'string' ? config.line1.trim() : '';
    let line2 = typeof config.line2 === 'string' ? config.line2.trim() : '';

    if (!line1 && !line2 && url.includes('/products/collagen-30-sase')) {
      line1 = 'Vitacoral Collagen';
      line2 = '30 Saşe';
    }

    if (!line1 || !line2) return;

    productInfo.querySelectorAll('.product__title h1, .product__title h2').forEach((heading) => {
      heading.textContent = '';

      const first = document.createElement('span');
      first.className = 'vc-pdp-title-line';
      first.textContent = line1;

      const second = document.createElement('span');
      second.className = 'vc-pdp-title-line';
      second.textContent = line2;

      heading.append(first, second);
    });
  };

  const normalizeLabel = (value) => value.replace(/\s+/g, ' ').trim().toLocaleLowerCase('tr-TR');

  const dedupeProductDetails = () => {
    document.querySelectorAll('[data-vc-product-info-container]').forEach((productInfo) => {
      const essentials = productInfo.querySelector('.vitacoral-pdp-essentials');
      const details = productInfo.querySelector('.vitacoral-pdp-details');
      if (!essentials || !details) return;

      const visibleLabels = new Set(
        Array.from(essentials.querySelectorAll('.vitacoral-pdp-essentials__label'))
          .map((label) => normalizeLabel(label.textContent || ''))
          .filter(Boolean)
      );

      details.querySelectorAll('.vitacoral-pdp-details__item').forEach((item) => {
        const summary = item.querySelector('.vitacoral-pdp-details__summary');
        const summaryLabel = normalizeLabel(summary?.textContent || '');

        if (summaryLabel && visibleLabels.has(summaryLabel)) {
          item.hidden = true;
          item.setAttribute('aria-hidden', 'true');
        }
      });

      const hasVisibleItems = Array.from(details.querySelectorAll('.vitacoral-pdp-details__item'))
        .some((item) => !item.hidden);

      if (!hasVisibleItems) {
        details.hidden = true;
        details.setAttribute('aria-hidden', 'true');
      }
    });
  };

  const init = () => {
    applyTitleLines();
    dedupeProductDetails();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

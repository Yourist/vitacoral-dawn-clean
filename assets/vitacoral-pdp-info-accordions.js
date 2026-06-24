(() => {
  const productInfo = document.querySelector('product-info[data-vc-has-sticky-atc="true"]');
  if (!productInfo || productInfo.dataset.vcInfoAccordionsReady === 'true') return;

  productInfo.dataset.vcInfoAccordionsReady = 'true';

  const makeSummary = (className, title) => {
    const summary = document.createElement('summary');
    summary.className = className;

    const label = document.createElement('span');
    label.textContent = title;
    summary.appendChild(label);

    return summary;
  };

  const wrapEssentials = () => {
    const source = productInfo.querySelector('.vitacoral-pdp-essentials:not(details)');
    if (!source || source.dataset.vcAccordionReady === 'true') return;

    const heading = source.querySelector('.vitacoral-pdp-essentials__heading');
    const title = heading ? heading.textContent.trim() : 'Ürün bilgileri';

    const details = document.createElement('details');
    details.className = `${source.className} vitacoral-pdp-essentials--accordion`;
    details.dataset.vcAccordionReady = 'true';

    details.appendChild(makeSummary('vitacoral-pdp-essentials__summary vc-pdp-info-outer-summary', title));

    Array.from(source.childNodes).forEach((node) => {
      if (node !== heading) details.appendChild(node);
    });

    source.replaceWith(details);
  };

  const wrapDetails = () => {
    const source = productInfo.querySelector('.vitacoral-pdp-details:not(details)');
    if (!source || source.dataset.vcAccordionReady === 'true') return;

    const heading = source.querySelector('.vitacoral-pdp-details__heading');
    const title = heading ? heading.textContent.trim() : 'Detaylı bilgiler';

    const details = document.createElement('details');
    details.className = `${source.className} vitacoral-pdp-details--accordion`;
    details.dataset.vcAccordionReady = 'true';

    details.appendChild(makeSummary('vitacoral-pdp-details__summary vc-pdp-info-outer-summary', title));

    Array.from(source.childNodes).forEach((node) => {
      if (node !== heading) details.appendChild(node);
    });

    source.replaceWith(details);
  };

  wrapEssentials();
  wrapDetails();
})();

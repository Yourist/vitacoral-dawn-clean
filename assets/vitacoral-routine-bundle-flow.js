(() => {
  const page = document.querySelector('[data-vc-page-handle]');
  if (!page) return;

  const handle = (page.getAttribute('data-vc-page-handle') || '').toLowerCase();
  const title = (document.querySelector('.vc-page__title')?.textContent || document.title || '').toLowerCase();
  const haystack = `${handle} ${title}`;

  const routines = [
    {
      key: 'women',
      matches: ['kadin', 'kadın'],
      title: 'Kadın Günlük Rutin Paketi',
      body: 'Multivitamin For Women ve Collagen ürünlerini birlikte almak isteyenler için hazırlanmış rutin paketidir.',
      cta: 'Kadın rutin paketini satın al'
    },
    {
      key: 'men',
      matches: ['erkek'],
      title: 'Erkek Günlük Rutin Paketi',
      body: 'Multivitamin For Men ve Collagen ürünlerini birlikte almak isteyenler için hazırlanmış rutin paketidir.',
      cta: 'Erkek rutin paketini satın al'
    },
    {
      key: 'family',
      matches: ['aile'],
      title: 'Aile Günlük Rutin Paketi',
      body: 'Kadın, erkek ve çocuk ürünlerini birlikte değerlendirmek isteyen aileler için hazırlanmış rutin paketidir.',
      cta: 'Aile rutin paketini satın al'
    }
  ];

  const routine = routines.find((item) => item.matches.some((match) => haystack.includes(match)));
  if (!routine) return;

  const content = page.querySelector('.vc-page__content');
  if (!content || content.querySelector('.vc-routine-bundle-panel')) return;

  const explicitBundleLink = content.querySelector('a[href*="/products/"][href*="rutin"], a[href*="/products/"][href*="paket"], a[href*="/products/"][href*="bundle"]');
  const bundleHref = explicitBundleLink?.getAttribute('href') || '';

  const panel = document.createElement('div');
  panel.className = 'vc-routine-bundle-panel';

  if (bundleHref) {
    panel.innerHTML = `
      <p class="vc-routine-bundle-panel__eyebrow">Rutin paketi</p>
      <h2 class="vc-routine-bundle-panel__title">${routine.title}</h2>
      <p class="vc-routine-bundle-panel__text">${routine.body} Aşağıdaki ürünler paketin içeriğini gösterir; satın alma için tek ana butonu kullanabilirsiniz.</p>
      <div class="vc-routine-bundle-panel__actions">
        <a class="button button--primary" href="${bundleHref}">${routine.cta}</a>
        <p class="vc-routine-bundle-panel__note">Paket ürünü sepetinize tek akışta ekleyebilirsiniz.</p>
      </div>
    `;
  } else {
    panel.innerHTML = `
      <p class="vc-routine-bundle-panel__eyebrow">Rutin paketi</p>
      <h2 class="vc-routine-bundle-panel__title">${routine.title}</h2>
      <p class="vc-routine-bundle-panel__text">${routine.body} Bu sayfadaki ürün kartları paketin içeriğini gösterir. Paket ürün bağlantısı eklendiğinde tek satın alma butonu otomatik olarak gösterilir.</p>
    `;
  }

  const firstMeaningful = Array.from(content.children).find((node) => {
    return node.textContent && node.textContent.trim().length > 0;
  });

  if (firstMeaningful) {
    firstMeaningful.insertAdjacentElement('afterend', panel);
  } else {
    content.prepend(panel);
  }

  const routineGrid = content.querySelector('.vc-routine-grid, .vc-document-grid, .vc-product-grid');
  if (routineGrid && !content.querySelector('.vc-routine-bundle-heading')) {
    const heading = document.createElement('div');
    heading.className = 'vc-routine-bundle-heading';
    heading.innerHTML = '<h2>Paketin içindeki ürünler</h2><p>Bu kartlar paketin içeriğini gösterir. Ürün detaylarını ayrıca inceleyebilirsiniz.</p>';
    routineGrid.insertAdjacentElement('beforebegin', heading);
  }

  content.querySelectorAll('a').forEach((link) => {
    const text = (link.textContent || '').trim().toLowerCase();
    const href = link.getAttribute('href') || '';
    const isProductLink = href.includes('/products/');
    const isBundleLink = href.includes('rutin') || href.includes('paket') || href.includes('bundle');
    const looksLikeProductCta = text === 'ürünü incele' || text === 'urunu incele' || text === 'incele' || text === 'satın al' || text === 'satin al';

    if (isProductLink && !isBundleLink && looksLikeProductCta && !link.closest('.vc-routine-bundle-panel')) {
      link.textContent = 'Ürün detayını gör';
      link.setAttribute('aria-label', 'Paket içindeki ürün detayını gör');
    }
  });
})();

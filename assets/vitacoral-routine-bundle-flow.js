(() => {
  const page = document.querySelector('[data-vc-page-handle]');
  if (!page) return;

  const handle = (page.getAttribute('data-vc-page-handle') || '').toLowerCase();
  const title = (document.querySelector('.vc-page__title')?.textContent || document.title || '').toLowerCase();
  const haystack = `${handle} ${title}`;

  const routines = [
    {
      key: 'women',
      matches: ['kadin', 'kadın', 'women'],
      title: 'Kadın Günlük Rutin Paketi',
      body: 'Women Multivitamin ve Collagen ürünlerini birlikte almak isteyenler için hazırlanmış rutin paketidir.',
      href: '/products/kadin-gunluk-rutin-paketi',
      cta: 'Kadın rutin paketini satın al'
    },
    {
      key: 'men',
      matches: ['erkek', 'men'],
      title: 'Erkek Günlük Rutin Paketi',
      body: 'Men Multivitamin ve Collagen ürünlerini birlikte almak isteyenler için hazırlanmış rutin paketidir.',
      href: '/products/erkek-gunluk-rutin-paketi',
      cta: 'Erkek rutin paketini satın al'
    },
    {
      key: 'family',
      matches: ['aile', 'family'],
      title: 'Aile Günlük Rutin Paketi',
      body: 'Women, Men ve Kids ürünlerini birlikte değerlendirmek isteyen aileler için hazırlanmış rutin paketidir.',
      href: '/products/aile-gunluk-rutin-paketi',
      cta: 'Aile rutin paketini satın al'
    }
  ];

  const routine = routines.find((item) => item.matches.some((match) => haystack.includes(match)));
  if (!routine) return;

  const content = page.querySelector('.vc-page__content');
  if (!content || content.querySelector('.vc-routine-bundle-panel')) return;

  const panel = document.createElement('div');
  panel.className = 'vc-routine-bundle-panel';
  panel.innerHTML = `
    <p class="vc-routine-bundle-panel__eyebrow">Rutin paketi</p>
    <h2 class="vc-routine-bundle-panel__title">${routine.title}</h2>
    <p class="vc-routine-bundle-panel__text">${routine.body} Aşağıdaki ürünler paketin içeriğini gösterir; satın alma için tek ana butonu kullanabilirsiniz.</p>
    <div class="vc-routine-bundle-panel__actions">
      <a class="button button--primary" href="${routine.href}">${routine.cta}</a>
      <p class="vc-routine-bundle-panel__note">Paket ürünü sepetinize tek akışta ekleyebilirsiniz.</p>
    </div>
  `;

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
    const looksLikeProductCta = text === 'ürünü incele' || text === 'urunu incele' || text === 'incele' || text === 'satın al' || text === 'satin al';

    if (isProductLink && looksLikeProductCta && !link.closest('.vc-routine-bundle-panel')) {
      link.textContent = 'Ürün detayını gör';
      link.setAttribute('aria-label', 'Paket içindeki ürün detayını gör');
    }
  });
})();

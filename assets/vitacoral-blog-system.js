(() => {
  const normalize = (value) => (value || '')
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const initSearch = (root = document) => {
    const input = root.querySelector('[data-vc-blog-search]');
    if (!input) return;
    const cards = Array.from(root.querySelectorAll('[data-vc-blog-card]'));
    const empty = root.querySelector('[data-vc-blog-empty]');
    const apply = () => {
      const query = normalize(input.value.trim());
      let visible = 0;
      cards.forEach((card) => {
        const haystack = normalize(card.dataset.searchText || card.textContent);
        const matches = !query || haystack.includes(query);
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      if (empty) empty.classList.toggle('is-visible', visible === 0);
    };
    input.addEventListener('input', apply);
    const form = input.closest('form');
    if (form) form.addEventListener('submit', (event) => { event.preventDefault(); apply(); });
  };

  const removePromotions = (root = document) => {
    const content = root.querySelector('[data-vc-article-content]');
    if (!content) return;

    const promotionTerms = [
      'indirimli', 'indirim', 'kampanya', 'promosyon', 'firsati', 'fırsatı',
      'koduyla', 'kodu ile', 'ürünü incele', 'urunu incele', 'hemen keşfet',
      'hemen kesfet', 'satın al', 'satin al', 'sepete ekle', '%15', '%10', '%20'
    ];

    const productLinkTerms = ['/products/', '/collections/', 'vitacoral.com/products'];
    const candidates = Array.from(content.querySelectorAll('div, section, aside, table, blockquote, p'));
    const removed = new Set();

    candidates.forEach((node) => {
      if (removed.has(node) || !node.isConnected) return;
      const text = normalize(node.textContent).replace(/\s+/g, ' ').trim();
      if (!text || text.length > 900) return;
      const hasPromoText = promotionTerms.some((term) => text.includes(normalize(term)));
      const links = Array.from(node.querySelectorAll('a[href]'));
      const hasProductLink = links.some((link) => productLinkTerms.some((term) => link.href.includes(term)));
      const hasButtonLike = links.some((link) => /incele|kesfet|satın|satin|sepete/i.test(link.textContent));
      const inlinePromoStyle = /background|border|padding/.test(node.getAttribute('style') || '') && links.length > 0;

      if (hasPromoText && (hasProductLink || hasButtonLike || inlinePromoStyle)) {
        const block = node.closest('div, section, aside, table, blockquote') || node;
        removed.add(block);
        block.remove();
      }
    });
  };

  const init = (root = document) => {
    initSearch(root);
    removePromotions(root);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init(document), { once: true });
  } else {
    init(document);
  }
  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();

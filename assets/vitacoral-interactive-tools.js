(() => {
  const initTools = (scope = document) => {
    const root = scope instanceof Element || scope instanceof Document ? scope : document;

    root.querySelectorAll('[data-vc-calculator]').forEach((form) => {
      if (form.dataset.vcReady === 'true') return;
      form.dataset.vcReady = 'true';

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const gender = data.get('gender');
        const age = Number(data.get('age'));
        const height = Number(data.get('height'));
        const weight = Number(data.get('weight'));
        const activity = Number(data.get('activity')) || 1.2;
        const result = form.querySelector('[data-vc-calorie-result]');
        const number = form.querySelector('[data-vc-calorie-number]');
        const text = form.querySelector('[data-vc-calorie-text]');

        if (!age || !height || !weight || !result || !number || !text) return;

        const base = gender === 'female'
          ? (10 * weight) + (6.25 * height) - (5 * age) - 161
          : (10 * weight) + (6.25 * height) - (5 * age) + 5;
        const calories = Math.max(0, Math.round(base * activity));

        number.textContent = `${calories.toLocaleString('tr-TR')} kcal`;
        text.textContent = 'Bu değer yaklaşık günlük enerji ihtiyacınızı gösterir. Kişisel durumunuza göre değişebilir.';
        result.classList.add('is-visible');
      });
    });

    root.querySelectorAll('[data-vc-routine-finder]').forEach((form) => {
      if (form.dataset.vcReady === 'true') return;
      form.dataset.vcReady = 'true';

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const profile = data.get('profile');
        const focus = data.get('focus');
        const result = form.querySelector('[data-vc-routine-result]');
        const title = form.querySelector('[data-vc-routine-title]');
        const text = form.querySelector('[data-vc-routine-text]');
        const link = form.querySelector('[data-vc-routine-link]');
        if (!result || !title || !text || !link) return;

        let recommendation = {
          title: 'Tüm ürünleri keşfedin',
          text: 'Size en yakın ürünü seçmek için Vitacoral ürün ailesini inceleyin.',
          href: '/collections/all'
        };

        if (profile === 'family') {
          recommendation = {
            title: 'Aile Günlük Rutini',
            text: 'Women, Men ve Kids ürünlerini aynı karar akışında inceleyin.',
            href: '/pages/aile-rutini'
          };
        } else if (focus === 'light' && profile === 'men') {
          recommendation = {
            title: 'Erkek Hafif Rutini',
            text: 'Glucomannan + Men Multivitamin ikilisini birlikte değerlendirin.',
            href: '/pages/erkek-hafif-rutini'
          };
        } else if (focus === 'light') {
          recommendation = {
            title: 'Kadın Hafif Rutini',
            text: 'Glucomannan + Women Multivitamin ikilisini birlikte değerlendirin.',
            href: '/pages/kadin-hafif-rutini'
          };
        } else if (profile === 'men') {
          recommendation = {
            title: 'Erkek Rutini',
            text: 'Men Multivitamin + Collagen rutinini inceleyin.',
            href: '/pages/erkek-rutini'
          };
        } else if (profile === 'women' || focus === 'collagen') {
          recommendation = {
            title: 'Kadın Rutini',
            text: 'Women Multivitamin + Collagen rutinini inceleyin.',
            href: '/pages/kadin-rutini'
          };
        }

        title.textContent = recommendation.title;
        text.textContent = recommendation.text;
        link.setAttribute('href', recommendation.href);
        result.classList.add('is-visible');
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initTools(document), { once: true });
  } else {
    initTools(document);
  }

  document.addEventListener('shopify:section:load', (event) => initTools(event.target));
})();

(() => {
  const formatNumber = (value, digits = 0) => Number(value).toLocaleString('tr-TR', { maximumFractionDigits: digits, minimumFractionDigits: digits });

  const showResult = (form, title, text, link) => {
    const result = form.querySelector('[data-vc-tool-result]');
    if (!result) return;
    result.innerHTML = `<strong>${title}</strong><p>${text}</p>${link ? `<a href="${link.href}">${link.label}</a>` : ''}`;
    result.classList.add('is-visible');
  };

  const initTools = (scope = document) => {
    const root = scope instanceof Element || scope instanceof Document ? scope : document;

    root.querySelectorAll('[data-vc-tool]').forEach((form) => {
      if (form.dataset.vcReady === 'true') return;
      form.dataset.vcReady = 'true';

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const type = form.dataset.vcTool;
        const heightCm = Number(data.get('height'));
        const heightM = heightCm / 100;
        const weight = Number(data.get('weight'));

        if (type === 'calorie') {
          const age = Number(data.get('age'));
          const activity = Number(data.get('activity')) || 1.2;
          const gender = data.get('gender');
          if (!age || !heightCm || !weight) return;
          const base = gender === 'female' ? (10 * weight) + (6.25 * heightCm) - (5 * age) - 161 : (10 * weight) + (6.25 * heightCm) - (5 * age) + 5;
          const calories = Math.max(0, Math.round(base * activity));
          showResult(form, `${formatNumber(calories)} kcal`, 'Yaklaşık günlük enerji ihtiyacınız. Günlük koşullar ve kişisel özellikler sonucu değiştirebilir.');
        }

        if (type === 'bmi') {
          if (!heightM || !weight) return;
          const bmi = weight / (heightM * heightM);
          let label = 'Genel referans aralığında';
          if (bmi < 18.5) label = 'Genel referans aralığının altında';
          if (bmi >= 25 && bmi < 30) label = 'Genel referans aralığının üzerinde';
          if (bmi >= 30) label = 'Yüksek VKİ aralığında';
          showResult(form, `VKİ: ${formatNumber(bmi, 1)}`, `${label}. Bu sonuç tek başına sağlık değerlendirmesi değildir.`);
        }

        if (type === 'weight-range') {
          if (!heightM) return;
          const min = 18.5 * heightM * heightM;
          const max = 24.9 * heightM * heightM;
          showResult(form, `${formatNumber(min, 1)}–${formatNumber(max, 1)} kg`, 'Genel VKİ 18,5–24,9 referansına göre yaklaşık aralıktır; kişisel hedef anlamına gelmez.');
        }

        if (type === 'water') {
          if (!weight) return;
          const extra = Number(data.get('activity')) || 0;
          const ml = (weight * 30) + extra;
          showResult(form, `${formatNumber(ml / 1000, 1)} litre`, 'Yaklaşık günlük su miktarıdır. Hava, sağlık durumu ve fiziksel aktivite ihtiyacı değiştirebilir.');
        }

        if (type === 'protein') {
          if (!weight) return;
          const factor = Number(data.get('factor')) || 0.8;
          const protein = weight * factor;
          showResult(form, `${formatNumber(protein)} g`, 'Seçtiğiniz aktivite düzeyine göre yaklaşık günlük protein miktarıdır.');
        }

        if (type === 'routine') {
          const profile = data.get('profile');
          const focus = data.get('focus');
          let recommendation = { title: 'Kadın Günlük Rutini', text: 'Women Multivitamin ve Collagen ürünlerini tek akışta inceleyin.', href: '/pages/kadin-gunluk-rutini' };
          if (profile === 'family') recommendation = { title: 'Aile Günlük Rutini', text: 'Women, Men ve Kids ürünlerini aynı aile rutininde birlikte görün.', href: '/pages/aile-gunluk-rutini' };
          else if (focus === 'light' && profile === 'men') recommendation = { title: 'Erkek Hafif Günlük Rutini', text: 'Glucomannan ve Men Multivitamin ürünlerinden oluşan rutini inceleyin.', href: '/pages/erkek-hafif-gunluk-rutini' };
          else if (focus === 'light') recommendation = { title: 'Kadın Hafif Günlük Rutini', text: 'Glucomannan ve Women Multivitamin ürünlerinden oluşan rutini inceleyin.', href: '/pages/kadin-hafif-gunluk-rutini' };
          else if (profile === 'men') recommendation = { title: 'Erkek Günlük Rutini', text: 'Men Multivitamin ve Collagen ürünlerini tek akışta inceleyin.', href: '/pages/erkek-gunluk-rutini' };
          showResult(form, recommendation.title, recommendation.text, { href: recommendation.href, label: 'Rutini incele' });
        }
      });
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initTools(document), { once: true });
  else initTools(document);
  document.addEventListener('shopify:section:load', (event) => initTools(event.target));
})();
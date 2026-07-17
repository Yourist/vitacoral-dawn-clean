(() => {
  if (window.__vitacoralCampaignSurfacesReady) return;
  window.__vitacoralCampaignSurfacesReady = true;

  const openModal = (modal) => {
    if (!modal) return;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('vc-campaign-modal-is-open');
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('vc-campaign-modal-is-open');
  };

  const copyText = async (text, button) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (button) {
        const original = button.textContent;
        button.textContent = 'Kopyalandı';
        button.classList.add('is-copied');
        window.setTimeout(() => {
          button.textContent = original;
          button.classList.remove('is-copied');
        }, 1800);
      }
    } catch (error) {
      const field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', 'readonly');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      document.body.removeChild(field);
      if (button) button.textContent = 'Kopyalandı';
    }
  };

  document.addEventListener('click', (event) => {
    const copyButton = event.target.closest('[data-vc-copy-code]');
    if (copyButton) {
      copyText(copyButton.getAttribute('data-vc-copy-code'), copyButton);
      return;
    }

    const opener = event.target.closest('[data-vc-campaign-open]');
    if (opener) {
      const surface = opener.closest('[data-vc-campaign-surface]');
      const modal = surface && surface.querySelector('[data-vc-campaign-modal]');
      openModal(modal);
      return;
    }

    const closer = event.target.closest('[data-vc-campaign-close]');
    if (closer) {
      closeModal(closer.closest('[data-vc-campaign-modal]'));
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('[data-vc-campaign-modal]:not([hidden])').forEach(closeModal);
  });
})();

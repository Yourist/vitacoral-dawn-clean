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

  document.addEventListener('click', (event) => {
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

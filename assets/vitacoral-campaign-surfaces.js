(() => {
  if (window.__vitacoralCampaignSurfacesReady) return;
  window.__vitacoralCampaignSurfacesReady = true;

  const openModal = (modal) => {
    if (!modal) return;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('vc-campaign-modal-is-open');
  };

  const closeModal = (modal
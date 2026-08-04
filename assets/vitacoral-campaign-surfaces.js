(() => {
  if (window.__vitacoralCampaignSurfacesReady) return;
  window.__vitacoralCampaignSurfacesReady = true;

  const openModal = (modal) => {
    if (!modal) return;

    // Product media/sticky containers may create a transformed containing block.
    // Moving the dialog to <body> keeps position: fixed relative to the viewport.
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

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

  const markCopied = (button) => {
    if (!button) return;
    const original = button.getAttribute('data-vc-copy-label') || button.textContent || 'Kopyala';
    button.setAttribute('data-vc-copy-label', original);
    button.classList.add('is-copied');
    button.setAttribute('aria-live', 'polite');
    button.textContent = '✓ Kopyalandı';

    const context = button.closest('[data-vc-campaign-modal]') || button.closest('[data-vc-campaign-surface]');
    const feedback = context && context.querySelector('[data-vc-copy-feedback]');
    if (feedback) {
      feedback.hidden = false;
      feedback.textContent = 'Kod kopyalandı. Ödeme adımında kullanabilirsiniz.';
    }

    window.clearTimeout(button.__vcCopyTimer);
    button.__vcCopyTimer = window.setTimeout(() => {
      button.classList.remove('is-copied');
      button.textContent = original;
      if (feedback) {
        feedback.hidden = true;
        feedback.textContent = '';
      }
    }, 2200);
  };

  const copyText = async (text, button) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      markCopied(button);
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
      markCopied(button);
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
      const modalId = opener.getAttribute('aria-controls');
      const modal = modalId ? document.getElementById(modalId) : null;
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

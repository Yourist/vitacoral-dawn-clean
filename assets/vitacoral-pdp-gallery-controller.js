(() => {
  const desktopQuery = window.matchMedia('(min-width: 990px)');
  const STYLE_ID = 'vc-desktop-product-gallery-styles';

  const ensureStyles = () => {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      @media screen and (min-width: 990px) {
        product-info[data-vc-has-sticky-atc="true"] media-gallery[data-vc-desktop-gallery-ready="true"] > slider-component[id^="GalleryViewer-"] {
          display: none !important;
        }

        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery {
          display: block;
          width: 100%;
          margin: 0 0 1rem;
        }

        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery__stage {
          position: relative;
          display: grid;
          place-items: center;
          width: 100%;
          height: clamp(46rem, 56vw, 59rem);
          overflow: hidden;
          border: .1rem solid rgba(34, 89, 82, .08);
          border-radius: 2rem;
          background: #f7f8f7;
        }

        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery__stage > *,
        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery__stage .product-media-container,
        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery__stage modal-opener,
        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery__stage deferred-media,
        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery__stage product-model,
        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery__stage .product__media,
        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery__stage .media {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          min-height: 0 !important;
          max-height: 100% !important;
          margin: 0 !important;
          padding-bottom: 0 !important;
          border: 0 !important;
          border-radius: 0 !important;
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
          background: transparent !important;
        }

        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery__stage img,
        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery__stage video,
        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery__stage iframe,
        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery__stage model-viewer,
        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery__stage .deferred-media__poster {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          max-height: 100% !important;
          object-fit: contain !important;
          padding: 1.2rem !important;
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
          background: #f7f8f7 !important;
        }

        product-info[data-vc-has-sticky-atc="true"] .vc-desktop-product-gallery__stage .deferred-media__poster img {
          position: static !important;
          object-fit: contain !important;
        }

        product-info[data-vc-has-sticky-atc="true"] media-gallery[data-vc-desktop-gallery-ready="true"] .thumbnail-slider {
          display: flex !important;
        }
      }

      @media screen and (max-width: 989px) {
        .vc-desktop-product-gallery {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const sanitizeClone = (node) => {
    node.classList.remove('scroll-trigger', 'animate--fade-in', 'scroll-trigger--offscreen');
    node.removeAttribute('id');
    node.removeAttribute('aria-describedby');
    node.removeAttribute('aria-controls');

    node.querySelectorAll('[id], [aria-describedby], [aria-controls]').forEach((element) => {
      element.removeAttribute('id');
      element.removeAttribute('aria-describedby');
      element.removeAttribute('aria-controls');
      element.classList.remove('scroll-trigger', 'animate--fade-in', 'scroll-trigger--offscreen');
    });

    const deferred = node.querySelector('deferred-media, product-model');
    if (deferred) {
      node.querySelector('modal-opener')?.remove();
    }

    node.querySelectorAll('img').forEach((image) => {
      image.loading = 'eager';
      image.style.opacity = '1';
      image.style.visibility = 'visible';
      image.style.transform = 'none';
    });

    return node;
  };

  const getParts = (gallery) => {
    const viewer = gallery.querySelector(':scope > slider-component[id^="GalleryViewer-"]');
    const mediaList = viewer?.querySelector('[id^="Slider-Gallery-"]');
    const items = mediaList ? Array.from(mediaList.querySelectorAll(':scope > [data-media-id]')) : [];
    const thumbnails = gallery.querySelector(':scope > slider-component[id^="GalleryThumbnails-"]');
    return { viewer, items, thumbnails };
  };

  const resolveMediaId = (gallery, items, thumbnails) => {
    const selectedThumbnail = thumbnails?.querySelector('button[aria-current="true"]')?.closest('[data-target]');
    const selectedId = selectedThumbnail?.dataset.target;
    if (selectedId && items.some((item) => item.dataset.mediaId === selectedId)) return selectedId;

    const activeItem = items.find((item) => item.classList.contains('is-active'));
    if (activeItem?.dataset.mediaId) return activeItem.dataset.mediaId;

    return items[0]?.dataset.mediaId || '';
  };

  const renderStage = (gallery, mediaId) => {
    if (!desktopQuery.matches) return;

    const { items, thumbnails } = getParts(gallery);
    if (!items.length) return;

    const resolvedId = mediaId || resolveMediaId(gallery, items, thumbnails);
    const sourceItem = items.find((item) => item.dataset.mediaId === resolvedId) || items[0];
    const sourceContent = sourceItem.firstElementChild;
    if (!sourceContent) return;

    const stage = gallery.querySelector('.vc-desktop-product-gallery__stage');
    if (!stage) return;

    const clone = sanitizeClone(sourceContent.cloneNode(true));
    stage.replaceChildren(clone);
    gallery.dataset.vcDesktopMediaId = sourceItem.dataset.mediaId;

    thumbnails?.querySelectorAll('button').forEach((button) => button.removeAttribute('aria-current'));
    const activeThumb = thumbnails?.querySelector(`[data-target="${CSS.escape(sourceItem.dataset.mediaId)}"] button`);
    activeThumb?.setAttribute('aria-current', 'true');
  };

  const syncMode = (gallery) => {
    if (desktopQuery.matches) {
      gallery.dataset.vcDesktopGalleryReady = 'true';
      renderStage(gallery, gallery.dataset.vcDesktopMediaId);
    } else {
      delete gallery.dataset.vcDesktopGalleryReady;
    }
  };

  const initGallery = (gallery) => {
    if (!gallery || gallery.dataset.vcDesktopGalleryInitialized === 'true') return;

    const { viewer, items, thumbnails } = getParts(gallery);
    if (!viewer || !items.length || !thumbnails) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'vc-desktop-product-gallery';
    wrapper.setAttribute('aria-label', 'Ürün görselleri');

    const stage = document.createElement('div');
    stage.className = 'vc-desktop-product-gallery__stage';
    wrapper.appendChild(stage);
    viewer.before(wrapper);

    gallery.addEventListener('click', (event) => {
      const thumbnail = event.target.closest('[data-target]');
      if (!thumbnail || !gallery.contains(thumbnail) || !desktopQuery.matches) return;
      renderStage(gallery, thumbnail.dataset.target);
    });

    const observer = new MutationObserver(() => {
      if (!desktopQuery.matches) return;
      const current = thumbnails.querySelector('button[aria-current="true"]')?.closest('[data-target]')?.dataset.target;
      if (current && current !== gallery.dataset.vcDesktopMediaId) renderStage(gallery, current);
    });
    observer.observe(thumbnails, { subtree: true, attributes: true, attributeFilter: ['aria-current'] });

    gallery.dataset.vcDesktopGalleryInitialized = 'true';
    syncMode(gallery);
  };

  const initAll = (scope = document) => {
    ensureStyles();
    scope.querySelectorAll('product-info[data-vc-has-sticky-atc="true"] media-gallery').forEach(initGallery);
  };

  const resyncAll = () => {
    document.querySelectorAll('product-info[data-vc-has-sticky-atc="true"] media-gallery').forEach(syncMode);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll(document), { once: true });
  } else {
    initAll(document);
  }

  window.addEventListener('load', () => initAll(document), { once: true });
  document.addEventListener('shopify:section:load', (event) => initAll(event.target));

  if (typeof desktopQuery.addEventListener === 'function') desktopQuery.addEventListener('change', resyncAll);
  else desktopQuery.addListener(resyncAll);
})();

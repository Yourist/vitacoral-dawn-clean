(() => {
  const desktopQuery = window.matchMedia('(min-width: 990px)');

  const getGalleryParts = (gallery) => {
    const viewer = gallery.querySelector('[id^="Slider-Gallery-"]');
    const items = viewer ? Array.from(viewer.querySelectorAll('[data-media-id]')) : [];
    const thumbnails = gallery.querySelector('[id^="GalleryThumbnails-"]');
    return { viewer, items, thumbnails };
  };

  const clearInlineState = (gallery) => {
    const { viewer, items, thumbnails } = getGalleryParts(gallery);

    if (viewer) {
      viewer.style.removeProperty('display');
      viewer.style.removeProperty('overflow');
      viewer.style.removeProperty('min-height');
    }

    items.forEach((item) => {
      item.style.removeProperty('display');
      item.style.removeProperty('width');
      item.style.removeProperty('max-width');
      item.style.removeProperty('visibility');
      item.style.removeProperty('opacity');
      item.style.removeProperty('transform');

      item.querySelectorAll('.product-media-container, .product__modal-opener, .product__media, img').forEach((element) => {
        element.style.removeProperty('visibility');
        element.style.removeProperty('opacity');
        element.style.removeProperty('transform');
      });
    });

    if (thumbnails) thumbnails.style.removeProperty('display');
  };

  const resolveInitialMediaId = (gallery, items, thumbnails) => {
    const currentButton = thumbnails?.querySelector('button[aria-current="true"]');
    const currentThumbnail = currentButton?.closest('[data-target]');
    const targetId = currentThumbnail?.dataset.target;

    if (targetId && items.some((item) => item.dataset.mediaId === targetId)) return targetId;
    return items[0]?.dataset.mediaId || '';
  };

  const revealActiveMedia = (item) => {
    item.classList.remove('scroll-trigger--offscreen');
    item.style.setProperty('display', 'block', 'important');
    item.style.setProperty('width', '100%', 'important');
    item.style.setProperty('max-width', '100%', 'important');
    item.style.setProperty('visibility', 'visible', 'important');
    item.style.setProperty('opacity', '1', 'important');
    item.style.setProperty('transform', 'none', 'important');

    item.querySelectorAll('.product-media-container, .product__modal-opener, .product__media, img').forEach((element) => {
      element.style.setProperty('visibility', 'visible', 'important');
      element.style.setProperty('opacity', '1', 'important');
      element.style.setProperty('transform', 'none', 'important');
    });
  };

  const hideInactiveMedia = (item) => {
    item.style.setProperty('display', 'none', 'important');
    item.style.setProperty('width', '100%', 'important');
    item.style.setProperty('max-width', '100%', 'important');
    item.style.setProperty('visibility', 'hidden', 'important');
    item.style.setProperty('opacity', '0', 'important');
  };

  const applyGalleryState = (gallery) => {
    if (!gallery) return;

    if (!desktopQuery.matches) {
      clearInlineState(gallery);
      return;
    }

    const { viewer, items, thumbnails } = getGalleryParts(gallery);
    if (!viewer || !items.length) return;

    if (!gallery.dataset.vcActiveMediaId) {
      gallery.dataset.vcActiveMediaId = resolveInitialMediaId(gallery, items, thumbnails);
    }

    let activeItem = items.find((item) => item.dataset.mediaId === gallery.dataset.vcActiveMediaId);
    if (!activeItem) {
      activeItem = items[0];
      gallery.dataset.vcActiveMediaId = activeItem.dataset.mediaId;
    }

    viewer.style.setProperty('display', 'block', 'important');
    viewer.style.setProperty('overflow', 'hidden', 'important');
    viewer.style.setProperty('min-height', '42rem', 'important');

    items.forEach((item) => {
      if (item === activeItem) revealActiveMedia(item);
      else hideInactiveMedia(item);
    });

    activeItem.classList.add('is-active');

    if (thumbnails) {
      thumbnails.style.setProperty('display', 'flex', 'important');
      thumbnails.querySelectorAll('button').forEach((button) => button.removeAttribute('aria-current'));
      const activeThumbnail = thumbnails.querySelector(`[data-target="${gallery.dataset.vcActiveMediaId}"] button`);
      if (activeThumbnail) activeThumbnail.setAttribute('aria-current', 'true');
    }
  };

  const scheduleApply = (gallery) => {
    window.requestAnimationFrame(() => applyGalleryState(gallery));
    window.setTimeout(() => applyGalleryState(gallery), 100);
    window.setTimeout(() => applyGalleryState(gallery), 350);
    window.setTimeout(() => applyGalleryState(gallery), 900);
  };

  const initGallery = (gallery) => {
    if (!gallery || gallery.dataset.vcGalleryControllerReady === 'true') return;

    const { viewer, items, thumbnails } = getGalleryParts(gallery);
    if (!viewer || !items.length) return;

    gallery.dataset.vcActiveMediaId = resolveInitialMediaId(gallery, items, thumbnails);

    gallery.addEventListener('click', (event) => {
      const thumbnail = event.target.closest('[data-target]');
      if (!thumbnail) return;
      gallery.dataset.vcActiveMediaId = thumbnail.dataset.target;
      scheduleApply(gallery);
    });

    gallery.dataset.vcGalleryControllerReady = 'true';
    scheduleApply(gallery);
  };

  const initAll = (scope = document) => {
    scope.querySelectorAll('product-info[data-vc-has-sticky-atc="true"] media-gallery').forEach(initGallery);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll(document), { once: true });
  } else {
    initAll(document);
  }

  window.addEventListener('load', () => initAll(document), { once: true });
  document.addEventListener('shopify:section:load', (event) => initAll(event.target));

  const handleViewportChange = () => {
    document.querySelectorAll('product-info[data-vc-has-sticky-atc="true"] media-gallery').forEach((gallery) => {
      if (desktopQuery.matches) scheduleApply(gallery);
      else clearInlineState(gallery);
    });
  };

  if (typeof desktopQuery.addEventListener === 'function') desktopQuery.addEventListener('change', handleViewportChange);
  else desktopQuery.addListener(handleViewportChange);
})();

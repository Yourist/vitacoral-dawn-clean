(() => {
  const desktopQuery = window.matchMedia('(min-width: 990px)');

  const clearInlineState = (gallery) => {
    const viewer = gallery.querySelector('[id^="Slider-Gallery-"]');
    const items = viewer ? Array.from(viewer.querySelectorAll('[data-media-id]')) : [];
    const thumbnails = gallery.querySelector('[id^="GalleryThumbnails-"]');

    if (viewer) {
      viewer.style.removeProperty('display');
      viewer.style.removeProperty('overflow');
    }

    items.forEach((item) => {
      item.style.removeProperty('display');
      item.style.removeProperty('width');
      item.style.removeProperty('max-width');
    });

    if (thumbnails) thumbnails.style.removeProperty('display');
  };

  const applyGalleryState = (gallery) => {
    if (!gallery) return;

    if (!desktopQuery.matches) {
      clearInlineState(gallery);
      return;
    }

    const viewer = gallery.querySelector('[id^="Slider-Gallery-"]');
    const items = viewer ? Array.from(viewer.querySelectorAll('[data-media-id]')) : [];
    const thumbnails = gallery.querySelector('[id^="GalleryThumbnails-"]');
    if (!viewer || !items.length) return;

    const classActive = items.find((item) => item.classList.contains('is-active'));
    if (classActive) gallery.dataset.vcActiveMediaId = classActive.dataset.mediaId;

    let activeItem = items.find((item) => item.dataset.mediaId === gallery.dataset.vcActiveMediaId);
    if (!activeItem) {
      activeItem = items[0];
      gallery.dataset.vcActiveMediaId = activeItem.dataset.mediaId;
    }

    viewer.style.setProperty('display', 'block', 'important');
    viewer.style.setProperty('overflow', 'hidden', 'important');

    items.forEach((item) => {
      const isActive = item === activeItem;
      item.style.setProperty('display', isActive ? 'block' : 'none', 'important');
      item.style.setProperty('width', '100%', 'important');
      item.style.setProperty('max-width', '100%', 'important');
    });

    if (thumbnails) thumbnails.style.setProperty('display', 'flex', 'important');
  };

  const scheduleApply = (gallery) => {
    window.requestAnimationFrame(() => applyGalleryState(gallery));
    window.setTimeout(() => applyGalleryState(gallery), 80);
    window.setTimeout(() => applyGalleryState(gallery), 240);
  };

  const initGallery = (gallery) => {
    if (!gallery || gallery.dataset.vcGalleryControllerReady === 'true') return;

    const viewer = gallery.querySelector('[id^="Slider-Gallery-"]');
    if (!viewer) return;

    const items = Array.from(viewer.querySelectorAll('[data-media-id]'));
    const initialActive = items.find((item) => item.classList.contains('is-active')) || items[0];
    if (initialActive) gallery.dataset.vcActiveMediaId = initialActive.dataset.mediaId;

    gallery.addEventListener('click', (event) => {
      const thumbnail = event.target.closest('[data-target]');
      if (!thumbnail) return;
      gallery.dataset.vcActiveMediaId = thumbnail.dataset.target;
      scheduleApply(gallery);
    });

    const observer = new MutationObserver(() => {
      const activeItem = items.find((item) => item.classList.contains('is-active'));
      if (activeItem) gallery.dataset.vcActiveMediaId = activeItem.dataset.mediaId;
      scheduleApply(gallery);
    });

    items.forEach((item) => {
      observer.observe(item, { attributes: true, attributeFilter: ['class'] });
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

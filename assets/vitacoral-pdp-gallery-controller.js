(() => {
  const desktopQuery = window.matchMedia('(min-width: 990px)');

  const syncGallery = (gallery) => {
    if (!gallery) return;

    const viewer = gallery.querySelector('[id^="Slider-Gallery-"]');
    const items = viewer ? Array.from(viewer.querySelectorAll('[data-media-id]')) : [];
    const thumbnails = gallery.querySelector('[id^="GalleryThumbnails-"]');

    if (!desktopQuery.matches) {
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
      return;
    }

    if (!items.length) return;

    let activeItem = items.find((item) => item.classList.contains('is-active'));
    if (!activeItem) {
      activeItem = items[0];
      activeItem.classList.add('is-active');
    }

    viewer.style.setProperty('display', 'block', 'important');
    viewer.style.setProperty('overflow', 'visible', 'important');

    items.forEach((item) => {
      const active = item === activeItem;
      item.style.setProperty('display', active ? 'block' : 'none', 'important');
      item.style.setProperty('width', '100%', 'important');
      item.style.setProperty('max-width', '100%', 'important');
    });

    if (thumbnails) thumbnails.style.setProperty('display', 'flex', 'important');
  };

  const initGallery = (gallery) => {
    if (!gallery || gallery.dataset.vcGalleryControllerReady === 'true') return;
    gallery.dataset.vcGalleryControllerReady = 'true';

    const viewer = gallery.querySelector('[id^="Slider-Gallery-"]');
    if (!viewer) return;

    const observer = new MutationObserver(() => syncGallery(gallery));
    viewer.querySelectorAll('[data-media-id]').forEach((item) => {
      observer.observe(item, { attributes: true, attributeFilter: ['class'] });
    });

    gallery.addEventListener('click', (event) => {
      if (!event.target.closest('[data-target]')) return;
      window.requestAnimationFrame(() => syncGallery(gallery));
      window.setTimeout(() => syncGallery(gallery), 80);
    });

    syncGallery(gallery);
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
    document.querySelectorAll('product-info[data-vc-has-sticky-atc="true"] media-gallery').forEach(syncGallery);
  };

  if (typeof desktopQuery.addEventListener === 'function') desktopQuery.addEventListener('change', handleViewportChange);
  else desktopQuery.addListener(handleViewportChange);
})();

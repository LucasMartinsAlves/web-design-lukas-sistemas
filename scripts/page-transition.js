(function () {
  const isInternalNavigation = (link) => {
    const href = link.getAttribute('href');

    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (link.target === '_blank' || link.hasAttribute('download')) return false;

    const url = new URL(href, window.location.href);
    return url.origin === window.location.origin && url.pathname !== window.location.pathname;
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href]').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (!isInternalNavigation(link)) return;

        event.preventDefault();
        document.body.classList.add('page-leaving');
        window.setTimeout(() => { window.location.href = link.href; }, 220);
      });
    });
  });
})();

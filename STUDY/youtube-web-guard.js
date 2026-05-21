/* Injected into YouTube subframes inside StudyFlow Web tab — enforces study channel whitelist on SPA navigation */
(function () {
  if (window === window.top) return;

  const POLL_MS = 350;
  let lastHref = '';
  let pending = false;

  function enforce() {
    if (pending) return;
    const href = location.href;
    if (!href || href === lastHref) return;
    lastHref = href;
    if (!/youtube\.com|youtu\.be/i.test(href)) return;

    pending = true;
    chrome.runtime.sendMessage({ type: 'CHECK_YOUTUBE_WEB_FRAME', url: href }, (res) => {
      pending = false;
      if (chrome.runtime.lastError) return;
      if (res && res.allowed === false && res.redirect) {
        try {
          location.replace(res.redirect);
        } catch (_) {
          location.href = res.redirect;
        }
      }
    });
  }

  setInterval(enforce, POLL_MS);
  window.addEventListener('popstate', enforce);
  window.addEventListener('hashchange', enforce);
  enforce();
})();

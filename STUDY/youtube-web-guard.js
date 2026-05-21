/* StudyFlow Web tab — enforce educational YouTube whitelist on SPA navigation (iframe + desktop webview) */
(function () {
  const inIframe = window !== window.top;
  const onYoutube =
    /youtube\.com|youtu\.be/i.test(location.hostname || '') ||
    /youtube\.com|youtu\.be/i.test(location.href || '');
  const useExtension =
    inIframe && typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage;
  const useParent = window === window.top && onYoutube;

  if (!useExtension && !useParent) return;

  const POLL_MS = 350;
  let lastHref = '';
  let pending = false;

  function applyBlock(res) {
    if (!res || res.allowed !== false) return;
    if (res.redirect) {
      try {
        location.replace(res.redirect);
      } catch (_) {
        location.href = res.redirect;
      }
      return;
    }
    try {
      location.replace('about:blank');
    } catch (_) {}
  }

  function requestCheck(href, done) {
    if (useExtension) {
      chrome.runtime.sendMessage({ type: 'CHECK_YOUTUBE_WEB_FRAME', url: href }, (res) => {
        if (chrome.runtime.lastError) return;
        done(res);
      });
      return;
    }
    const reqId = 'sfyt' + Date.now() + '-' + Math.random().toString(36).slice(2);
    const handler = (e) => {
      if (!e.data || e.data.type !== 'SF_YT_GUARD_RESULT' || e.data.reqId !== reqId) return;
      window.removeEventListener('message', handler);
      done(e.data.result);
    };
    window.addEventListener('message', handler);
    try {
      window.parent.postMessage({ type: 'SF_YT_GUARD_CHECK', url: href, reqId: reqId }, '*');
    } catch (_) {
      window.removeEventListener('message', handler);
    }
  }

  function enforce() {
    if (pending) return;
    const href = location.href;
    if (!href || href === lastHref) return;
    if (!/youtube\.com|youtu\.be/i.test(href)) return;
    if (/youtube-study\.html/i.test(href)) return;

    lastHref = href;
    pending = true;
    requestCheck(href, (res) => {
      pending = false;
      applyBlock(res);
    });
  }

  setInterval(enforce, POLL_MS);
  window.addEventListener('popstate', enforce);
  window.addEventListener('hashchange', enforce);
  enforce();
})();

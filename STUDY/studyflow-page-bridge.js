// Connects GitHub Pages / local website to the extension (iframe header stripping + block list)
(function () {
  function register() {
    try {
      chrome.runtime.sendMessage({ type: 'REGISTER_STUDY_TAB' }, () => void chrome.runtime.lastError);
    } catch (_) {}
  }
  function pushBlocks() {
    try {
      const raw = localStorage.getItem('sf5');
      if (!raw) return;
      const db = JSON.parse(raw);
      const domains = db.blockedSites || [];
      chrome.runtime.sendMessage({ type: 'SET_BLOCKED_DOMAINS', domains }, () => void chrome.runtime.lastError);
    } catch (_) {}
  }
  register();
  pushBlocks();
  setInterval(pushBlocks, 4000);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      register();
      pushBlocks();
    }
  });
})();


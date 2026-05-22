// Connects hosted / file studyflow.html to the extension (Web tab iframe embed + block list)
(function () {
  function register() {
    try {
      let domains = [];
      try {
        const raw = localStorage.getItem('sf5');
        if (raw) domains = JSON.parse(raw).blockedSites || [];
      } catch (_) {}
      chrome.runtime.sendMessage({ type: 'REGISTER_STUDY_TAB', domains }, () => void chrome.runtime.lastError);
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

  function notifyPage() {
    try {
      window.postMessage({ type: 'SF_EXT_BRIDGE_READY' }, '*');
    } catch (_) {}
  }

  window.addEventListener('message', (e) => {
    if (e.source !== window || !e.data || e.data.type !== 'SF_EXT_SEND') return;
    const reqId = e.data.reqId;
    const msg = e.data.msg;
    if (!reqId || !msg) return;
    try {
      chrome.runtime.sendMessage(msg, (response) => {
        window.postMessage({
          type: 'SF_EXT_REPLY',
          reqId,
          response: response == null ? null : response,
          error: chrome.runtime.lastError ? chrome.runtime.lastError.message : ''
        }, '*');
      });
    } catch (err) {
      window.postMessage({ type: 'SF_EXT_REPLY', reqId, response: null, error: String(err) }, '*');
    }
  });

  try {
    chrome.runtime.onMessage.addListener((msg) => {
      if (!msg || !msg.type) return;
      if (msg.type === 'WEB_FRAME_BLOCKED' || msg.type === 'WEB_FRAME_NAV' || msg.type === 'WEB_YOUTUBE_BLOCKED' || msg.type === 'APP_SWITCH_ATTEMPT') {
        window.postMessage({ type: 'SF_EXT_PUSH', msg }, '*');
      }
    });
  } catch (_) {}

  register();
  pushBlocks();
  notifyPage();
  setInterval(pushBlocks, 4000);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      register();
      pushBlocks();
      notifyPage();
    }
  });
})();

const params = new URLSearchParams(location.search);
const domain = params.get('domain') || 'this site';
document.getElementById('domainLabel').textContent = domain;

const crumb = { domain, ts: Date.now() };
try {
  localStorage.setItem('sf_blocked_crumb', JSON.stringify(crumb));
} catch (_) { }

if (typeof chrome !== 'undefined' && chrome.storage) {
  chrome.storage.local.set({ sf_blocked_crumb: crumb });
  chrome.runtime.sendMessage({ type: 'SITE_BLOCKED', domain }).catch(() => {});
}

document.getElementById('backBtn').addEventListener('click', () => {
  if (typeof chrome !== 'undefined' && chrome.runtime?.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    history.back();
  }
});

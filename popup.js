document.getElementById('openApp').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
  window.close();
});

document.getElementById('openBlock').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
  window.close();
});

chrome.runtime.sendMessage({ type: 'GET_STATE' }, (res) => {
  const el = document.getElementById('status');
  if (!res) {
    el.textContent = 'Extension ready. Open StudyFlow to start.';
    return;
  }
  const n = (res.blockedDomains || []).length;
  if (res.shieldActive ?? res.focusActive) {
    el.textContent = `🛡️ Shield ACTIVE — ${n} site${n !== 1 ? 's' : ''} blocked`;
    el.style.color = '#ff4757';
  } else {
    el.textContent = `Shield idle — ${n} site${n !== 1 ? 's' : ''} in blocklist. Start a session to activate.`;
    el.style.color = '#888';
  }
});

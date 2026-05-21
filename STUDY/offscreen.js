// Keeps a fast timer alive so we can pull Chrome back when user opens other software.
let tickId = null;

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'GUARD_START') {
    if (tickId) clearInterval(tickId);
    tickId = setInterval(() => {
      chrome.runtime.sendMessage({ type: 'WINDOW_GUARD_TICK' }).catch(() => {});
    }, 120);
  }
  if (msg.type === 'GUARD_STOP') {
    if (tickId) clearInterval(tickId);
    tickId = null;
  }
});

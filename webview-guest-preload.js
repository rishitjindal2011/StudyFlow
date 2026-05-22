// Runs inside <webview> guests — forwards Study YouTube hub clicks to StudyFlow
const { ipcRenderer } = require('electron');

function openInStudyFlow(url) {
  if (url) ipcRenderer.sendToHost('sf-open-youtube', url);
}

window.__studyflowOpenYoutube = openInStudyFlow;

document.addEventListener(
  'click',
  (e) => {
    const btn = e.target.closest && e.target.closest('[data-yt-url]');
    if (!btn) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    openInStudyFlow(btn.getAttribute('data-yt-url'));
  },
  true
);

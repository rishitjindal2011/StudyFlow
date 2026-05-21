/* Study YouTube hub — renders default + custom channels from storage */
(function () {
  const grid = document.getElementById('grid');
  if (!grid) return;

  function esc(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function channelUrl(c) {
    if (c.id && !c.handle) {
      return 'https://www.youtube.com/channel/' + encodeURIComponent(c.id);
    }
    const h = (c.handle || c.id || '').replace(/^@/, '');
    return 'https://www.youtube.com/@' + encodeURIComponent(h);
  }

  function renderGrid(extra) {
    if (typeof EduYoutube === 'undefined') {
      return;
    }
    const list = EduYoutube.mergeList(extra || []);
    if (!list.length) {
      grid.innerHTML = '<p class="sub" style="grid-column:1/-1">No channels loaded. Reload the extension.</p>';
      return;
    }
    grid.innerHTML = list.map((c) => {
      const isCustom = (c.tag || '') === 'Custom';
      const handle = (c.handle || c.id || '').replace(/^@/, '');
      return (
        '<button type="button" class="ch' + (isCustom ? ' ch-custom' : '') + '" data-yt-url="' + esc(channelUrl(c)) + '">' +
        '<span class="ch-name">' + esc(c.name) + '</span>' +
        '<span class="ch-tag">' + esc(c.tag || 'Study') + '</span>' +
        '<span class="ch-handle">@' + esc(handle) + '</span>' +
        '</button>'
      );
    }).join('');
  }

  async function loadExtraChannels() {
    try {
      const raw = localStorage.getItem('sf5');
      if (raw) {
        const db = JSON.parse(raw);
        if (Array.isArray(db.eduYoutubeExtra)) return db.eduYoutubeExtra;
      }
    } catch (_) { }

    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      try {
        const data = await chrome.storage.local.get(['eduYoutubeExtra']);
        return data.eduYoutubeExtra || [];
      } catch (_) { }
    }
    return [];
  }

  async function refreshGrid() {
    const extra = await loadExtraChannels();
    renderGrid(extra);
  }

  function openChannel(url) {
    if (!url) return;
    if (typeof window.__studyflowOpenYoutube === 'function') {
      window.__studyflowOpenYoutube(url);
      return;
    }
    var posted = false;
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'SF_OPEN_YOUTUBE', url: url }, '*');
        posted = true;
      }
      if (window.top && window.top !== window && window.top !== window.parent) {
        window.top.postMessage({ type: 'SF_OPEN_YOUTUBE', url: url }, '*');
        posted = true;
      }
    } catch (_) {}
    if (posted) {
      var ack = false;
      function onAck(ev) {
        if (ev.data && ev.data.type === 'SF_OPEN_YOUTUBE_ACK') ack = true;
      }
      window.addEventListener('message', onAck);
      setTimeout(function () {
        window.removeEventListener('message', onAck);
        if (!ack && /youtube-study\.html/i.test(location.href)) {
          window.location.href = url;
        }
      }, 250);
      return;
    }
    window.location.href = url;
  }

  grid.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-yt-url]');
    if (!btn) return;
    e.preventDefault();
    openChannel(btn.getAttribute('data-yt-url'));
  });

  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'SF_EDU_YT_SYNC') {
      renderGrid(Array.isArray(e.data.extra) ? e.data.extra : []);
    }
  });

  window.addEventListener('storage', (e) => {
    if (e.key === 'sf5') refreshGrid();
  });

  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes.eduYoutubeExtra) refreshGrid();
    });
  }

  refreshGrid();
})();

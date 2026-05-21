/* StudyFlow — Educational YouTube whitelist (shared by studyflow + background) */
(function (root) {
  const EDU_YOUTUBE_DEFAULT = [
    { id: 'UC4a-Gbdw7v07aclWyAb2CKg', handle: 'khanacademy', name: 'Khan Academy', tag: 'Math & Science' },
    { id: 'UCX6b17PVsYBQBgWYvWPumcQ', handle: 'crashcourse', name: 'Crash Course', tag: 'All subjects' },
    { id: 'UCYO_jab_esu0DA_NsbBpcQ', handle: '3blue1brown', name: '3Blue1Brown', tag: 'Math' },
    { id: 'UC8butISFwT-Wl7IXLUoFKNS', handle: 'freecodecamp', name: 'freeCodeCamp.org', tag: 'Programming' },
    { id: 'UCHnyfMqiLHYFnKYPZpn_8Og', handle: 'TEDEd', name: 'TED-Ed', tag: 'Explainers' },
    { id: 'UC6xjEhlWHhVNFX9-K_PxryA', handle: 'freesciencelessons', name: 'Freesciencelessons', tag: 'GCSE Science' },
    { id: 'UCVHFUqQBMHd47EoEXu6YhRQ', handle: 'mitocw', name: 'MIT OpenCourseWare', tag: 'University' },
    { id: 'UCBa659QWEz1AfNzdj7d32vA', handle: 'veritasium', name: 'Veritasium', tag: 'Science' },
    { id: 'UCsXVk37bltHxD1rDPwtNM8Q', handle: 'Kurzgesagt', name: 'Kurzgesagt', tag: 'Science' },
    { id: 'UCfe_znKL0XMqF_KKbVO3Tg', handle: 'ProfessorLeonard', name: 'Professor Leonard', tag: 'Math' },
    { id: 'UC0eR6WdFCWu-xhLiWDYwxuQ', handle: 'TheOrganicChemistryTutor', name: 'The Organic Chemistry Tutor', tag: 'STEM' },
    { id: 'UCYDPn0pr42bgXFCfKxX4SgQ', handle: 'AmoebaSisters', name: 'Amoeba Sisters', tag: 'Biology' },
    { id: 'UC7_gcs09iThXy9R9wSE0uKg', handle: 'BozemanScience', name: 'Bozeman Science', tag: 'AP Science' },
    { id: 'UCQdBLez4UdBftp7rsGhd8gA', handle: 'PhysicsWallah', name: 'Physics Wallah', tag: 'Physics' },
    { id: 'UCV6mVH40Hc9jHf1x0Qya6Bg', handle: 'Unacademy', name: 'Unacademy', tag: 'Exams' },
    { id: 'UCA6vEfKqXrHoCjinwOvG9sQ', handle: 'Numberphile', name: 'Numberphile', tag: 'Math' },
    { id: 'UCUHI67dh9jEO2rvPkr385HA', handle: 'minutephysics', name: 'MinutePhysics', tag: 'Physics' },
    { id: 'UCZYTClx2T-ZofqNpN3BC19g', handle: 'SciShow', name: 'SciShow', tag: 'Science' },
    { id: 'UCU6PxMF5dLFyftuPpM3KJxA', handle: 'PatrickJMT', name: 'PatrickJMT', tag: 'Math' },
    { id: 'UCmH5viG8cDGQWYKC3CmXZxA', handle: 'NesoAcademy', name: 'Neso Academy', tag: 'Engineering' }
  ];

  function stripHandle(s) {
    return (s || '').replace(/^@/, '').trim();
  }

  /** Lowercase for whitelist matching only — not for building @ URLs */
  function norm(s) {
    return stripHandle(s).toLowerCase();
  }

  const YT_FETCH_HEADERS = {
    'Accept-Language': 'en-US,en;q=0.9',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  };

  function mergeList(extra) {
    const out = [];
    const seen = new Set();
    [...EDU_YOUTUBE_DEFAULT, ...(extra || [])].forEach((c) => {
      const handle = c.handle || c.id || '';
      if (!handle) return;
      const key = (c.id || '') + '|' + norm(handle);
      if (seen.has(key)) return;
      seen.add(key);
      out.push({ ...c, handle });
    });
    return out;
  }

  function parseYoutube(url) {
    try {
      const u = new URL(url);
      let host = u.hostname.replace(/^www\./, '');
      if (host === 'm.youtube.com') host = 'youtube.com';
      if (host === 'youtu.be') {
        const id = u.pathname.replace(/^\//, '').split('/')[0];
        return { isYoutube: true, pathType: 'video', videoId: id, url };
      }
      if (host !== 'youtube.com') return { isYoutube: false, url };

      const path = u.pathname;
      const segs = path.split('/').filter(Boolean);
      if (path === '/' || path === '') return { isYoutube: true, pathType: 'home', url };
      if (path.startsWith('/results'))
        return { isYoutube: true, pathType: 'search', url };
      if (path.startsWith('/shorts/') && segs[1])
        return { isYoutube: true, pathType: 'video', videoId: segs[1], url };
      if (path.startsWith('/shorts') || path.startsWith('/feed') || path.startsWith('/gaming') || path.startsWith('/trending'))
        return { isYoutube: true, pathType: 'browse', url };
      if (path.startsWith('/embed/') && segs[1])
        return { isYoutube: true, pathType: 'video', videoId: segs[1], url };
      if (path.startsWith('/watch')) {
        return { isYoutube: true, pathType: 'video', videoId: u.searchParams.get('v'), url };
      }
      if (path.startsWith('/@')) {
        const handle = stripHandle(segs[0] || path.slice(2).split('/')[0]);
        if (segs[1] === 'search')
          return { isYoutube: true, pathType: 'channel_search', handle, url };
        return { isYoutube: true, pathType: 'handle', handle, url };
      }
      if (path.startsWith('/channel/')) {
        const channelId = segs[1] || path.split('/')[2];
        if (segs[2] === 'search')
          return { isYoutube: true, pathType: 'channel_search', channelId, url };
        return { isYoutube: true, pathType: 'channel', channelId, url };
      }
      if (path.startsWith('/c/')) {
        return { isYoutube: true, pathType: 'custom', custom: path.split('/')[2], url };
      }
      if (path.startsWith('/user/')) {
        return { isYoutube: true, pathType: 'user', user: path.split('/')[2], url };
      }
      if (path.startsWith('/playlist')) {
        return { isYoutube: true, pathType: 'playlist', url };
      }
      return { isYoutube: true, pathType: 'other', url };
    } catch (e) {
      return { isYoutube: false, url };
    }
  }

  function channelAllowed(channelId, handle, custom, list) {
    const h = norm(handle);
    const c = norm(custom);
    const id = channelId || '';
    return list.some((ch) => {
      if (id && ch.id && id === ch.id) return true;
      if (h && ch.handle && h === norm(ch.handle)) return true;
      if (c && ch.handle && c === norm(ch.handle)) return true;
      return false;
    });
  }

  function checkUrlSync(url, extra, hubUrl) {
    const list = mergeList(extra);
    const p = parseYoutube(url);
    if (!p.isYoutube) return { decided: true, allowed: true };
    if (p.pathType === 'home' || p.pathType === 'browse' || p.pathType === 'other') {
      return { decided: true, allowed: false, redirect: hubUrl, reason: 'Open an approved study channel from the Study YouTube hub.' };
    }
    if (p.pathType === 'search') {
      return { decided: true, allowed: true, reason: 'Search only — videos must be from study channels.' };
    }
    if (p.pathType === 'channel_search') {
      if (p.handle && channelAllowed(null, p.handle, null, list))
        return { decided: true, allowed: true, channelName: p.handle };
      if (p.channelId && channelAllowed(p.channelId, null, null, list))
        return { decided: true, allowed: true };
      return {
        decided: true,
        allowed: false,
        reason: 'You can only search inside approved study channels.'
      };
    }
    if (p.pathType === 'handle' && channelAllowed(null, p.handle, null, list)) {
      return { decided: true, allowed: true, channelName: p.handle };
    }
    if (p.pathType === 'channel' && channelAllowed(p.channelId, null, null, list)) {
      return { decided: true, allowed: true };
    }
    if (p.pathType === 'custom' || p.pathType === 'user') {
      const key = p.custom || p.user;
      if (channelAllowed(null, null, key, list)) return { decided: true, allowed: true };
      return { decided: true, allowed: false, reason: 'This YouTube channel is not on the study list.' };
    }
    if (p.pathType === 'playlist') {
      return { decided: true, allowed: false, reason: 'Playlists are blocked — pick a video from an approved study channel.' };
    }
    if (p.pathType === 'video' && p.videoId) {
      return { decided: false, videoId: p.videoId };
    }
    return { decided: true, allowed: false, reason: 'This YouTube page is not allowed during study mode.' };
  }

  function parseAuthorUrl(authorUrl) {
    try {
      const u = new URL(authorUrl);
      if (u.pathname.startsWith('/@')) return { handle: u.pathname.slice(2).split('/')[0] };
      if (u.pathname.startsWith('/channel/')) return { channelId: u.pathname.split('/')[2] };
    } catch (_) { }
    return {};
  }

  async function fetchVideoChannel(videoId) {
    if (!videoId) return null;
    const watch = 'https://www.youtube.com/watch?v=' + encodeURIComponent(videoId);
    try {
      const res = await fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent(watch));
      if (!res.ok) return null;
      const data = await res.json();
      const fromUrl = parseAuthorUrl(data.author_url || '');
      return {
        name: data.author_name || 'Unknown channel',
        handle: fromUrl.handle || '',
        channelId: fromUrl.channelId || ''
      };
    } catch (_) {
      return null;
    }
  }

  /** Parse text from the "Add channel" field: @handle, handle, or channel URL */
  function parseChannelInput(text) {
    const t = (text || '').trim();
    if (!t) return null;
    if (/^https?:\/\//i.test(t) || /^www\./i.test(t)) {
      const url = /^www\./i.test(t) ? 'https://' + t : t;
      const p = parseYoutube(url);
      if (!p.isYoutube) return null;
      if (p.pathType === 'handle' && p.handle) return { handle: stripHandle(p.handle), channelId: '', name: '' };
      if (p.pathType === 'channel' && p.channelId) return { handle: '', channelId: p.channelId, name: '' };
      if (p.pathType === 'custom' && p.custom) return { handle: stripHandle(p.custom), channelId: '', name: '' };
      if (p.pathType === 'user' && p.user) return { handle: stripHandle(p.user), channelId: '', name: '' };
      return null;
    }
    const bare = stripHandle(t);
    if (!bare) return null;
    if (/^UC[\w-]{10,}$/i.test(bare)) return { handle: '', channelId: bare, name: '' };
    return { handle: bare, channelId: '', name: bare };
  }

  function isYoutube404Page(res, html) {
    if (res && res.status === 404) return true;
    return /<title>\s*404 Not Found\s*<\/title>/i.test(html || '');
  }

  function extractChannelFromHtml(html, finalUrl) {
    let channelId = '';
    let handle = '';
    let name = '';

    const fromFinal = parseYoutube(finalUrl || '');
    if (fromFinal.pathType === 'channel' && fromFinal.channelId) channelId = fromFinal.channelId;
    if (fromFinal.pathType === 'handle' && fromFinal.handle) handle = stripHandle(fromFinal.handle);

    const idMeta = html.match(/itemprop="identifier"\s+content="(UC[^"]+)"/i);
    if (idMeta) channelId = channelId || idMeta[1];

    const chJson = html.match(/"channelId"\s*:\s*"(UC[^"]+)"/);
    if (chJson) channelId = channelId || chJson[1];

    const browse = html.match(/"browseId"\s*:\s*"(UC[^"]+)"/);
    if (browse) channelId = channelId || browse[1];

    const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
    if (ogTitle) name = ogTitle[1].replace(/\s*-\s*YouTube\s*$/i, '').trim();

    const canonical = html.match(/"canonicalBaseUrl"\s*:\s*"\/@([^"]+)"/);
    if (canonical) handle = handle || stripHandle(canonical[1]);

    const vanity = html.match(/"vanityChannelUrl"\s*:\s*"https?:\\?\/\\?\/www\.youtube\.com\\?\/@([^"\\]+)"/);
    if (vanity) handle = handle || stripHandle(vanity[1]);

    return { channelId, handle, name };
  }

  function isChannelListed(entry, extra) {
    const list = mergeList(extra);
    const h = norm(entry.handle);
    const id = (entry.id || entry.channelId || '').trim();
    return list.some((ch) => {
      if (id && ch.id && id === ch.id) return true;
      if (h && ch.handle && h === norm(ch.handle)) return true;
      return false;
    });
  }

  async function resolveChannelFromInput(text) {
    const parsed = parseChannelInput(text);
    if (!parsed) return { ok: false, error: 'Enter @handle or a youtube.com/@channel URL' };

    const fallback = {
      id: parsed.channelId || '',
      handle: parsed.handle || parsed.channelId || '',
      name: parsed.name || parsed.handle || parsed.channelId || 'Custom channel',
      tag: 'Custom'
    };
    if (!fallback.handle && !fallback.id) {
      return { ok: false, error: 'Enter @handle or a youtube.com/@channel URL' };
    }

    const url = parsed.channelId
      ? 'https://www.youtube.com/channel/' + encodeURIComponent(parsed.channelId)
      : 'https://www.youtube.com/@' + encodeURIComponent(parsed.handle);

    try {
      const res = await fetch(url, { credentials: 'omit', redirect: 'follow', headers: YT_FETCH_HEADERS });
      const html = await res.text();
      const finalUrl = res.url || url;

      if (!isYoutube404Page(res, html)) {
        const meta = extractChannelFromHtml(html, finalUrl);
        return {
          ok: true,
          channel: {
            id: meta.channelId || fallback.id,
            handle: meta.handle || fallback.handle,
            name: meta.name || fallback.name,
            tag: 'Custom'
          }
        };
      }
    } catch (_) { /* fall through — add from user input */ }

    // YouTube often blocks or 404s automated fetches; trust the handle the user entered
    return { ok: true, channel: fallback };
  }

  async function checkUrlAsync(url, extra, hubUrl) {
    const list = mergeList(extra);
    const sync = checkUrlSync(url, extra, hubUrl);
    if (sync.decided) return sync;
    const info = await fetchVideoChannel(sync.videoId);
    if (!info) {
      return { allowed: false, reason: 'Could not verify if this video is from a study channel.' };
    }
    if (channelAllowed(info.channelId, info.handle, null, list)) {
      return { allowed: true, channelName: info.name };
    }
    return {
      allowed: false,
      channelName: info.name,
      reason: '"' + info.name + '" is not an approved study channel. Only educational channels are allowed.'
    };
  }

  root.EduYoutube = {
    EDU_YOUTUBE_DEFAULT,
    norm,
    stripHandle,
    mergeList,
    parseYoutube,
    parseChannelInput,
    isChannelListed,
    resolveChannelFromInput,
    checkUrlSync,
    checkUrlAsync,
    channelAllowed,
    fetchVideoChannel
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);

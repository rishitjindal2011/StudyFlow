// ═══════════════════════════════════════════════════════
// STUDYFLOW BACKGROUND SERVICE WORKER
// Handles real tab blocking using chrome.tabs API
// ═══════════════════════════════════════════════════════

importScripts('edu-youtube.js');

let focusActive = false;
let eduYoutubeEnabled = true;
let eduYoutubeExtra = [];
const YOUTUBE_STUDY_HUB = 'youtube-study.html';
let shieldActive = false; // true when StudyFlow focus session is running (not on break)
let blockedDomains = [];
let timerState = { running: false, onBreak: false, rem: 1500, total: 1500 };
let timerInterval = null;
let sessStart = null;
let studyflowTabId = null;
let studyflowWindowId = null;
let studyflowWebTabActive = false;
let refocusTimer = null;
let lastRefocusAt = 0;
const REFOCUS_COOLDOWN_MS = 80;
const REFOCUS_BURST_MS = [0, 40, 100, 220, 450, 800, 1200];
const APP_SWITCH_NOTIFY_MS = 1400;
let lastAppSwitchNotify = 0;
let lastNativeLockRetry = 0;
const NATIVE_LOCK_RETRY_MS = 12000;
const STUDYFLOW_PAGE = 'studyflow.html';
const NATIVE_LOCK_HOST = 'com.studyflow.lock';
const BLOCKED_PAGE = 'blocked.html';
const FRAME_EMBED_RULE_ID = 50;
const WEB_BLOCK_RULE_BASE = 3000;
const WEB_BLOCK_RULE_MAX = 3999;

// ── Load state from storage on startup ──
function youtubeHubUrl() {
  return chrome.runtime.getURL(YOUTUBE_STUDY_HUB);
}

async function checkYoutubeAllowed(url) {
  if (!eduYoutubeEnabled || typeof EduYoutube === 'undefined') return { allowed: true };
  return EduYoutube.checkUrlAsync(url, eduYoutubeExtra, youtubeHubUrl());
}

async function loadState() {
  const data = await chrome.storage.local.get(['focusActive', 'shieldActive', 'blockedDomains', 'timerState', 'sessStart', 'eduYoutubeEnabled', 'eduYoutubeExtra']);
  focusActive = data.focusActive || false;
  shieldActive = data.shieldActive ?? focusActive;
  blockedDomains = data.blockedDomains || [];
  eduYoutubeEnabled = data.eduYoutubeEnabled !== false;
  eduYoutubeExtra = data.eduYoutubeExtra || [];
  timerState = data.timerState || { running: false, onBreak: false, rem: 1500, total: 1500 };
  sessStart = data.sessStart || null;
  if (timerState.running) resumeTimerFromStorage();
  updateBadge();
  const sfTab = await findStudyflowTab();
  if (shieldActive && !sfTab) {
    await forcePcUnlockAll();
  } else if (shieldActive) {
    await bindStudyflowWindow(studyflowTabId);
    await startWindowGuard();
  }
}
loadState().then(() => updateWebTabRules());

chrome.tabs.onRemoved.addListener((tabId) => {
  if (studyflowTabId != null && tabId === studyflowTabId) {
    studyflowTabId = null;
    studyflowWindowId = null;
    forcePcUnlockAll();
  }
});

chrome.runtime.onInstalled.addListener(() => updateWebTabRules());

const FRAME_HEADER_ACTION = {
  type: 'modifyHeaders',
  responseHeaders: [
    { header: 'x-frame-options', operation: 'remove' },
    { header: 'frame-options', operation: 'remove' },
    { header: 'content-security-policy', operation: 'remove' },
    { header: 'content-security-policy-report-only', operation: 'remove' },
    { header: 'cross-origin-opener-policy', operation: 'remove' },
    { header: 'cross-origin-embedder-policy', operation: 'remove' },
    { header: 'cross-origin-resource-policy', operation: 'remove' }
  ]
};

/** Unwrap google.com/url?q=… redirect links */
function resolveGoogleRedirectUrl(url) {
  if (!url) return url;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    if (host !== 'google.com' && !host.endsWith('.google.com')) return url;
    if (u.pathname === '/url' || u.pathname.startsWith('/url')) {
      const dest = u.searchParams.get('q') || u.searchParams.get('url');
      if (dest && /^https?:\/\//i.test(dest)) return dest;
    }
    if (u.pathname === '/aclk') {
      const adurl = u.searchParams.get('adurl');
      if (adurl && /^https?:\/\//i.test(adurl)) return adurl;
    }
  } catch (_) {}
  return url;
}

function isGooglePageUrl(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    if (host !== 'google.com' && !host.endsWith('.google.com')) return false;
    if (u.pathname === '/url' || u.pathname.startsWith('/url')) return false;
    if (u.pathname === '/aclk') return false;
    return true;
  } catch (_) {
    return false;
  }
}

// ── Web tab: strip frame-blocking headers + blocklist redirects (tab-scoped) ──
async function getStudyflowTabForWebRules() {
  if (studyflowTabId != null) {
    try {
      const t = await chrome.tabs.get(studyflowTabId);
      if (t?.id) return t;
    } catch (_) {
      studyflowTabId = null;
    }
  }
  return findStudyflowTab();
}

async function updateWebTabRules() {
  const removeIds = [FRAME_EMBED_RULE_ID];
  for (let i = WEB_BLOCK_RULE_BASE; i <= WEB_BLOCK_RULE_MAX; i++) removeIds.push(i);

  const tab = await getStudyflowTabForWebRules();
  const addRules = [];

  if (tab?.id) {
    addRules.push({
      id: FRAME_EMBED_RULE_ID,
      priority: 1,
      action: FRAME_HEADER_ACTION,
      condition: {
        resourceTypes: ['sub_frame'],
        tabIds: [tab.id]
      }
    });
  } else {
    addRules.push({
      id: FRAME_EMBED_RULE_ID,
      priority: 1,
      action: FRAME_HEADER_ACTION,
      condition: {
        resourceTypes: ['sub_frame'],
        initiatorDomains: [chrome.runtime.id]
      }
    });
  }

  if (tab?.id && blockedDomains.length) {
    blockedDomains.slice(0, WEB_BLOCK_RULE_MAX - WEB_BLOCK_RULE_BASE).forEach((domain, idx) => {
      const clean = (domain || '').replace(/^www\./, '').trim().toLowerCase();
      if (!clean) return;
      addRules.push({
        id: WEB_BLOCK_RULE_BASE + idx,
        priority: 10,
        action: {
          type: 'redirect',
          redirect: {
            url: chrome.runtime.getURL(BLOCKED_PAGE) + '?domain=' + encodeURIComponent(clean) + '&embed=1'
          }
        },
        condition: {
          urlFilter: '||' + clean + '^',
          requestDomains: [clean],
          resourceTypes: ['sub_frame'],
          tabIds: [tab.id]
        }
      });
    });
  }

  try {
    await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: removeIds, addRules });
  } catch (e) {
    console.warn('StudyFlow: web tab rules failed', e);
  }
}

function isDomainOnBlocklist(url) {
  if (!blockedDomains.length || !url || !url.startsWith('http')) return false;
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    return blockedDomains.some(d => {
      const b = (d || '').replace(/^www\./, '');
      return hostname === b || hostname.endsWith('.' + b);
    });
  } catch (e) {
    return false;
  }
}

function notifyWebFrameBlocked(domain) {
  const msg = { type: 'WEB_FRAME_BLOCKED', domain };
  chrome.runtime.sendMessage(msg).catch(() => {});
  if (studyflowTabId != null) {
    chrome.tabs.sendMessage(studyflowTabId, msg).catch(() => {});
  }
}

let lastWebNavUrl = '';
let lastWebNavAt = 0;
const guardedYoutubeFrames = new Set();

function guardFrameKey(tabId, frameId) {
  return tabId + ':' + frameId;
}

async function isStudyflowYoutubeSubframe(tabId, frameId) {
  if (!tabId || frameId === undefined || frameId === 0) return false;
  if (!(await isStudyflowTabId(tabId))) return false;
  try {
    const frames = await chrome.webNavigation.getAllFrames({ tabId });
    const frame = frames.find((f) => f.frameId === frameId);
    if (!frame?.url) return false;
    const host = new URL(frame.url).hostname.replace(/^www\./, '');
    if (host !== 'youtube.com' && host !== 'youtu.be' && host !== 'm.youtube.com') return false;
    const parent = frames.find((f) => f.frameId === frame.parentFrameId);
    if (!parent?.url) return false;
    return isStudyflowPageUrl(parent.url);
  } catch (_) {
    return false;
  }
}

async function redirectYoutubeSubframe(tabId, frameId, destUrl) {
  if (!tabId || frameId === undefined || !destUrl) return;
  try {
    await chrome.scripting.executeScript({
      target: { tabId, frameIds: [frameId] },
      func: (u) => { location.replace(u); },
      args: [destUrl]
    });
  } catch (_) { }
}

async function ensureYoutubeGuard(details) {
  if (!details?.tabId || details.frameId === undefined || details.frameId === 0) return;
  if (!(await isStudyflowYoutubeSubframe(details.tabId, details.frameId))) return;
  const key = guardFrameKey(details.tabId, details.frameId);
  if (guardedYoutubeFrames.has(key)) return;
  try {
    await chrome.scripting.executeScript({
      target: { tabId: details.tabId, frameIds: [details.frameId] },
      files: ['youtube-web-guard.js']
    });
    guardedYoutubeFrames.add(key);
  } catch (_) { }
}

function notifyYoutubeBlockedInWeb(yt) {
  chrome.runtime.sendMessage({
    type: 'WEB_YOUTUBE_BLOCKED',
    reason: yt.reason || 'Not a study channel',
    channelName: yt.channelName || '',
    redirect: yt.redirect || youtubeHubUrl()
  }).catch(() => {});
}

function notifyWebFrameNav(url) {
  const resolved = resolveGoogleRedirectUrl(url);
  if (!resolved || !/^https?:\/\//i.test(resolved)) return;
  const now = Date.now();
  if (resolved === lastWebNavUrl && now - lastWebNavAt < 600) return;
  lastWebNavUrl = resolved;
  lastWebNavAt = now;
  chrome.runtime.sendMessage({ type: 'WEB_FRAME_NAV', url: resolved }).catch(() => {});
}

async function handleStudyflowSubframeNav(details) {
  if (!(await isStudyflowTabId(details.tabId))) return;
  if (details.parentFrameId !== 0) return;
  let url = resolveGoogleRedirectUrl(details.url);

  if (isDomainOnBlocklist(url)) {
    try {
      const host = new URL(url).hostname.replace(/^www\./, '');
      const blockedUrl = chrome.runtime.getURL(BLOCKED_PAGE) + '?domain=' + encodeURIComponent(host) + '&embed=1';
      await redirectYoutubeSubframe(details.tabId, details.frameId, blockedUrl);
      notifyWebFrameBlocked(host);
    } catch (_) {}
    return;
  }

  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host === 'youtube.com' || host === 'youtu.be' || host === 'm.youtube.com') {
      const yt = await checkYoutubeAllowed(url);
      await ensureYoutubeGuard(details);
      if (!yt.allowed) {
        const dest = yt.redirect || youtubeHubUrl();
        notifyYoutubeBlockedInWeb(yt);
        await redirectYoutubeSubframe(details.tabId, details.frameId, dest);
        return;
      }
    }
  } catch (_) { }

  if (isGooglePageUrl(url)) return;

  notifyWebFrameNav(url);
}

async function isStudyflowTabId(tabId) {
  try {
    const tab = await chrome.tabs.get(tabId);
    return isStudyflowPageUrl(tab.url);
  } catch (_) {
    return false;
  }
}

// ── Save state ──
function saveState() {
  chrome.storage.local.set({ focusActive, shieldActive, blockedDomains, timerState, sessStart, eduYoutubeEnabled, eduYoutubeExtra });
}

// ── Badge ──
function updateBadge() {
  if (shieldActive) {
    chrome.action.setBadgeText({ text: '🛡' });
    chrome.action.setBadgeBackgroundColor({ color: '#ff4d6d' });
  } else if (focusActive && timerState.onBreak) {
    chrome.action.setBadgeText({ text: '🟢' });
    chrome.action.setBadgeBackgroundColor({ color: '#4fffb0' });
  } else {
    chrome.action.setBadgeText({ text: '' });
  }
}

// ── Check if a URL should be blocked ──
function isDomainBlocked(url) {
  if (!shieldActive || !blockedDomains.length) return false;
  if (!url || !url.startsWith('http')) return false;
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    return blockedDomains.some(d => hostname === d || hostname.endsWith('.' + d));
  } catch (e) {
    return false;
  }
}

// ── Core tab blocking — called on every navigation ──
async function checkAndBlockTab(tabId, url) {
  if (!url || !url.startsWith('http')) return;
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host === 'youtube.com' || host === 'youtu.be' || host === 'm.youtube.com') {
      const yt = await checkYoutubeAllowed(url);
      if (!yt.allowed) {
        const dest = yt.redirect || youtubeHubUrl();
        chrome.tabs.update(tabId, { url: dest });
        chrome.runtime.sendMessage({
          type: 'YOUTUBE_CHANNEL_BLOCKED',
          reason: yt.reason || 'Channel not allowed',
          channelName: yt.channelName || ''
        }).catch(() => {});
        return;
      }
    }
  } catch (_) { }

  if (!isDomainBlocked(url)) return;
  try {
    const domain = new URL(url).hostname.replace(/^www\./, '');
    const blockedUrl = chrome.runtime.getURL('blocked.html') + '?domain=' + encodeURIComponent(domain);
    chrome.tabs.update(tabId, { url: blockedUrl });
    chrome.runtime.sendMessage({ type: 'SITE_BLOCKED', domain }).catch(() => {});
  } catch (e) {}
}

// ── Listen to ALL tab navigations ──
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId === 0) {
    checkAndBlockTab(details.tabId, details.url);
    return;
  }
  await handleStudyflowSubframeNav(details);
});

chrome.webNavigation.onCommitted.addListener(async (details) => {
  if (details.frameId === 0) {
    checkAndBlockTab(details.tabId, details.url);
    return;
  }
  await handleStudyflowSubframeNav(details);
});

chrome.webNavigation.onHistoryStateUpdated.addListener(async (details) => {
  if (details.frameId === 0) return;
  await handleStudyflowSubframeNav(details);
});

chrome.webNavigation.onErrorOccurred.addListener(async (details) => {
  if (details.frameId === 0) return;
  if (!(await isStudyflowTabId(details.tabId))) return;
  const url = details.url || '';
  if (!url || !isDomainOnBlocklist(url)) return;
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    const blockedUrl = chrome.runtime.getURL(BLOCKED_PAGE) + '?domain=' + encodeURIComponent(host) + '&embed=1';
    await redirectYoutubeSubframe(details.tabId, details.frameId, blockedUrl);
    notifyWebFrameBlocked(host);
  } catch (_) {}
});

// Google result links often use target="_blank" — load in Web iframe instead
chrome.webNavigation.onCreatedNavigationTarget.addListener(async (details) => {
  if (!(await isStudyflowTabId(details.sourceTabId))) return;
  const url = resolveGoogleRedirectUrl(details.url || '');
  if (!url || !/^https?:\/\//i.test(url)) return;

  if (isDomainOnBlocklist(url)) {
    try {
      notifyWebFrameBlocked(new URL(url).hostname.replace(/^www\./, ''));
    } catch (_) {}
    if (details.tabId) chrome.tabs.remove(details.tabId).catch(() => {});
    return;
  }

  if (isGooglePageUrl(url)) return;

  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host === 'youtube.com' || host === 'youtu.be' || host === 'm.youtube.com') {
      const yt = await checkYoutubeAllowed(url);
      if (!yt.allowed) {
        chrome.runtime.sendMessage({
          type: 'WEB_YOUTUBE_BLOCKED',
          reason: yt.reason || 'Not a study channel',
          channelName: yt.channelName || '',
          redirect: yt.redirect || youtubeHubUrl()
        }).catch(() => {});
        if (details.tabId) chrome.tabs.remove(details.tabId).catch(() => {});
        return;
      }
    }
  } catch (_) { }

  notifyWebFrameNav(url);
  if (details.tabId) chrome.tabs.remove(details.tabId).catch(() => {});
});

// Also check when tabs are updated (address bar navigation)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) checkAndBlockTab(tabId, changeInfo.url);
  if (changeInfo.status === 'loading' && tab.url) checkAndBlockTab(tabId, tab.url);
});

// Check all existing tabs when focus mode starts
async function blockExistingTabs() {
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (tab.url && isDomainBlocked(tab.url)) {
      checkAndBlockTab(tab.id, tab.url);
    }
  }
}

function isExtensionUrl(url, page) {
  if (!url) return false;
  return url.startsWith(chrome.runtime.getURL(page));
}

function isStudyflowPageUrl(url) {
  if (!url) return false;
  if (isExtensionUrl(url, STUDYFLOW_PAGE)) return true;
  return /studyflow\.html/i.test(url);
}

function isAllowedTabDuringShield(url) {
  if (!url) return false;
  return isExtensionUrl(url, STUDYFLOW_PAGE) || isExtensionUrl(url, BLOCKED_PAGE);
}

async function findStudyflowTab() {
  if (studyflowTabId != null) {
    try {
      const t = await chrome.tabs.get(studyflowTabId);
      if (t?.id && isStudyflowPageUrl(t.url)) {
        if (t.windowId) studyflowWindowId = t.windowId;
        return t;
      }
    } catch (_) {
      studyflowTabId = null;
    }
  }
  const extTabs = await chrome.tabs.query({ url: chrome.runtime.getURL(STUDYFLOW_PAGE) });
  if (extTabs[0]?.id) {
    studyflowTabId = extTabs[0].id;
    if (extTabs[0].windowId) studyflowWindowId = extTabs[0].windowId;
    return extTabs[0];
  }
  const all = await chrome.tabs.query({});
  const hosted = all.find((t) => isStudyflowPageUrl(t.url));
  if (hosted?.id) {
    studyflowTabId = hosted.id;
    if (hosted.windowId) studyflowWindowId = hosted.windowId;
    return hosted;
  }
  return null;
}

async function bindStudyflowWindow(tabId) {
  try {
    const tab = tabId != null ? await chrome.tabs.get(tabId) : await findStudyflowTab();
    if (!tab?.id) return;
    studyflowTabId = tab.id;
    if (tab.windowId) studyflowWindowId = tab.windowId;
  } catch (_) {}
}

async function isStudyWindowFocused() {
  if (studyflowWindowId == null) return true;
  try {
    const win = await chrome.windows.get(studyflowWindowId);
    return win.focused === true;
  } catch (_) {
    studyflowWindowId = null;
    return false;
  }
}

async function notifyAppSwitchAttempt() {
  if (!shieldActive) return;
  const now = Date.now();
  if (now - lastAppSwitchNotify < APP_SWITCH_NOTIFY_MS) return;
  lastAppSwitchNotify = now;
  try {
    const tab = await findStudyflowTab();
    if (tab?.id) {
      chrome.tabs.sendMessage(tab.id, { type: 'APP_SWITCH_ATTEMPT' }).catch(() => {});
    }
  } catch (_) {}
}

async function refocusChromeWindow(force = false) {
  if (!shieldActive) return;
  const now = Date.now();
  if (!force && now - lastRefocusAt < REFOCUS_COOLDOWN_MS) return;
  lastRefocusAt = now;

  await bindStudyflowWindow(studyflowTabId);
  if (studyflowWindowId == null) return;

  try {
    const sf = await findStudyflowTab();
    if (sf?.id) await chrome.tabs.update(sf.id, { active: true });
    try {
      await chrome.windows.update(studyflowWindowId, {
        focused: true,
        drawAttention: true,
        state: 'fullscreen'
      });
    } catch (_) {
      const win = await chrome.windows.get(studyflowWindowId);
      let state = win.state === 'minimized' ? 'normal' : win.state;
      if (state !== 'fullscreen') state = 'maximized';
      await chrome.windows.update(studyflowWindowId, {
        focused: true,
        drawAttention: true,
        state
      });
    }
  } catch (_) {
    studyflowWindowId = null;
    await bindStudyflowWindow(null);
    if (studyflowWindowId != null) await refocusChromeWindow(true);
  }
}

async function onFocusStolen() {
  if (!shieldActive) return;
  if (!studyflowWebTabActive) notifyAppSwitchAttempt();
  burstRefocusChrome();
}

function burstRefocusChrome() {
  if (!shieldActive) return;
  REFOCUS_BURST_MS.forEach((ms) => {
    setTimeout(() => refocusChromeWindow(true), ms);
  });
}

function scheduleRefocus() {
  if (!shieldActive) return;
  burstRefocusChrome();
}

async function ensureNativeLockActive() {
  const ping = await pingNativeLock();
  if (!ping?.installed || ping?.locked) return ping;
  return setNativeLock(true);
}

async function windowGuardTick() {
  if (!shieldActive) {
    stopWindowGuard();
    return;
  }
  const now = Date.now();
  if (now - lastNativeLockRetry >= NATIVE_LOCK_RETRY_MS) {
    lastNativeLockRetry = now;
    await ensureNativeLockActive();
  }
  if (studyflowWebTabActive) return;
  const focused = await isStudyWindowFocused();
  if (!focused) await onFocusStolen();
}

async function startOffscreenGuard() {
  try {
    const existing = await chrome.runtime.getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT']
    });
    if (!existing.length) {
      await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['WORKERS'],
        justification: 'Pull Chrome to the front when the user switches to other applications during a focus session'
      });
    }
    setTimeout(() => {
      chrome.runtime.sendMessage({ type: 'GUARD_START' }).catch(() => {});
    }, 100);
  } catch (_) { /* alarm fallback only */ }
}

async function stopOffscreenGuard() {
  try {
    chrome.runtime.sendMessage({ type: 'GUARD_STOP' }).catch(() => {});
    const existing = await chrome.runtime.getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT']
    });
    if (existing.length) await chrome.offscreen.closeDocument();
  } catch (_) {}
}

function sendNativeLockCmd(cmd) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (val) => {
      if (settled) return;
      settled = true;
      resolve(val);
    };
    try {
      const port = chrome.runtime.connectNative(NATIVE_LOCK_HOST);
      const timer = setTimeout(() => {
        try { port.disconnect(); } catch (_) { }
        finish({ ok: false, error: 'timeout' });
      }, 6000);
      port.onMessage.addListener((msg) => {
        clearTimeout(timer);
        chrome.storage.local.set({ pcLockLastResult: msg }).catch(() => {});
        try { port.disconnect(); } catch (_) { }
        finish(msg);
      });
      port.onDisconnect.addListener(() => {
        clearTimeout(timer);
        if (!settled) {
          finish({
            ok: false,
            error: chrome.runtime.lastError?.message || 'native_host_disconnected'
          });
        }
      });
      port.postMessage({ cmd });
    } catch (e) {
      finish({ ok: false, error: String(e && e.message ? e.message : e) });
    }
  });
}

function setNativeLock(active) {
  return sendNativeLockCmd(active ? 'LOCK_ON' : 'LOCK_OFF').catch(() => ({ ok: false }));
}

async function forcePcUnlockAll() {
  shieldActive = false;
  focusActive = false;
  chrome.alarms.clear('windowGuard');
  clearTimeout(refocusTimer);
  await stopOffscreenGuard();
  for (let i = 0; i < 8; i++) {
    await sendNativeLockCmd('LOCK_OFF');
    const ping = await pingNativeLock();
    if (!ping?.locked) break;
    await new Promise((res) => setTimeout(res, 300));
  }
  saveState();
  updateBadge();
}

function pingNativeLock() {
  return new Promise((resolve) => {
    let settled = false;
    const done = (val) => {
      if (settled) return;
      settled = true;
      resolve(val);
    };
    try {
      const port = chrome.runtime.connectNative(NATIVE_LOCK_HOST);
      const timer = setTimeout(() => {
        try { port.disconnect(); } catch (_) { }
        done({ installed: false, error: 'timeout' });
      }, 2500);
      port.onMessage.addListener((msg) => {
        clearTimeout(timer);
        try { port.disconnect(); } catch (_) { }
        done({ installed: true, ok: !!msg?.ok, locked: !!msg?.locked, detail: msg?.detail || '' });
      });
      port.onDisconnect.addListener(() => {
        clearTimeout(timer);
        if (!settled) {
          done({
            installed: false,
            error: chrome.runtime.lastError?.message || 'native_host_disconnected'
          });
        }
      });
      port.postMessage({ cmd: 'PING' });
    } catch (e) {
      done({ installed: false, error: String(e && e.message ? e.message : e) });
    }
  });
}

async function startWindowGuard() {
  chrome.alarms.clear('windowGuard');
  chrome.alarms.create('windowGuard', { periodInMinutes: 0.5 / 60 });
  lastNativeLockRetry = Date.now();
  startOffscreenGuard();
  let lock = await setNativeLock(true);
  if (!lock?.ok) {
    await new Promise((res) => setTimeout(res, 450));
    lock = await setNativeLock(true);
  }
  chrome.storage.local.set({ pcLockLastResult: lock || { ok: false } }).catch(() => {});
  burstRefocusChrome();
  return lock;
}

function stopWindowGuard() {
  forcePcUnlockAll();
}

async function prepareFocusWindow() {
  await bindStudyflowWindow(studyflowTabId);
  if (studyflowWindowId == null) return;
  try {
    await chrome.windows.update(studyflowWindowId, { focused: true, state: 'fullscreen' });
    const sf = await findStudyflowTab();
    if (sf?.id) await chrome.tabs.update(sf.id, { active: true });
  } catch (_) {
    try {
      await chrome.windows.update(studyflowWindowId, { focused: true, state: 'maximized' });
    } catch (__) {}
  }
}

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (!shieldActive) return;
  // WINDOW_ID_NONE = desktop / another app (Alt+Tab, Win+Tab, etc.)
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    onFocusStolen();
    return;
  }
  if (studyflowWindowId != null && windowId !== studyflowWindowId) {
    onFocusStolen();
  }
});

// Keep user on StudyFlow during focus — block tab switching (not the lock overlay)
async function enforceStudyTab(activeInfo) {
  if (!shieldActive) return;
  let tab;
  try {
    tab = await chrome.tabs.get(activeInfo.tabId);
  } catch (_) {
    return;
  }
  const url = tab.url || '';
  if (isExtensionUrl(url, STUDYFLOW_PAGE)) {
    studyflowTabId = tab.id;
    return;
  }
  if (isExtensionUrl(url, BLOCKED_PAGE)) return;

  const sf = await findStudyflowTab();
  if (!sf?.id) return;
  try {
    await chrome.tabs.update(sf.id, { active: true });
    studyflowWindowId = sf.windowId;
    await chrome.windows.update(sf.windowId, { focused: true, drawAttention: true });
  } catch (_) {}
}

chrome.tabs.onActivated.addListener((info) => {
  enforceStudyTab(info);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!shieldActive || changeInfo.status !== 'complete') return;
  if (!tab.active || !tab.url) return;
  if (isAllowedTabDuringShield(tab.url)) {
    if (isExtensionUrl(tab.url, STUDYFLOW_PAGE)) studyflowTabId = tabId;
    return;
  }
  enforceStudyTab({ tabId });
});

// ── TIMER ──
function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerState.running = true;
  timerState.startAt = Date.now();
  timerState.remAtStart = timerState.rem;
  sessStart = Date.now();
  saveState();
  updateBadge();

  timerInterval = setInterval(timerTick, 1000);
  // Use alarms as backup (service workers can be killed)
  chrome.alarms.create('timerTick', { periodInMinutes: 1/60 });
}

function pauseTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
  timerState.running = false;
  timerState.startAt = null;
  saveState();
  updateBadge();
  chrome.alarms.clear('timerTick');
}

function resumeTimerFromStorage() {
  if (!timerState.running) return;
  if (timerState.startAt) {
    const elapsed = Math.floor((Date.now() - timerState.startAt) / 1000);
    timerState.rem = Math.max(0, timerState.remAtStart - elapsed);
  }
  timerInterval = setInterval(timerTick, 1000);
}

function timerTick() {
  if (!timerState.running) return;
  if (timerState.startAt) {
    const elapsed = Math.floor((Date.now() - timerState.startAt) / 1000);
    timerState.rem = Math.max(0, timerState.remAtStart - elapsed);
  } else {
    timerState.rem = Math.max(0, timerState.rem - 1);
  }

  saveState();
  // Notify popup of tick
  chrome.runtime.sendMessage({ type: 'TIMER_TICK', state: timerState }).catch(() => {});

  if (timerState.rem <= 0) {
    handlePhaseEnd();
  }
}

async function handlePhaseEnd() {
  clearInterval(timerInterval);
  timerInterval = null;

  if (!timerState.onBreak) {
    // Focus phase ended → log session, start break
    const dur = sessStart ? Math.floor((Date.now() - sessStart) / 1000) : timerState.total;
    await logSession(dur);
    sessStart = null;

    timerState.onBreak = true;
    timerState.total = timerState.breakDuration || 300;
    timerState.rem = timerState.total;
    timerState.running = true;
    timerState.startAt = Date.now();
    timerState.remAtStart = timerState.rem;

    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: 'Focus Complete! 🎉',
      message: 'Take a break. You earned it.'
    });
    updateBadge();
    saveState();
    timerInterval = setInterval(timerTick, 1000);
  } else {
    // Break ended
    timerState.onBreak = false;
    timerState.running = false;
    timerState.rem = timerState.total = timerState.studyDuration || 1500;
    sessStart = null;
    saveState();
    updateBadge();

    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: "Break's Over ⏰",
      message: 'Back to work. No excuses.'
    });
  }

  chrome.runtime.sendMessage({ type: 'PHASE_END', state: timerState }).catch(() => {});
}

// ── Session logging ──
async function logSession(dur) {
  const data = await chrome.storage.local.get('sf8');
  const db = data.sf8 ? JSON.parse(data.sf8) : {};
  if (!db.sessions) db.sessions = [];
  const now = new Date();
  db.sessions.unshift({
    id: Date.now(),
    subject: timerState.subject || 'General',
    duration: dur,
    date: now.toISOString(),
    hour: now.getHours()
  });
  if (db.sessions.length > 200) db.sessions = db.sessions.slice(0, 200);
  // Bump streak
  const t = now.toDateString();
  if (db.lastStudyDate !== t) {
    const y = new Date(now); y.setDate(y.getDate() - 1);
    db.streak = db.lastStudyDate === y.toDateString() ? (db.streak || 0) + 1 : 1;
    db.lastStudyDate = t;
    if (!db.studiedDates) db.studiedDates = [];
    if (!db.studiedDates.includes(t)) db.studiedDates.push(t);
    if (db.studiedDates.length > 90) db.studiedDates = db.studiedDates.slice(-90);
  }
  await chrome.storage.local.set({ sf8: JSON.stringify(db) });
}

// ── Alarm backup for timer (service workers get killed) ──
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'timerTick') timerTick();
  if (alarm.name === 'windowGuard') windowGuardTick();
});

// ── Message handler from popup ──
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    switch (msg.type) {

      case 'GET_STATE':
        sendResponse({ focusActive, shieldActive, timerState, blockedDomains, sessStart });
        break;

      case 'SET_BLOCKED_DOMAINS':
        blockedDomains = msg.domains || [];
        saveState();
        await updateWebTabRules();
        if (shieldActive) blockExistingTabs();
        sendResponse({ ok: true });
        break;

      case 'SYNC_EDU_YOUTUBE':
        eduYoutubeEnabled = msg.enabled !== false;
        eduYoutubeExtra = msg.extra || [];
        saveState();
        sendResponse({ ok: true });
        break;

      case 'RESOLVE_EDU_YT_CHANNEL':
        sendResponse(await EduYoutube.resolveChannelFromInput(msg.input || ''));
        break;

      case 'CHECK_YOUTUBE_URL':
        sendResponse(await checkYoutubeAllowed(msg.url || ''));
        break;

      case 'CHECK_YOUTUBE_WEB_FRAME': {
        const tabId = sender.tab?.id;
        const frameId = sender.frameId;
        if (!(await isStudyflowYoutubeSubframe(tabId, frameId))) {
          sendResponse({ allowed: true });
          break;
        }
        const yt = await checkYoutubeAllowed(msg.url || '');
        if (!yt.allowed) {
          const dest = yt.redirect || youtubeHubUrl();
          notifyYoutubeBlockedInWeb(yt);
          sendResponse({ allowed: false, redirect: dest, reason: yt.reason, channelName: yt.channelName });
        } else {
          sendResponse({ allowed: true });
        }
        break;
      }

      case 'GET_YOUTUBE_HUB_URL':
        sendResponse({ url: youtubeHubUrl() });
        break;

      case 'GET_PC_LOCK_STATUS':
        sendResponse(await pingNativeLock());
        break;

      case 'SYNC_SHIELD':
        shieldActive = !!msg.active;
        focusActive = shieldActive;
        blockedDomains = msg.domains || blockedDomains;
        timerState.onBreak = !!msg.onBreak;
        timerState.running = !!msg.running;
        saveState();
        updateBadge();
        await updateWebTabRules();
        if (shieldActive) {
          blockExistingTabs();
          await bindStudyflowWindow(studyflowTabId);
          await prepareFocusWindow();
          await startWindowGuard();
        } else {
          studyflowTabId = null;
          studyflowWindowId = null;
          await forcePcUnlockAll();
        }
        sendResponse({ ok: true });
        break;

      case 'FORCE_PC_UNLOCK':
        await forcePcUnlockAll();
        sendResponse({ ok: true });
        break;

      case 'WEB_TAB_ACTIVE':
        studyflowWebTabActive = !!msg.active;
        sendResponse({ ok: true });
        break;

      case 'REGISTER_STUDY_TAB':
        if (sender.tab?.id) {
          studyflowTabId = sender.tab.id;
          if (sender.tab.windowId) studyflowWindowId = sender.tab.windowId;
        } else {
          await findStudyflowTab();
        }
        if (Array.isArray(msg.domains)) {
          blockedDomains = msg.domains;
          saveState();
        }
        await updateWebTabRules();
        sendResponse({ ok: true });
        break;

      case 'CHROME_FOCUS_LOST':
        if (shieldActive) onFocusStolen();
        sendResponse({ ok: true });
        break;

      case 'WINDOW_GUARD_TICK':
        await windowGuardTick();
        sendResponse({ ok: true });
        break;

      case 'START_FOCUS':
        focusActive = true;
        shieldActive = true;
        timerState.running = false;
        timerState.onBreak = false;
        timerState.studyDuration = msg.studyDuration || 1500;
        timerState.breakDuration = msg.breakDuration || 300;
        timerState.total = timerState.studyDuration;
        timerState.rem = timerState.total;
        timerState.subject = msg.subject || 'General';
        startTimer();
        blockExistingTabs();
        sendResponse({ ok: true });
        break;

      case 'PAUSE_TIMER':
        pauseTimer();
        sendResponse({ ok: true });
        break;

      case 'RESUME_TIMER':
        timerState.running = true;
        timerState.startAt = Date.now();
        timerState.remAtStart = timerState.rem;
        startTimer();
        sendResponse({ ok: true });
        break;

      case 'RESET_TIMER':
        await forcePcUnlockAll();
        clearInterval(timerInterval);
        timerInterval = null;
        focusActive = false;
        shieldActive = false;
        studyflowWebTabActive = false;
        timerState = {
          running: false, onBreak: false,
          rem: msg.studyDuration || 1500,
          total: msg.studyDuration || 1500,
          studyDuration: msg.studyDuration || 1500,
          breakDuration: msg.breakDuration || 300
        };
        sessStart = null;
        studyflowTabId = null;
        studyflowWindowId = null;
        saveState();
        updateBadge();
        chrome.alarms.clear('timerTick');
        sendResponse({ ok: true });
        break;

      case 'SKIP_PHASE':
        clearInterval(timerInterval);
        if (timerState.running && sessStart && !timerState.onBreak) {
          const dur = Math.floor((Date.now() - sessStart) / 1000);
          if (dur >= 60) await logSession(dur);
          sessStart = null;
        }
        timerState.onBreak = !timerState.onBreak;
        timerState.rem = timerState.total = timerState.onBreak
          ? (timerState.breakDuration || 300)
          : (timerState.studyDuration || 1500);
        timerState.running = false;
        timerState.startAt = null;
        saveState();
        updateBadge();
        sendResponse({ ok: true });
        break;

      case 'LOG_SESSION':
        await logSession(msg.duration);
        sendResponse({ ok: true });
        break;
    }
  })();
  return true; // keep channel open for async
});

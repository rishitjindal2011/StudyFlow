// Lets the in-app Web tab load sites (strips X-Frame-Options / CSP on iframe responses)
const { session } = require('electron');

const STRIP_HEADERS = new Set([
  'x-frame-options',
  'frame-options',
  'content-security-policy',
  'content-security-policy-report-only',
  'cross-origin-opener-policy',
  'cross-origin-embedder-policy',
  'cross-origin-resource-policy',
  'permissions-policy'
]);

function stripFrameBlockingHeaders(headers) {
  const out = {};
  for (const key of Object.keys(headers || {})) {
    if (!STRIP_HEADERS.has(key.toLowerCase())) out[key] = headers[key];
  }
  return out;
}

function setupEmbedSession(sess, getBlockedDomains, opts) {
  const stripMainFrame = !!(opts && opts.stripMainFrame);
  const filter = { urls: ['http://*/*', 'https://*/*'] };

  sess.webRequest.onHeadersReceived(filter, (details, callback) => {
    const rt = details.resourceType;
    const embed = rt === 'subFrame' || (stripMainFrame && rt === 'mainFrame');
    if (!embed) {
      callback({ responseHeaders: details.responseHeaders });
      return;
    }
    callback({ responseHeaders: stripFrameBlockingHeaders(details.responseHeaders) });
  });

  sess.webRequest.onBeforeRequest(filter, (details, callback) => {
    if (details.resourceType !== 'subFrame') {
      callback({});
      return;
    }
    const blocked = getBlockedDomains();
    if (!blocked.length) {
      callback({});
      return;
    }
    try {
      const host = new URL(details.url).hostname.replace(/^www\./, '').toLowerCase();
      const hit = blocked.some((d) => {
        const b = String(d || '').toLowerCase().replace(/^www\./, '');
        if (!b) return false;
        return host === b || host.endsWith('.' + b);
      });
      if (hit) {
        callback({ cancel: true });
        return;
      }
    } catch (_) {}
    callback({});
  });
}

module.exports = { setupEmbedSession };

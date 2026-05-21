const { app, BrowserWindow, ipcMain, shell, session } = require('electron');
const path = require('path');
const fs = require('fs');
const lock = require('./lock-control');
const { createStaticServer } = require('./static-server');
const { setupEmbedSession } = require('./embed-session');

let mainWindow = null;
let appRoot = null;
let lockExe = null;
let blockedDomains = [];
let shieldActive = false;
let staticServer = null;
let appUrl = null;

function getAppRoot() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'studyflow-app');
  }
  return path.join(__dirname, '..');
}

function isAppNavigation(url) {
  try {
    const u = new URL(url);
    if (u.protocol === 'file:') return true;
    if (u.hostname === '127.0.0.1' || u.hostname === 'localhost') return true;
  } catch (_) {}
  return false;
}

function cleanHost(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

function domainBlocked(url) {
  const host = cleanHost(url);
  if (!host || !blockedDomains.length) return false;
  return blockedDomains.some((d) => {
    const dom = String(d || '').toLowerCase().replace(/^www\./, '');
    if (!dom) return false;
    return host === dom || host.endsWith('.' + dom);
  });
}

function applyWindowLock(on) {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  shieldActive = !!on;
  if (on) {
    mainWindow.setFullScreen(true);
    mainWindow.setAlwaysOnTop(true, 'screen-saver');
    mainWindow.setMenuBarVisibility(false);
    mainWindow.focus();
  } else {
    mainWindow.setAlwaysOnTop(false);
    mainWindow.setFullScreen(false);
    mainWindow.setMenuBarVisibility(true);
  }
}

async function ensureAppUrl() {
  if (appUrl) return appUrl;
  appRoot = getAppRoot();
  const result = await createStaticServer(appRoot);
  staticServer = result.server;
  appUrl = result.url;
  return appUrl;
}

function createWindow() {
  appRoot = getAppRoot();
  lockExe = lock.resolveLockExe(appRoot);
  if (!lockExe) {
    lockExe = lock.compileLockHostIfNeeded(appRoot);
  }

  setupEmbedSession(session.defaultSession, () => blockedDomains);
  setupEmbedSession(session.fromPartition('persist:studyflowweb'), () => blockedDomains, { stripMainFrame: true });

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'StudyFlow',
    backgroundColor: '#09090e',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webviewTag: true
    }
  });

  ensureAppUrl().then((url) => {
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.loadURL(url);
  }).catch((err) => {
    const html = path.join(appRoot, 'studyflow.html');
    if (fs.existsSync(html)) mainWindow.loadFile(html);
    console.error('StudyFlow static server failed:', err);
  });

  // Only block top-level navigation away from StudyFlow (not iframe loads)
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (isAppNavigation(url)) return;
    event.preventDefault();
    if (domainBlocked(url)) {
      mainWindow.webContents.executeJavaScript(
        "typeof showToast==='function'&&showToast('Blocked site — stay in StudyFlow');"
      ).catch(() => {});
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (domainBlocked(url)) return { action: 'deny' };
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('close', (e) => {
    if (shieldActive) {
      e.preventDefault();
      mainWindow.webContents.executeJavaScript(
        "typeof showToast==='function'&&showToast('Finish or stop the focus timer before closing StudyFlow.');"
      ).catch(() => {});
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    lock.stopHook();
  });
}

ipcMain.handle('sync-shield', async (_event, payload) => {
  if (payload && Array.isArray(payload.domains)) {
    blockedDomains = payload.domains;
  }
  const active = !!(payload && payload.active);
  if (active) {
    if (!lockExe) lockExe = lock.compileLockHostIfNeeded(appRoot);
    const res = lock.startHook(lockExe);
    applyWindowLock(true);
    return res;
  }
  lock.stopHook();
  applyWindowLock(false);
  return { ok: true, locked: false };
});

ipcMain.handle('force-unlock', async () => {
  lock.stopHook();
  applyWindowLock(false);
  return { ok: true, locked: false };
});

ipcMain.handle('get-pc-lock-status', async () => {
  if (!lockExe) lockExe = lock.resolveLockExe(appRoot) || lock.compileLockHostIfNeeded(appRoot);
  return lock.getStatus(lockExe);
});

ipcMain.handle('set-blocked-domains', async (_event, domains) => {
  if (Array.isArray(domains)) blockedDomains = domains;
  return { ok: true };
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  lock.stopHook();
  if (staticServer) {
    try { staticServer.close(); } catch (_) {}
    staticServer = null;
  }
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  lock.stopHook();
  if (staticServer) {
    try { staticServer.close(); } catch (_) {}
  }
});

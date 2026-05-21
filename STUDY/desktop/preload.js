const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('studyflowDesktop', {
  isDesktop: true,
  syncShield: (payload) => ipcRenderer.invoke('sync-shield', payload),
  forceUnlock: () => ipcRenderer.invoke('force-unlock'),
  getPcLockStatus: () => ipcRenderer.invoke('get-pc-lock-status'),
  setBlockedDomains: (domains) => ipcRenderer.invoke('set-blocked-domains', domains)
});

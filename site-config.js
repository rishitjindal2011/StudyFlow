/** Public site + Windows installer download (GitHub Releases) */
window.STUDYFLOW_SITE = {
  version: '1.0.0',
  productName: 'StudyFlow',
  repo: 'rishitjindal2011/StudyFlow',
  installerFile: 'StudyFlow-Setup-1.0.0.exe',
  portableFile: 'StudyFlow-App.exe',
  get installerUrlFallback() {
    return 'https://github.com/' + this.repo + '/releases/latest/download/' + this.installerFile;
  },
  get installerUrl() {
    if (this._isLocalHost()) return 'desktop/dist/' + this.installerFile;
    return this.installerUrlFallback;
  },
  /** Fetch real download URL from GitHub API (avoids 404 when release not published) */
  async resolveInstallerDownload() {
    if (this._isLocalHost()) {
      return { url: this.installerUrl, ready: true, local: true };
    }
    try {
      const r = await fetch('https://api.github.com/repos/' + this.repo + '/releases/latest');
      if (!r.ok) return { url: this.releasesPage, ready: false, reason: 'no_release' };
      const rel = await r.json();
      const asset = (rel.assets || []).find((a) => a.name === this.installerFile);
      if (asset && asset.browser_download_url) {
        return { url: asset.browser_download_url, ready: true, published: rel.published_at };
      }
      return { url: this.releasesPage, ready: false, reason: 'missing_asset' };
    } catch (e) {
      return { url: this.releasesPage, ready: false, reason: 'network' };
    }
  },
  get portableUrl() {
    if (this._isLocalHost()) return 'desktop/dist/' + this.portableFile;
    return 'https://github.com/' + this.repo + '/releases/latest/download/' + this.portableFile;
  },
  _isLocalHost: function () {
    try {
      var h = window.location.hostname;
      return h === 'localhost' || h === '127.0.0.1' || h === '';
    } catch (e) { return false; }
  },
  get releasesPage() {
    return 'https://github.com/' + this.repo + '/releases';
  }
};

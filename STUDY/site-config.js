/** Public site + Windows installer download (GitHub Releases) */
window.STUDYFLOW_SITE = {
  version: '1.0.0',
  productName: 'StudyFlow',
  repo: 'rishitjindal2011/StudyFlow',
  installerFile: 'StudyFlow-Setup-1.0.0.exe',
  portableFile: 'StudyFlow-App.exe',
  get installerUrl() {
    if (this._isLocalHost()) return 'desktop/dist/' + this.installerFile;
    return 'https://github.com/' + this.repo + '/releases/latest/download/' + this.installerFile;
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

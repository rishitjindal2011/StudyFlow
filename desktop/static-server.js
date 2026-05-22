// Serves StudyFlow over http://127.0.0.1 (iframes break when the app uses file://)
const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2'
};

function createStaticServer(rootDir) {
  const root = path.resolve(rootDir);

  const server = http.createServer((req, res) => {
    try {
      let urlPath = '/';
      try {
        urlPath = new URL(req.url || '/', 'http://localhost').pathname;
      } catch (_) {}
      if (urlPath === '/') urlPath = '/studyflow.html';
      const rel = decodeURIComponent(urlPath).replace(/^\/+/, '').split('?')[0];
      const file = path.resolve(root, rel);
      if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(file).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    } catch (_) {
      res.writeHead(500);
      res.end('Error');
    }
  });

  return new Promise((resolve, reject) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({
        server,
        port,
        url: 'http://127.0.0.1:' + port + '/studyflow.html'
      });
    });
    server.on('error', reject);
  });
}

module.exports = { createStaticServer };

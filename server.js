const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.zip': 'application/zip',
  '.txt': 'text/plain; charset=utf-8'
};

const QUOTES = [
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "In software, the most expensive blunders are the ones you build right, but for the wrong problem.", author: "Swayam Mohanty" },
  { text: "There are two ways to write error-free programs; only the third one works.", author: "Alan J. Perlis" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" }
];

const PROFILE_DATA = {
  name: "Swayam Mohanty",
  handle: "swayam404",
  title: "Forward Deployed Engineer · Full-Stack Engineer",
  location: "Amsterdam, Netherlands",
  email: "m.swayams@gmail.com",
  github: "https://github.com/swayam2k15",
  linkedin: "https://www.linkedin.com/in/swayam-mohanty-career/",
  x: "https://x.com/swayam2k15",
  website: "https://swayam.dev",
  stats: {
    experienceYears: 10,
    productionUsers: "Millions",
    projectsBuilt: 24,
    cupsOfCoffee: "∞"
  }
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Security check: prevent directory traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');

  // API Endpoints
  if (safePath === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      status: "operational",
      service: "swayam404",
      version: "1.0.0",
      timestamp: new Date().toISOString()
    }));
  }

  if (safePath === '/api/quote') {
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(randomQuote));
  }

  if (safePath === '/api/profile') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(PROFILE_DATA));
  }

  // Static file handling
  let filePath = path.join(PUBLIC_DIR, safePath === '/' ? 'index.html' : safePath);

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      const stream = fs.createReadStream(filePath);
      return stream.pipe(res);
    }

    // If client asks for HTML or route wasn't found, render index.html with 404 simulation flag
    const acceptHeader = req.headers['accept'] || '';
    if (acceptHeader.includes('text/html') || !path.extname(safePath)) {
      const indexPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(indexPath, 'utf8', (readErr, htmlContent) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Internal Server Error: Missing index.html');
        }

        const isNotFoundRoute = safePath !== '/' && !safePath.startsWith('/public');
        const statusCode = isNotFoundRoute ? 404 : 200;

        // Inject simulated route metadata into HTML if requested path was non-root
        let responseHtml = htmlContent;
        if (isNotFoundRoute) {
          responseHtml = htmlContent.replace(
            '<body',
            `<body data-initial-route="${safePath.replace(/"/g, '&quot;')}"`
          );
        }

        res.writeHead(statusCode, {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Swayam404-Status': isNotFoundRoute ? 'Lost-In-Multiverse' : 'Route-Found'
        });
        return res.end(responseHtml);
      });
      return;
    }

    // Static asset not found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404: Resource Not Found');
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`[swayam404] Server is running at http://localhost:${PORT}`);
    console.log(`[swayam404] Zero-dependency GSD stack ready anytime.`);
  });
}

module.exports = server;

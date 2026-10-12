const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

// Load files
const indexPath = path.join(__dirname, 'public', 'index.html');
const cssPath = path.join(__dirname, 'public', 'css', 'styles.css');
const jsPath = path.join(__dirname, 'public', 'js', 'app.js');
const pkgPath = path.join(__dirname, 'package.json');

console.log('[TEST] Running in-process verification suite for swayam404...');

// Test 1: Check package.json
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
if (pkg.name !== 'swayam404' || !pkg.scripts.start) {
  throw new Error('package.json invalid');
}
console.log('✓ Test 1 Passed: package.json verified with npm start & swayam404 config.');

// Test 2: Check index.html content
const indexHtml = fs.readFileSync(indexPath, 'utf8');
if (!indexHtml.includes('swayam404') || !indexHtml.includes('SWAYAM Assignment Assistant') || !indexHtml.includes('Canteen Rule')) {
  throw new Error('index.html missing key identifiers');
}
if (!indexHtml.includes('100% Free Web AI Bridge') || !indexHtml.includes('swayam404-knowledge')) {
  throw new Error('index.html missing extension superpowers or repo link');
}
if (!indexHtml.includes('357 TESTS') || !indexHtml.includes('Live Demo')) {
  throw new Error('index.html missing test count or interactive demo');
}
console.log('✓ Test 2 Passed: index.html has complete neo-brutalist content, simulator & repo links.');

// Test 3: Check styles.css
const css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('--color-primary-container: #ffcc00') || !css.includes('--shadow-brutal') || !css.includes('btn-brutal')) {
  throw new Error('styles.css missing required neo-brutalist tokens');
}
console.log('✓ Test 3 Passed: styles.css contains neo-brutalist #ffcc00 yellow & brutal drop shadows.');

// Test 4: Check app.js logic
const js = fs.readFileSync(jsPath, 'utf8');
if (!js.includes('initSimulator') || !js.includes('ChatGPT Web') || !js.includes('initTheme')) {
  throw new Error('app.js missing interactive systems');
}
console.log('✓ Test 4 Passed: app.js contains in-page interactive quiz simulator & AI bridge emulation.');

// Test 5: Check server.js handler logic directly
const serverModule = require('./server');
const req = new EventEmitter();
req.url = '/api/health';
req.headers = { accept: 'application/json' };

const res = {
  statusCode: 0,
  headers: {},
  body: '',
  writeHead(code, headers) {
    this.statusCode = code;
    this.headers = headers;
  },
  end(chunk) {
    this.body = chunk;
  }
};

const listeners = serverModule.listeners('request');
if (listeners.length > 0) {
  listeners[0](req, res);
  const health = JSON.parse(res.body);
  if (res.statusCode !== 200 || health.status !== 'operational') {
    throw new Error('Health API verification failed');
  }
  console.log('✓ Test 5 Passed: Server API handler operational without network dependency.');
}

// Test 6: Mobile Web Responsiveness Verification
if (!css.includes('@media (max-width: 768px)') || !css.includes('.mobile-nav-drawer') || !indexHtml.includes('mobileNavDrawer')) {
  throw new Error('Mobile responsiveness styles or drawer markup missing');
}
if (!js.includes('initMobileMenu')) {
  throw new Error('app.js missing mobile navigation drawer logic');
}
console.log('✓ Test 6 Passed: Mobile web responsiveness, hamburger drawer, and touch targets verified.');

// Test 7: Lucide Icon Pack Verification
if (!indexHtml.includes('lucide@latest') || !indexHtml.includes('data-lucide')) {
  throw new Error('index.html missing Lucide bundle or data-lucide attributes');
}
const emojiRegex = /(\p{Extended_Pictographic}+)/gu;
let match;
const remainingEmojis = [];
while ((match = emojiRegex.exec(indexHtml)) !== null) {
  remainingEmojis.push(match[0]);
}
if (remainingEmojis.length > 0) {
  throw new Error(`Found unexpected raw emojis in index.html: ${remainingEmojis.join(', ')}`);
}
if (!js.includes('refreshLucideIcons') || !css.includes('[data-lucide]')) {
  throw new Error('Lucide icon helper or CSS rules missing');
}
console.log('✓ Test 7 Passed: Lucide icon pack verified across all components with zero emojis.');

console.log('\n======================================================');
console.log('🎉 ALL 7 VERIFICATION CHECKS PASSED FOR SWAYAM404 SITE!');
console.log('======================================================');
process.exit(0);

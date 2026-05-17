const CACHE='mangal-haus-v1';
const URLS=['/portfoliomaket1/','/portfoliomaket1/index.html','/portfoliomaket1/css/style.css','/portfoliomaket1/js/script.js','/portfoliomaket1/manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(URLS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(i=>i!==CACHE).map(i=>caches.delete(i)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))})
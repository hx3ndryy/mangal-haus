const CACHE='mangal-haus-v1';
const URLS=['/mangal-haus/','/mangal-haus/index.html','/mangal-haus/css/style.css','/mangal-haus/js/script.js','/mangal-haus/manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(URLS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(i=>i!==CACHE).map(i=>caches.delete(i)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))})
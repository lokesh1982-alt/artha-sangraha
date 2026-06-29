const CACHE='artha-sangraha-v10';
const ASSETS=['./artha-sangraha.html','./as-manifest.json'];
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
// Always fetch fresh from network, fallback to cache
self.addEventListener('fetch',e=>{
  e.respondWith(
    fetch(e.request,{cache:'no-cache'}).catch(()=>caches.match(e.request))
  );
});

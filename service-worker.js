self.addEventListener("install", e => {
  console.log("fronty instalado");
});

self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request));
});

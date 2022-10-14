self.addEventListener("install", async (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open("pwa-cache");
      await cache.addAll(
        [
          "/",
          "/scripts/index.js",
          "/css/main.css",
          "/assets/icon/512.png",
          "/assets/icon/256.png",
          "/manifest.json",
        ],
        { cache: "reload" }
      );
    })()
  );
});

self.addEventListener("activate", (event) => {
  console.log("Activate");
  event.waitUntil(
    (async () => {
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    console.log('Navigate');
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          console.log("Fetch failed, returning offline page");

          const cache = await caches.open("pwa-cache");
          try {
            const cachedResponse = await cache.match('/');
            return cachedResponse;
          } catch (error) {
            console.error(error);
          }
        }
      })()
    );
  } else if (event.request.mode === 'no-cors') {
    event.respondWith(
      (async () => {
        const cache = await caches.open("pwa-cache");
        try {
          const cachedResponse = await cache.match(event.request.url);
          return cachedResponse;
        } catch (error) {
          console.error(error);
        }
      })()
    );
  }
});

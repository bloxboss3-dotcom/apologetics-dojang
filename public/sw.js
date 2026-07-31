/* Service worker for the installed app.
 *
 * Two caching rules, chosen for one reason each:
 *
 *  - Navigations are network-first. The HTML is the one file whose name never
 *    changes, so serving it from cache is how an installed app gets frozen on
 *    an old build forever. Falling back to cache only when offline keeps the
 *    app usable on a train without pinning it to a stale version.
 *
 *  - Everything else same-origin is cache-first. Vite content-hashes the
 *    bundle, and images and fonts never change under a fixed name, so a hit is
 *    always the right file. A new build asks for new names and misses cleanly.
 *
 * Nothing cross-origin is touched: those requests are left to the network so a
 * failure here can never take the app down.
 */
const VERSION = "dojang-v1";
const SHELL = [
  "./",
  "./manifest.webmanifest",
  "./favicon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./hero.webp",
];

self.addEventListener("install", (e) => {
  // A missing shell file must not abort the whole install, so each is added
  // individually and allowed to fail.
  e.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await Promise.all(SHELL.map((u) => cache.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(VERSION);
        cache.put("./", fresh.clone()).catch(() => {});
        return fresh;
      } catch (err) {
        return (await caches.match("./")) || (await caches.match(req)) || Response.error();
      }
    })());
    return;
  }

  e.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    try {
      const fresh = await fetch(req);
      if (fresh.ok && fresh.type === "basic") {
        const cache = await caches.open(VERSION);
        cache.put(req, fresh.clone()).catch(() => {});
      }
      return fresh;
    } catch (err) {
      return Response.error();
    }
  })());
});

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("sharelist-static").then((cache) => {
            cache.add("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap");
        })
    );
});

self.addEventListener("activate", (e) => {
    console.log("service worker activated.");
});

self.addEventListener("fetch", (e) => {
    // fetch as usual and cache the response
    fetch(e.request)
        .then((res) => res.json())
        .then((data) => {
            caches.open("shareslist-fetch")
                .then(cache => {
                    cache.put(e.request, data);
                })
        })
        .catch(() => {
            // for some reason, if fetch returns error,
            // serve from cache
            e.respondWith(
                caches.match(e.request)
            );
        });
});
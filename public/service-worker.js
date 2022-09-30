self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("static").then((cache) => {
            cache.add("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap");
        })
    );
});

self.addEventListener("activate", (e) => {
    console.log("service worker activated.");
});

self.addEventListener("fetch", (e) => {

});
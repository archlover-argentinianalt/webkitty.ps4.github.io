// Handling cache
// Caching is now handled by cache.html + iframe_cache.js for firmware based caching
// This way we dont cache just everyhting for everyone. faster caching.

window.addEventListener('load', function () {
    // check for applicationCache only on PS4
    // [fork] Redirect a cache.html DESACTIVADO: hosting 100% online (raw.githack, http puro) donde
    // AppCache no puede completarse (los binarios son 301 a raw.githubusercontent = cross-origin ->
    // 'AppCache error event fired. status was: uncached') y el redirect automático generaba un loop
    // index -> cache.html -> index -> ... El flujo es online: payloads y exploit se sirven por red y
    // el loader va directo al PayLoader local (127.0.0.1:9090). Para re-habilitar en un hosting con
    // AppCache de mismo origen: cambiar coverAppCacheRedirect a true.
    var coverAppCacheRedirect = false; // [fork]
    if (coverAppCacheRedirect && isPS4 && (!window.applicationCache || window.applicationCache.status === window.applicationCache.UNCACHED) && !devMode) {
        // Not cached! Redirecting...
        window.location.href = './cache.html';
    }
})

// Still not used anywhere because I'm not sure how useful this can be.
function terminateCache() {
    if (window.applicationCache) {
        // Status 3 is 'downloading', Status 1 is 'checking'
        if (window.applicationCache.status === 3 || window.applicationCache.status === 1) {
            console.log("Terminating cache process to save memory...");
            window.applicationCache.abort();
            document.title = projectName;
            window.applicationCache.removeEventListener("progress", null);
            window.applicationCache.oncached = null;
            window.applicationCache.onupdateready = null;
        }
    }
}
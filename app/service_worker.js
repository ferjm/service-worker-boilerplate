'use strict';

importScripts('/service-worker-boilerplate/app/js/service/utils.js');
importScripts('/service-worker-boilerplate/app/js/service/worker_api.js');

debug("service_worker");
var worker = new ServiceWorker();

// lifecycle events
worker.oninstall = function(e) {
  debug('oninstall');
  importScripts('/service-worker-boilerplate/app/service_worker_files.js');

  e.waitUntil(
    caches.open('service-worker-boilerplate-cloud-cache-v0').then(function(cache) {
      return cache.addAll(kCacheFiles);
    })
  );
};


// network events
worker.onfetch = function(e) {
  debug(e.type + ': ' + e.request.url);

  e.respondWith(
    caches.match(e.request.url).then(function(response) {
      if (!response) {
        debug('going do to a fetch for for ' + e.request.url + ', might go bad\n');
      }
      return response || fetch(e.request);
    })
  )
};

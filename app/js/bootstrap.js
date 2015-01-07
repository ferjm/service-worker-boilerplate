'use strict';

addEventListener('load', function onLoad(e) {
  window.serviceAPI = new ServiceAPI(function() {
    // When index.html is loaded direclty, make sure it is controlled.
    // so updates applies smoothly.
    if (!navigator.serviceWorker.controller) {
      debug("need soft reload");
      doSoftReload();
    }
  });
});

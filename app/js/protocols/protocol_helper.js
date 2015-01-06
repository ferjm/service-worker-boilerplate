'use strict';

// IPDLProtocol is designed to create a point-to-point communication
// mechanism.
// This communication can happens between 2 windows, 2 workers, or a
// window and worker.
//
// An simple example to use it would be:
//
//  ****************
//  * PUpdate.ipdl *
//  ****************
//  protocol PUpdate
//  {
//    worker:
//      CheckForUpdate();
//      ApplyUpdate(updateUrl);
//
//    window:
//  };
//
//  *************
//  * window.js *
//  *************
//  var worker = new Worker('worker.js');
//  var protocol = new IPDLProtocol('update', worker);
//
//  protocol.sendCheckForUpdate().then(
//    function success(rv) {
//      // do something with the result.
//    ),
//
//    function error(rv) {
//      // do something with the result.
//    }
//  );
//
//  protocol.sendApplyUpdate(updateUrl).then(
//    function success(rv) {
//      // do something with the result.
//    },
//
//    function error(rv) {
//      // do something with the result.
//    }
//  );
//
//  *************
//  * worker.js *
//  *************
//  var protocol = new IPDLProtocol('update');
//
//  protocol.recvCheckForUpdate = function(resolve, reject, args) {
//    var xhr = new XMLHttpRequest();
//    xhr.open('GET', kServerUrl, true);
//    xhr.send();
//    xhr.onload = function() {
//      resolve(this.responseText);
//    };
//    
//    xhr.onerror = function() {
//      reject(this.status);
//    };
//  };
//
//  protocol.recvApplyUpdate = function(resolve, reject, args) {
//    applyUpdate(args.updateUrl).then(
//      function success(rv) {
//        resolve(rv);
//      },
//
//      function error(rv) {
//        reject(rv);
//      }
//    );
//  };
//  

importScripts('/service_worker_boilerplate/app/js/protocols/ipdl.js');
importScripts('/service_worker_boilerplate/app/js/protocols/bridge.js');
importScripts('/service_worker_boilerplate/app/js/protocols/protocol.js');

var IPDLProtocol = function(name, target) {
  var ipdl = new IPDL(name);
  var bridge = BridgeHelper.createNewBridge(name, ipdl, target);
  var protocol = new Protocol(ipdl.side.binding, bridge);

  return ipdl.side.binding;
};


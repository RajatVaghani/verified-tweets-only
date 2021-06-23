function isFirefox() {
  return navigator.userAgent.indexOf("Firefox") != -1;
}

function getStatus(callback) {
  if (isFirefox()) {

    browser.storage.local.get("status").then(function(result) {
      if (result == undefined) {
        result = {}
        result.status = false;
      }
      callback(result);
    }, function(){});

  } else {

    chrome.storage.sync.get(['status'], function(result) {
      if (result == undefined) {
        result = {}
        result.status = false;
      }
      callback(result);
    });

  }
}

function setStatus(isTurnedOn) {
  if (isFirefox()) {
      browser.storage.local.set({'status': isTurnedOn}).then(function(){}, function(){});
  } else {
      chrome.storage.sync.set({'status': isTurnedOn}, function() {});
  }

}

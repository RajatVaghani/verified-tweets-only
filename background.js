chrome.runtime.onInstalled.addListener(function () {
  //some other code here
});

chrome.tabs.onUpdated.addListener(function(id, info, tab){
    if (/twitter[.]com/.test(tab.url)) {
        chrome.pageAction.show(tab.id)
        console.log("tab found");
    }
});

chrome.runtime.onMessage.addListener(
  function(message, sendResponse) {
    chrome.tabs.query({active:true, windowType:"normal", currentWindow: true},function(d){
        var tabId = d[0].id;
        isTurnedOn = message.isChecked;
        imgPath = 'icons/off.png';
        if (isTurnedOn) {
          imgPath = 'icons/on.png';
        }
        chrome.pageAction.setIcon({path: imgPath, tabId: tabId});
    });
  }
);

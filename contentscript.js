
var isTurnedOn = true;
// fetch last option selected

getStatus(function (result) {

  isTurnedOn = result.status;
  chrome.runtime.sendMessage({isChecked: isTurnedOn});

  var timeline = document.getElementsByTagName('body')[0];
  // run this after 1.5s (random time), wait for tweets to load
  setTimeout(function () {
    timeline.addEventListener("DOMNodeInserted", function() {
      var tweets = timeline.getElementsByTagName('article');
      if (tweets && isTurnedOn) {
        for (i = 0 ; i < tweets.length ; i++) {
          if (tweets[i].querySelectorAll('[aria-label="Verified account"]').length == 0) {
            tweets[i].parentElement.parentElement.parentElement.style = "display:none !important;";
          } else {
            badge = tweets[i].querySelectorAll('[aria-label="Verified account"]')[0];
            // couldn't find a better way of doing the below one
            if (badge.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement != tweets[i]) {
              tweets[i].parentElement.parentElement.parentElement.style = "display:none !important;";
            }
          }
        }
      }
    });
  }, 1500);

});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    isTurnedOn = request.isChecked;
    chrome.runtime.sendMessage({isChecked: isTurnedOn});
    sendResponse({status: true});
  }
);

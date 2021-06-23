var isTurnedOn = true;

// call toggleStatus() when checkbox changed
checkbox = document.getElementById("status");
checkbox.addEventListener("change", toggleStatus);

getStatus(function(result) {
  if (result.status == undefined) {
    result.status = false;
  }
  isTurnedOn = result.status;
  checkbox.checked = isTurnedOn;
});

// easy to follow
function toggleStatus() {
  checked = document.getElementById("status");
  isTurnedOn = checked.checked;
  sendMessage();
}

// send message that checkbox is toggled and do the needful
function sendMessage() {
  setStatus(isTurnedOn);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {isChecked: isTurnedOn}, function(response) {
      chrome.tabs.reload(function(){});
    });
  });
}

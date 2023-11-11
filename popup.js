document.addEventListener("DOMContentLoaded", function () {
  var redirectButton = document.getElementById("redirectButton");

  redirectButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: "redirect" });
    });
  });
});

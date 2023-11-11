chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "redirect") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: redirect,
      });
    });
  }
});

function redirect() {
  chrome.storage.local.get("redirects", function (data) {
    var redirects = data.redirects || [];

    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: function (redirects) {
        var currentUrl = window.location.href;

        redirects.forEach(function (rule) {
          var [source, destination] = rule.split(" → ");

          if (currentUrl.includes(source)) {
            window.location.href = destination;
          }
        });
      },
      args: [redirects],
    });
  });
}

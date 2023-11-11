chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
  // Lê o conteúdo do arquivo urls.txt
  fetch(chrome.extension.getURL("urls.txt"))
    .then((response) => response.text())
    .then((data) => {
      // Verifica se a URL atual está no arquivo
      const urlList = data.split("\n");
      const currentURL = details.url;

      for (const entry of urlList) {
        const [sourceURL, redirectURL] = entry.split(",");
        if (currentURL.includes(sourceURL)) {
          // Realiza o redirecionamento
          chrome.tabs.update(details.tabId, { url: redirectURL });
          break;
        }
      }
    });
});

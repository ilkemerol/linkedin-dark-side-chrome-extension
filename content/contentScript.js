chrome.storage.sync.get(["isDark"], function(items) {
  console.log(items);
  if (items.isDark === undefined || items.isDark) {
    var darkCss = document.createElement("link");
    darkCss.href = chrome.extension.getURL("injected/dark.css");
    darkCss.type = "text/css";
    darkCss.rel = "stylesheet";
    darkCss.id = "dark-side";
    document.head.appendChild(darkCss);

    chrome.storage.sync.set({ isDark: true }, function() {});
  }
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.dark == "on") {
    var darkCss = document.createElement("link");
    darkCss.href = chrome.extension.getURL("injected/dark.css");
    darkCss.type = "text/css";
    darkCss.rel = "stylesheet";
    darkCss.id = "dark-side";
    document.head.appendChild(darkCss);

    chrome.storage.sync.set({ isDark: true }, function() {});
    sendResponse({ done: "ok" });
  } else if (request.dark == "off") {
    $("head")
      .find("link#dark-side")
      .remove();
    chrome.storage.sync.clear(function() {});
    chrome.storage.sync.set({ isDark: false }, function() {});
    sendResponse({ done: "ok" });
  } else if (request.clearStorage == "on") {
    chrome.storage.sync.clear(function() {
      sendResponse({ done: "ok" });
    });
  }
});

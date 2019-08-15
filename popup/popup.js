document.addEventListener("DOMContentLoaded", function() {
  var checkbox_s = $(".check_container");
  var clearSet = $("#clearSet");
  var clicked = false;

  checkbox_s.click(function() {
    if (clicked == false) {
      chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, { dark: "off" }, function(response) {
          console.log(response.done);
        });
      });
      clicked = true;
    } else {
      chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, { dark: "on" }, function(response) {
          console.log(response.done);
        });
      });
      clicked = false;
    }
  });

  clearSet.click(function() {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id, { clearStorage: "on" }, function(
        response
      ) {
        console.log(response.done);
      });
    });
  });
});

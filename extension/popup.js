function sendMessageToContentScript(tabId, message) {
  chrome.tabs.sendMessage(tabId, message);
}

document.addEventListener("DOMContentLoaded", function () {
  const startStreamButton = document.getElementById("startStream");
  const closeButton = document.getElementById("closePopup");

  startStreamButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;
        sendMessageToContentScript(tabId, { startCameraStream: true });
      }
    });
    chrome.browserAction.setBadgeText({ text: "ON" });
    window.close();
  });

  closeButton.addEventListener("click", function () {
    chrome.browserAction.setBadgeText({ text: "OFF" });
    window.close();
  });
});

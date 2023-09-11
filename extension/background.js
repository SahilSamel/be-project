// background.js

function sendMessageToContentScript(tabId, message, callback) {
  chrome.tabs.sendMessage(tabId, message, callback);
}

function detectWebRTCConnection(tabId) {
  sendMessageToContentScript(
    tabId,
    { checkWebRTCConnection: true },
    function (response) {
      if (response && response.webRTCConnected) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "/images/icon48.png",
          title: "ASL Buddy",
          message: "Start your camera",
        });
      }
    }
  );
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    detectWebRTCConnection(tabId);
  }
});

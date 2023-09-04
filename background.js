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
        alert("Start the camera")
      }
    }
  );
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    detectWebRTCConnection(tabId);
  }
});

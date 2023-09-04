// content.js

function checkForWebRTCConnection() {
  const rtcConnections =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;
  return !!rtcConnections;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.checkWebRTCConnection) {
    const webRTCConnected = checkForWebRTCConnection();
    sendResponse({ webRTCConnected });
  } else if (request.startCameraStream) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        alert("Receiving stream")
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  }
});


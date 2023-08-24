//WebRTC connection establishment detection
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.checkWebRTCConnection) {
    const webRTCConnected = checkForWebRTCConnection();
    sendResponse({ webRTCConnected });
  }
});

function checkForWebRTCConnection() {
  const rtcConnections =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;
  return !!rtcConnections;
}

const socket = new WebSocket("ws://localhost:4242");

socket.onopen = () => {
  console.log("WebSocket connection opened.");
};

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
        if(stream){
          console.log("Ha bhai he stream")
          console.log('Video tracks:', stream.getVideoTracks().length);
          console.log("WebSocket ready state:", socket.readyState);

        }
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm",
        });
        mediaRecorder.start();

        mediaRecorder.ondataavailable = (event) => {
          console.log("Data available");
          if (socket.readyState === WebSocket.OPEN) {
            console.log("Sending stream data via WebSocket.");
            socket.send(event.data);
            console.log("Stream data sent.");
          }
        };
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });

    return true;
  }
});

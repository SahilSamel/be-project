const videoElement = document.getElementById("cameraStream");

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
}

startCamera();

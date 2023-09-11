document.getElementById('requestPermission').addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Camera access granted');
      chrome.storage.local.set({ cameraPermission: true });
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  });
  
  
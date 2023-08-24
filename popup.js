document.getElementById("startStream").addEventListener("click", () => {
  chrome.tabs.create({ url: "camera.html" });
});

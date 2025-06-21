
const tracked = {};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "trackPixel") {
    tracked[msg.pixelId] = { notified: false };
  }
});

chrome.alarms.create("pollTracking", { periodInMinutes: 0.25 });
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name !== "pollTracking") return;

  for (const pixelId in tracked) {
    if (tracked[pixelId].notified) continue;

    fetch(`https://server-3-8a90.onrender.com/status/${pixelId}`)
      .then(r => r.json())
      .then(data => {
        if (data.seen) {
          chrome.notifications.create(pixelId, {
            type: "basic",
            iconUrl: chrome.runtime.getURL("icons/icon128.png"),
            title: "Email Read",
            message: `Your email (ID ${pixelId}) was opened.`,
          });
          tracked[pixelId].notified = true;
        }
      })
      .catch(console.error);
  }
});

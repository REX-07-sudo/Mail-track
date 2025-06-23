
const tracked = {};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "trackPixel") {
    tracked[msg.pixelId] = { 
      notified: false,
      receiverEmail: msg.receiverEmail || "Unknown"
     };
  }
});

chrome.alarms.create("pollTracking", { periodInMinutes: 0.25 });
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name !== "pollTracking") return;

  for (const pixelId in tracked) {
    if (tracked[pixelId].notified) continue;

    fetch(`https://server-4-hqoz.onrender.com/status/${pixelId}`)
      .then(r => r.json())
      .then(data => {
        if (data.seen) {
          const email = tracked[pixelId].receiverEmail || "Unknown";

          chrome.notifications.create(pixelId, {
            type: "basic",
            iconUrl: chrome.runtime.getURL("icons/icon128.png"),
            title: "Email Read",
            message: `Your email was opened.`,
          });
          tracked[pixelId].notified = true;
        }
      })
      .catch(console.error);
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'getTrackedEmails') {
    sendResponse({ tracked }); 
    return true;
  }
});

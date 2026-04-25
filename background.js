chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith("chrome://")) return;

  try {
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["styles.css"]
    });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });

    chrome.tabs.sendMessage(tab.id, { action: "toggle" });
  } catch (err) {
    console.error("Injection failed:", err);
  }
});
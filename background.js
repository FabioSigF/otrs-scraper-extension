chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "SCRAPED_TICKETS") {
    
    console.log("Background received:", message.payload);

    chrome.tabs.query({ url: "http://localhost:3000/*" }, (tabs) => {
      tabs.forEach((tab) => {
         chrome.tabs.sendMessage(tab.id, {
          type: "OTRS_TICKETS_SYNC",
          payload: message.payload,
        });
      });
    });
  }
});
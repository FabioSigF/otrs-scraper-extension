chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "SCRAPED_TICKETS") {
    
    console.log("Background received:", message.payload);

    chrome.tabs.query({ url: "https://ticketflow-tau.vercel.app/*" }, (tabs) => {
      tabs.forEach((tab) => {
         chrome.tabs.sendMessage(tab.id, {
          type: "OTRS_TICKETS_SYNC",
          payload: message.payload,
        });
      });
    });
  }
});
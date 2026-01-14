document.getElementById("syncBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab || !tab.url.includes("otrs.callink.com.br")) {
    alert("Abra o OTRS antes de sincronizar.");
    return;
  }

  chrome.tabs.sendMessage(
    tab.id,
    { type: "START_SCRAPING" },
    (response) => {
      if (!response?.payload) {
        alert("Falha ao coletar tickets.");
        return;
      }
      
      console.log("Popup received scraped tickets:", response.payload);

      chrome.runtime.sendMessage({
        type: "SCRAPED_TICKETS",
        payload: response.payload,
      });

      console.log("Popup forwarded tickets:", response.payload);
      window.close();
    }
  );
});
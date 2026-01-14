function scrapeTickets() {
  const rows = document.querySelectorAll("table.TableSmall tbody tr");

  if (!rows.length) {
    console.warn("OTRS table not found or user not logged in");
    return [];
  }

  const tickets = Array.from(rows).map((row) => {
    const cells = row.querySelectorAll("td");
    
    return {
      priority: cells[1]?.innerText.trim() ?? "",
      ticketId: cells[3]?.innerText.trim() ?? "",
      age: cells[4]?.innerText.trim() ?? "",
      owner: cells[5]?.innerText.trim() ?? "",
      title: cells[6]?.innerText.trim() ?? "",
    };
  });
  
  return tickets; 
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_SCRAPING") {
    const tickets = scrapeTickets();

    sendResponse({
      type: "SCRAPED_TICKETS_RESPONSE",
      payload: tickets,
    });

    console.log("OTRS tickets scraped:", tickets);
  }

  return true;
});
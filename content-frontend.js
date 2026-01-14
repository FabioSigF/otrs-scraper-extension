chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "OTRS_TICKETS_SYNC") {
    console.log("Received tickets for sync:", message.payload);
    window.postMessage(
      {
        type: "OTRS_TICKETS_SYNC",
        payload: message.payload,
      },
      "*"
    );
  }
});
// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getMovieTitle") {
    // Attempt to find the title using the OpenGraph tag (standart on Netflix/Prime/Disney)
    const metaTag = document.querySelector('meta[property="og:title"]');

    if (metaTag) {
      const rawTitle = metaTag.textContent;
      console.log("StreamScore fount raw title:", rawTitle);

      // Clean the title: Remove " - Netflix", " | Prime Video", etc.
      //This regex looks for " - " or " | " followed by text at the end of the string
      const cleanTitle = rawTitle.replace(/ [-|] .*/, "").trim();

      sendResponse({ title: cleanTitle });
    } else {
      // Fallback: Try getting the standart document title
      const fallbackTitle = document.title.replace(/ [-|] .*/, "").trim();
      sendResponse({ title: fallbackTitle || null });
    }
  }
  return true; // Keeps the message channel open for async response
});

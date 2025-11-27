// content.js - Runs on the Netflix/Prime page

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in content script:", request);
  
  if (request.action === "getMovieTitle") {
    // STRATEGY 1: Open Graph Tag (Used by Netflix, Disney+, Hulu)
    // <meta property="og:title" content="Inception - Netflix">
    const ogTitle = document.querySelector('meta[property="og:title"]');
    
    console.log("OG title found:", ogTitle ? ogTitle.content : "none");
    console.log("Document title:", document.title);

    // STRATEGY 2: Document Title (Used by Prime Video)
    // <title>Watch The Boys | Prime Video</title>
    let title = ogTitle ? ogTitle.content : document.title;

    if (title) {
      // CLEANUP: Remove " - Netflix", " | Prime Video", Season numbers, etc.
      title = title
        .replace(/ - Netflix$/, "")
        .replace(/ \| Prime Video$/, "")
        .replace(/ \| Disney\+$/, "")
        .replace(/ \| Hulu$/, "")
        .replace(/^Watch /, "") // Amazon sometimes says "Watch Matrix..."
        .split(" Season")[0] // Remove " Season 1" for TV shows to get general rating
        .trim();
    }

    console.log("Final title to send:", title);
    sendResponse({ title: title });
  }
  return true; // Keep connection open
});

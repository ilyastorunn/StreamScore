document.addEventListener("DOMContentLoaded", async () => {
  // 1. Find the active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // 2. Send message to content.js to get the title
  chrome.tab.sendMessage(tab.id, { action: "getMovieTitle" }, (response) => {
    const loadingDiv = document.getElementById("loading");
    const contentDiv = document.getElementById("content");
    const titleDisplay = document.getElementById("title-display");

    if (response && response.title) {
      loadingDiv.classList.add("hidden");
      contentDiv.classList.remove("hidden");
      titleDisplay.innerText = response.title;

      // START FETCHING DATA
      fetchRatings(response.title);
    } else {
      loadingDiv.innerText = "No movie dedected. Are you on a movie page?";
    }
  });
});

async function fetchRatings(movieTitle) {
  // --- TEMPORARY MOCK DATA (Wait for your API key) ---
  console.log("Fetching ratings for:", movieTitle);

  // Simulate a network delay of 500ms
  await new Promise((r) => setTimeout(r, 500));

  // Fake data structure (This mirrors exactly what OMDb returns)
  const mockData = {
    Ratings: [
      { Source: "Internet Movie Database", Value: "8.5/10" },
      { Source: "Rotten Tomatoes", Value: "92%" },
      { Source: "Metacritic", Value: "87/100" },
    ],
  };

  // When you get the API key, we will replace the block above with:
  // const res = await fetch(`https://your-vercel-app.app/api?title=${movieTitle}`);
  // const mockData = await res.json();

  updateUI(mockData);
}

function updateUI(data) {
  const getVal = (source) => {
    const item = data.Ratings.find((r) => r.Source === source);
    return item ? item.Value : "N/A";
  };

  document.getElementById("imdb-score").innerText = getVal(
    "Internet Movie Database"
  );
  document.getElementById("rt-score").innerText = getVal("Rotten Tomatoes");
  document.getElementById("meta-score").innerText = getVal("Metacritic");
}

# StreamScore

A Chrome browser extension that displays IMDb, Rotten Tomatoes, and Metacritic ratings while you browse Netflix, Prime Video, Disney+, Hulu, and Max.

## Features

- **Multi-platform support**: Works on Netflix, Prime Video, Disney+, Hulu, and Max
- **Multiple rating sources**: Shows IMDb, Rotten Tomatoes, and Metacritic scores
- **Real-time detection**: Automatically identifies movies/TV shows on streaming pages
- **Clean UI**: Dark theme inspired by Netflix with smooth transitions

## Setup

### 1. Deploy the Backend (Vercel)

1. Fork this repository
2. Deploy to Vercel: `npx vercel`
3. In Vercel dashboard, add environment variable:
   - `OMDB_API_KEY`: Get your free API key from [OMDb API](http://www.omdbapi.com/apikey.aspx)
4. Note your Vercel URL (e.g., `https://stream-score.vercel.app`)

### 2. Configure the Extension

1. Open `popup.html`
2. Replace line 140 with your Vercel URL:

   ```javascript
   const API_URL = "https://your-vercel-url.vercel.app/api";
   ```

### 3. Install the Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the StreamScore folder

## Usage

1. Navigate to Netflix, Prime Video, Disney+, Hulu, or Max
2. Open any movie or TV show page
3. Click the StreamScore extension icon
4. View ratings from multiple sources

## Architecture

- **Frontend**: Chrome extension (Manifest V3)
- **Backend**: Vercel serverless function proxying OMDb API
- **Content Script**: Scrapes movie titles from streaming platforms
- **Popup UI**: Displays ratings with loading states and error handling

## Development

### Files Structure

- `manifest.json` - Extension configuration
- `popup.html` - Main UI with inline JavaScript
- `content.js` - Content script for title extraction
- `api/index.js` - Vercel API endpoint

### Local Development

1. Deploy backend to Vercel first
2. Update API_URL in popup.html
3. Load extension in Chrome developer mode

## Troubleshooting

- **"No movie detected"**: Ensure you're on a supported streaming platform's movie/TV show page
- **"Setup Error"**: Make sure you've replaced the placeholder URL in popup.html
- **"API Key missing"**: Add OMDB_API_KEY environment variable in Vercel dashboard

## License

MIT License

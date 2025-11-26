export default async function handler(req, res) {
  // 1. CORS Headers (Allows your extension to talk to this server)
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight check
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { title } = req.query;
  // This pulls the key from Vercel Settings
  const API_KEY = process.env.OMDB_API_KEY;

  if (!API_KEY) {
    return res
      .status(500)
      .json({ Error: "Server Error: API Key is missing in Vercel." });
  }

  if (!title) {
    return res.status(400).json({ Error: "No title provided." });
  }

  try {
    // 2. Fetch data from OMDb (using your private key)
    const response = await fetch(
      `http://www.omdbapi.com/?t=${encodeURIComponent(
        title
      )}&apikey=${API_KEY}&tomatoes=true`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ Error: "Failed to fetch data from OMDb." });
  }
}

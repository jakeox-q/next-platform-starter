const axios = require("axios");

exports.handler = async function (event, context) {
  const videoID = event.queryStringParameters.videoID;
  const apiKey = process.env.YOUTUBE_API_KEY; // Your YouTube API key
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&key=${apiKey}&part=snippet,contentDetails`;

  try {
    const response = await axios.get(url);
    const data = response.data.items[0];

    const thumbnailUrl = data.snippet.thumbnails.default.url;
    const channelName = data.snippet.channelTitle;
    const duration = data.contentDetails.duration;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ thumbnailUrl, channelName, duration })
    };
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from both domains
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: "Failed to fetch YouTube data" })
    };
  }
};
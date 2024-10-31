const axios = require('axios');

exports.handler = async (event) => {
  const { wistiaID } = event.queryStringParameters;
  
  if (!wistiaID) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing Wistia ID' }),
    };
  }

  const WISTIA_API_KEY = process.env.WISTIA_API_KEY; // Use the correct variable name

  try {
    const response = await axios.get(`https://api.wistia.com/v1/videos/${wistiaID}.json`, {
      params: { api_password: WISTIA_API_KEY },
    });

    const videoData = response.data;
    const thumbnailUrl = videoData.thumbnail.url;

    return {
      statusCode: 200,
      body: JSON.stringify({ thumbnailUrl }),
    };
  } catch (error) {
    console.error('Error fetching Wistia data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch Wistia data' }),
    };
  }
};
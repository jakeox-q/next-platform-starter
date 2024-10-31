const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    const wistiaID = event.queryStringParameters.wistiaID;
    const apiKey = process.env.WISTIA_API_KEY;

    if (!wistiaID || !apiKey) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing wistiaID or API key" })
      };
    }

    const response = await axios.get(`https://api.wistia.com/v1/medias/${wistiaID}.json`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    const duration = response.data.duration;
    return {
      statusCode: 200,
      body: JSON.stringify({ duration })
    };
  } catch (error) {
    console.error("Error fetching Wistia duration:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};
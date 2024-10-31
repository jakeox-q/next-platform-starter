const axios = require('axios');

exports.handler = async function(event, context) {
  const wistiaID = event.queryStringParameters.wistiaID;
  const WISTIA_API_TOKEN = process.env.WISTIA_API_TOKEN;

  if (!wistiaID) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing Wistia ID" }),
    };
  }

  try {
    const response = await axios.get(`https://api.wistia.com/v1/medias/${wistiaID}.json`, {
      headers: {
        Authorization: `Bearer ${WISTIA_API_TOKEN}`,
      },
    });

    const thumbnailUrl = response.data.thumbnail?.url;
    if (!thumbnailUrl) {
      throw new Error("No thumbnail found");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ thumbnailUrl }),
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Wistia data", details: error.message }),
    };
  }
};
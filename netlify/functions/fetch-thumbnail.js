const axios = require("axios");

exports.handler = async function (event) {
  const wistiaID = event.queryStringParameters.wistiaID;
  const apiKey = process.env.WISTIA_API_TOKEN;

  if (!wistiaID) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Wistia ID is required" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }

  try {
    const response = await axios.get(`https://api.wistia.com/v1/medias/${wistiaID}.json`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    // Fetch the base thumbnail URL and append the desired dimensions
    const thumbnailUrl = `${response.data.thumbnail.url}?image_crop_resized=640x360`;

    return {
      statusCode: 200,
      body: JSON.stringify({ thumbnailUrl }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Wistia data" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }
};
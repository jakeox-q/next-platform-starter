const axios = require("axios");

exports.handler = async function (event) {
  const wistiaID = event.queryStringParameters.wistiaID;
  const apiKey = process.env.WISTIA_API_TOKEN;

  if (!wistiaID) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Wistia ID is required" }),
      headers: {
        "Access-Control-Allow-Origin": "*", // Adjust this line if you want to specify a single origin
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

    const thumbnailUrl = response.data.thumbnail.url;

    return {
      statusCode: 200,
      body: JSON.stringify({ thumbnailUrl }),
      headers: {
        "Access-Control-Allow-Origin": "*", // Adjust this to your Webflow URL if needed
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Wistia data" }),
      headers: {
        "Access-Control-Allow-Origin": "*", // Adjust this to your Webflow URL if needed
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }
};
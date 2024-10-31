const axios = require("axios");

exports.handler = async function (event, context) {
  const wistiaID = event.queryStringParameters.wistiaID;
  const apiKey = process.env.WISTIA_API_TOKEN;
  const url = `https://api.wistia.com/v1/medias/${wistiaID}.json`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    let thumbnailUrl = response.data.thumbnail.url;
    thumbnailUrl = thumbnailUrl.replace(/image_crop_resized=\d+x\d+/, "image_crop_resized=640x360");

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ thumbnailUrl })
    };
  } catch (error) {
    console.error("Error fetching Wistia data:", error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: "Failed to fetch Wistia data" })
    };
  }
};
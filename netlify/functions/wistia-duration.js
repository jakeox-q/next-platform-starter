const axios = require('axios');

exports.handler = async function (event, context) {
  const wistiaID = event.queryStringParameters.wistiaID;

  try {
    const response = await axios.get(`https://api.wistia.com/v1/medias/${wistiaID}.json`, {
      headers: {
        Authorization: `Bearer ${process.env.WISTIA_API_TOKEN}`,
      },
    });

    // Extract the duration from the response
    const duration = response.data.duration;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allows any origin
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ duration }),
    };
  } catch (error) {
    console.error('Error fetching Wistia data:', error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allows any origin
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Failed to fetch Wistia data' }),
    };
  }
};
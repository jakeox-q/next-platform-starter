const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const videoId = event.queryStringParameters.videoId;
    const apiKey = process.env.YOUTUBE_API_KEY;

    // Fetch YouTube data
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`);
    const data = await response.json();

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://relevance-site.webflow.io, https://relevanceai.com', // Allow requests from both domains
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify(data),
    };
};
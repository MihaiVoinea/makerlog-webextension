const axios = require("axios");
const querystring = require("querystring");

exports.handler = async (event, context) => {
  const { refresh_token } = event.queryStringParameters;
  if (refresh_token) {
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.getmakerlog.com/oauth/token/",
        data: querystring.stringify({
          grant_type: "refresh_token",
          refresh_token
        }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        auth: {
          username: process.env.CLIENT_ID,
          password: process.env.CLIENT_SECRET
        }
      });
      return {
        statusCode: response.status,
        body: JSON.stringify(response.data)
      };
    } catch (error) {
      return {
        statusCode: error.response.status,
        body: JSON.stringify(error.response.data)
      };
    }
  } else
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "no_code_provided" })
    };
};

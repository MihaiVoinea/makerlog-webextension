exports.handler = async event => {
  const { code } = event.queryStringParameters;
  if (code) {
    return {
      statusCode: 200,
      body: code
    };
  }
  return {
    statusCode: 400,
    body: JSON.stringify({ error: "no_code_provided" })
  };
};

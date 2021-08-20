

exports.handler = async (event) => {
    // TODO implement
    const message = 'hello from Amplify API'
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: message,
        headers:{
            'Access-Control=-Allow-Origin':'*'
        }
    };
    return response;
};

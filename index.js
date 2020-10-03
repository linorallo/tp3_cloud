var AWS = require('aws-sdk');

var handler = async (event) => {
    var dynamodb = new AWS.DynamoDB({
        apiVersion: '2012-08-10',
        endpoint: 'http://dynamodb:8000',
        region: 'us-west-2',
        credentials: {
            accessKeyId: '2345',
            secretAccessKey: '2345'
        }
    });
    var docClient = new AWS.DynamoDB.DocumentClient({
        apiVersion: '2012-08-10',
        service: dynamodb
    });
    // codigo de la funcion
    //console.log(dynamodb.listTables());

    switch (event.httpMethod) {
        case 'GET':
            var params = {
                TableName: 'Envio',
                FilterExpression: 'attribute_exists(pendiente)'
            };

            return await docClient
                .scan(params)
                .promise()
                .then((data) => {
                    return {
                        statusCode: 200,
                        body: JSON.stringify(data.Items),
                    };
                })
                .catch((err) => {
                    console.log(err);
                    return {
                        statusCode: 500,
                        body: err.message,
                    };

                });


    }
};
exports.handler = handler;
var params = {
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S'
      },
      {
        AttributeName: 'pendiente',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    TableName: 'Envio',
    StreamSpecification: {
      StreamEnabled: false
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'EnviosPendientesIndex',
        KeySchema:[
          {AttributeName: 'id', KeyType: 'HASH'},
          {AttributeName: 'pendiente', KeyType: 'RANGE'}
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      }
    ]
  };

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Table Created", data);
    }
});
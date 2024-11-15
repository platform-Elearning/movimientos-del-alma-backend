import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({ region: "us-east-1" });

class TableContainer {
  constructor(paramsTable) {
    this.paramsTable = paramsTable;
  }

  async createTable(nameTable, attributeName, attributeType ) {
    try {
      const command = new CreateTableCommand({
        TableName: nameTable,
        AttributeDefinitions: [
          {
            AttributeName: attributeName,
            AttributeType: attributeType,
          },
        ],
        KeySchema: [
          {
            AttributeName: attributeName,
            KeyType: "HASH",
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      });

      const response = await client.send(command);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async readTable(info) {
    try {
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  }

  async updateTable(info) {
    try {
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTable(info) {
    try {
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  }
}

export default TableContainer;

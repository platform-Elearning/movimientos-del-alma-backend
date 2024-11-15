import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// CONFIG IN AWS CLI
const client = new DynamoDBClient({
  region: "us-east-1",
});

const docClient = DynamoDBDocumentClient.from(client);

export default docClient;

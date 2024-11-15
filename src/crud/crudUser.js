import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { authFunc } from "../passwordStrategy/passwordStrategy.js";
import docClient from "../db/configAWS.js";

class UserContainer {
  constructor() {}

  async createUser(DNI, Name, Phone, Address, Email, User, Password, Role) {
    try {
      if (
        !DNI ||
        !Name ||
        !Phone ||
        !Address ||
        !Email ||
        !User ||
        !Password ||
        !Role 
      ) {
        throw new Error("Todos los campos son requeridos");
      }

      const dataUser = new PutCommand({
        TableName: "CustomersTABLE",
        Item: {
          DNI: DNI,
          Name: Name,
          Phone: Phone,
          Address: Address,
          Email: Email,
          User: User,
          Password: authFunc.hashPassword(Password),
          Role: Role,
        },
      });

      await docClient.send(dataUser);
      console.log('USER CREATE CORRECTLY');
    } catch (error) {
      console.log("ERR FUNCTION createUser (crudUser) ", error);
    }
  }

  async getUser(tableName, DNI) {
    try {
      const command = new GetCommand({
        TableName: tableName,
        Key: {
          DNI: DNI,
        },
      });

      const response = await docClient.send(command);

      return { userName: response.Item.Name, Role: response.Item.Role, email: response.Item.Email };
    } catch (error) {
      console.log(error);
    }
  }

  async getPassword(tableName, DNI) {
    try {
      const command = new GetCommand({
        TableName: tableName,
        Key: {
          DNI: DNI,
        },
      });

      const response = await docClient.send(command);
      return response.Item.Password;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(info) {
    try {
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(info) {
    try {
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserContainer;

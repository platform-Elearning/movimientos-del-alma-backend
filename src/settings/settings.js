import dotenv from "dotenv";

dotenv.config();

export const settings = {
  database: {
    user: process.env.PG_USER || "admin",
    password: process.env.PG_PASSWORD || "123456",
    database: process.env.PG_DBNAME || "movimientosdelalma_database",
    host: process.env.HOST || "localhost",
    port: parseInt(process.env.PORT, 10) || 5432, 
  },
  jwt: {
    secretKey: process.env.SECRET_KEY || "defaultSecret",
  },
  server: {
    serverPort: parseInt(process.env.SERVER_PORT, 10) || 8080,
  },
};
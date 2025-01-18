import dotenv from "dotenv";

dotenv.config();

export const settings = {
  database: {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DBNAME,
    host: process.env.HOST,
    port: parseInt(process.env.PORT, 10) || 5432, 
  },
  jwt: {
    secretKey: process.env.SECRET_KEY || "defaultSecret",
  },
  server: {
    serverPort: parseInt(process.env.SERVER_PORT, 10) || 8080,
  },
  cors: {
    origin: process.env.ORIGIN
  }
};
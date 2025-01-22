import { settings } from "../settings/settings.js";
import pkg from "pg";
import logger from "../utils/logger.js";

const { Pool } = pkg;

export const pool = new Pool({
  user: settings.database.user,
  password: settings.database.password,
  database: settings.database.database,
  host: settings.database.host,
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool
  .connect()
  .then((client) => {
    logger.info(`
      ╔════════════════════════════════════════╗
      ║  Connected successfully to PostgreSQL  ║
      ╚════════════════════════════════════════╝
      `);
    client.release();
  })
  .catch((error) => {
    logger.error(`Connection to PostgreSQL failed:. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    process.exit(1);
  });

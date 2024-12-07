import { settings } from "../settings/settings.js";
import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  user: settings.database.user,
  user: "postgres",
  password: "EdRPykJaVAUoZATgDQJCrwykvRdJVmfp",
  database: "railway",
  host: "postgres.railway.internal",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool
  .connect()
  .then((client) => {
    console.log(`
      ╔════════════════════════════════════════╗
      ║  Connection successfully to PostgreSQL ║
      ╚════════════════════════════════════════╝
      `);
    client.release();
  })
  .catch((err) => {
    console.error("Connection to PostgreSQL failed:", err.message);
    process.exit(1);
  });

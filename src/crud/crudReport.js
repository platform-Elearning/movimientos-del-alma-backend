import { pool } from "../db/configPG.js";

export const createReport = async (user_id, description) => {
  try {
    const query = `
      INSERT INTO "reportProblem" ("user_id", "description")
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [user_id, description];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in createReport:", error.message, error.stack);
    throw new Error("Failed to create report");
  }
};

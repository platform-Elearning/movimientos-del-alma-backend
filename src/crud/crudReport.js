import { pool } from "../db/configPG.js";
export const createReport = async (user_id, description) => {
  if (!user_id || !description) {
    throw new Error("All fields are required: user_id and description");
  }

  try {
    const query = `
        INSERT INTO "reportProblem" (user_id, description)
        VALUES ($1, $2)
        RETURNING *;
      `;

    const resultdb = await pool.query(query, [user_id, description]);
    return resultdb.rows[0];
  } catch (error) {
    console.warn("Error in function createReport:", error.message);
    throw new Error(error.detail || "Failed to create report");
  }
};

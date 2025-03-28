import { pool } from "../db/configPG.js";
import logger from "../utils/logger.js";

// ENROLLMENTS

export const getEnrollment = async (student_id, course_id) => {
  try {
    const query = `
  SELECT * 
  FROM enrollments
  WHERE student_id = $1 AND course_id = $2
`;

    const res = await pool.query(query, [student_id, course_id]);

    return res.rows[0];
  } catch (error) {
    logger.warn("getEnrollment not found.");
    throw new Error(error.detail);
  }
};

export const getAllEnrollmentsByStudentId = async (student_id) => {
  try {
    const query = `
    SELECT
      c.id AS course_id,
      c.name AS course_name,
      c.description,
      e.modules_covered
    FROM
      enrollments e
    INNER JOIN
      courses c ON e.course_id = c.id
    WHERE
      e.student_id = $1;
  `;

    const result = await pool.query(query, [student_id]);

    if (result.rows.length === 0) {
      return [];
    }

    return result.rows;
  } catch (error) {
    logger.warn("Error in function getAllEnrollmentsByStudentId.");

    throw new Error(error.detail);
  }
};

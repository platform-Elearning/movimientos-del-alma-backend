import { pool } from "../db/configPG.js";
import { generateRandomId, getDate } from "../utils/utils.js";

export const addCourse = async (
  name,
  duration_months,
  quantity_lessons,
  quantity_videos,
  enrollment_fee,
  enrollment_fee_USD,
  monthly_fee,
  monthly_fee_USD
) => {
  if (
    !name ||
    !duration_months ||
    !quantity_lessons ||
    !quantity_videos ||
    !enrollment_fee ||
    !enrollment_fee_USD ||
    !monthly_fee ||
    !monthly_fee_USD
  ) {
    throw new Error("All fields are required");
  }

  const query = `
      INSERT INTO courses (name, duration_months, quantity_lessons, quantity_videos, enrollment_fee,
      enrollment_fee_USD,
      monthly_fee,
      monthly_fee_USD)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

  const resultdb = await pool.query(query, [
    name,
    duration_months,
    quantity_lessons,
    quantity_videos,
    enrollment_fee,
    enrollment_fee_USD,
    monthly_fee,
    monthly_fee_USD,
  ]);
  return resultdb;
};

export const registerToCourse = async (
  student_id,
  course_id,
  enrollment_status,
  notes = "No se dejan notas"
) => {
  if (!student_id || !course_id || !enrollment_status) {
    throw new Error("All field are required");
  }

  const validStatuses = ["active", "cancelled", "completed", "incompleted"];

  if (!validStatuses.includes(enrollment_status)) {
    throw new Error(
      "Invalid enrollment status. Allowed values are: active, cancelled, completed, incompleted."
    );
  }

  const enrollment_date = getDate();
  
  try {
    const query = `INSERT INTO enrollments (student_id, course_id, enrollment_date, enrollment_status, notes) VALUES ($1, $2, $3, $4, $5)`;
    const resultdb = await pool.query(query, [
      student_id,
      course_id,
      enrollment_date,
      enrollment_status,
      notes,
    ]);

    return resultdb.rowCount;
  } catch (error) {
    console.error("Error in registerToCourse:", error.message);
    throw new Error("Failed to register to course", error);
  }
};

export const readCourse = () => {};

export const updateCourse = () => {};

export const deleteCourse = () => {};

export const checkEnrollment = async (student_id, course_id) => {
  try {
    const query = `
  SELECT * 
  FROM enrollments
  WHERE student_id = $1 AND course_id = $2
`;

    const res = await pool.query(query, [student_id, course_id]);

    return res.rows[0];
  } catch (error) {
    console.log("cehckEnrollment not found", error);
    throw new Error("Check enrollment not found", error);
  }
};

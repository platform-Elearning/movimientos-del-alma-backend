import { pool } from "../db/configPG.js";

export const addCourse = async (
  id,
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
    !id ||
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
      INSERT INTO courses (id, name, duration_months, quantity_lessons, quantity_videos, enrollment_fee,
      enrollment_fee_USD,
      monthly_fee,
      monthly_fee_USD)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

  const resultdb = await pool.query(query, [
    id,
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

export const readCourse = () => {};

export const updateCourse = () => {};

export const deleteCourse = () => {};

import { randomBytes } from "crypto";
import { pool } from "../db/configPG.js";

export const generateRandomId = () => {
  return randomBytes(3).toString("hex");
};

export const randomPassword = (length = 6) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};

export const getDate = () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return formattedDate;
};

export const normalizeInput = (input) => {
  return input
    .toLowerCase()
    .replace(/\s+/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const checkExist = async (table, column1, column2, value1, value2) => {
  if (!column1) {
    throw new Error("Error: column data missing");
  }

  try {
    let query;
    const values = [];

    if (column2) {
      query = `SELECT id FROM ${table} WHERE ${column1} = $1 AND ${column2} = $2`;
      values.push(value1, value2);
    } else {
      query = `SELECT id FROM ${table} WHERE ${column1} = $1`;
      values.push(value1);
    }

    const res = await pool.query(query, values);

    return res.rows[0];
  } catch (error) {
    console.log(`Error checking existence in table ${table}`, error);
    throw new Error(`Error checking existence in table ${table}`);
  }
};

export const checkLessonExist = async (module_id, course_id, lesson_number) => {
  try {
    const query = `SELECT module_id, course_id, lesson_number 
                   FROM lessons 
                   WHERE lesson_number = $1`;

    const res = await pool.query(query, [lesson_number]);

    for (const row of res.rows) {
      if (
        row.module_id === module_id &&
        row.course_id === course_id &&
        row.lesson_number === lesson_number
      ) {
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error(`Error checking existence in table lessons:`, error.message);
    throw new Error(`Error checking existence in table lesson`);
  }
};

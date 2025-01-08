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
      query = `SELECT * FROM ${table} WHERE ${column1} = $1 AND ${column2} = $2`;
      values.push(value1, value2);
    } else {
      query = `SELECT * FROM ${table} WHERE ${column1} = $1`;
      values.push(value1);
    }

    const res = await pool.query(query, values);

    return res.rows[0];
  } catch (error) {
    console.log(`Error checking existence in table ${table}`, error);
    throw new Error(`Error checking existence in table ${table}`);
  }
};

export const checkLessonExist = async (table, column1, column2, column3, value1, value2, value3) => {
  try {
    const query = `SELECT * FROM ${table} WHERE ${column1} = $1 AND ${column2} = $2 AND ${column3} = $3`;
    const values = [value1, value2, value3]; 

    const res = await pool.query(query, values);

    return res.rows[0]; 
  } catch (error) {
    console.error(`Error checking existence in table ${table}:`, error.message);
    throw new Error(`Error checking existence in table ${table}`);
  }
};

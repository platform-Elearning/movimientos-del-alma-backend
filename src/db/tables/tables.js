import { pool } from "../configPG.js";

export const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(20) NOT NULL
    );
  `;

  try {
    await pool.query(query);
    console.log("Table 'users' created or already exists.");
  } catch (error) {
    console.error("Error creating table 'users':", error);
  }
};

export const createStudentsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      identificationNumber VARCHAR(50) NOT NULL,
      name VARCHAR(50) NOT NULL,
      lastname VARCHAR(50) NOT NULL,
      nationality VARCHAR(50) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL
    );
  `;

  try {
    await pool.query(query);
    console.log("Table 'students' created or already exists.");
  } catch (error) {
    console.error("Error creating table 'students':", error);
  }
};
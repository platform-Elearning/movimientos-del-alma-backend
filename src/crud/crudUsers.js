import { pool } from "../db/configPG.js";

// CRUD FOR USER

export const createUser = async (id, username, password, role) => {
  try {
    if (!id || !username || !password || !role) {
      throw new Error("All fields are required");
    }

    const validRoles = ["teacher", "student", "admin"];
    if (!validRoles.includes(role)) {
      throw new Error("Rol must be 'teacher', 'student' o 'admin'");
    }

    const query = `
      INSERT INTO users (id, username, password, role)
      VALUES ($1, $2, $3, $4)
    `;

    const resultdb = await pool.query(query, [id, username, password, role]);

    return resultdb.rowCount;
  } catch (error) {
    console.error("Error in createUser:", error.message);
    throw new Error("Failed to create Student");
  }
};

export const getUserAndPassword = async (username) => {
  try {
    const query = 'SELECT username, password, role FROM users WHERE username = $1';
    const res = await pool.query(query, [username]);
   if (res.rows.length > 0) {
      return res.rows[0]; 
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    console.error('Error to get user and password:', err);
    throw err;
  }
};


export const updateUser = () => {};

export const deleteUser = () => {};

// CRUD FOR TEACHERS

// CRUD FOR STUDENTS

export const createStudent = async (
  id,
  identificationNumber,
  name,
  lastname,
  nationality,
  email
) => {
  try {
    if (
      !id ||
      !identificationNumber ||
      !name ||
      !lastname ||
      !nationality ||
      !email
    ) {
      throw new Error("All fields are required");
    }

    const query = `
  INSERT INTO students (id,
  identificationNumber,
  name,
  lastname,
  nationality,
  email)
  VALUES ($1, $2, $3, $4, $5, $6)
`;

    const resultdb = await pool.query(query, [
      id,
      identificationNumber,
      name,
      lastname,
      nationality,
      email,
    ]);

    return resultdb.rowCount;
  } catch (error) {
    console.log("Error in function createStudent:", error.message);
    throw new Error("Failed to create Student");
  }
};

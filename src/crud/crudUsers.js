import { pool } from "../db/configPG.js";

// CRUD FOR USER

export const createUser = async (id, email, password, role) => {
  try {
    if (!id || !email || !password || !role) {
      throw new Error("All fields are required");
    }

    const validRoles = ["teacher", "student", "admin"];
    if (!validRoles.includes(role)) {
      throw new Error("Rol must be 'teacher', 'student' o 'admin'");
    }

    const query = `
      INSERT INTO users (id, email, password, role)
      VALUES ($1, $2, $3, $4)
    `;

    const resultdb = await pool.query(query, [id, email, password, role]);

    return resultdb.rowCount;
  } catch (error) {
    console.error("Error in createUser:", error.message);
    throw new Error("Failed to create Student");
  }
};

export const readUser = async () => {};

export const updateUser = () => {};

export const deleteUser = () => {};

export const getUserAndPassword = async (email) => {
  try {
    const query = "SELECT email, password, role FROM users WHERE email = $1";
    const res = await pool.query(query, [email]);
    if (res.rows.length > 0) {
      return res.rows[0];
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    console.error("Error to get user and password:", err);
    throw err;
  }
};

export const checkUserExist = async (email) => {
  try {
    const query = "SELECT email FROM users WHERE email = $1 ";
    const res = await pool.query(query, [email]);

    return res.rows[0];
  } catch (error) {
    console.log("checkUserExist not found", error);
    throw new Error("Check user exist not found");
  }
};

export const changePassword = async (password, email) => {
  try {
    const query = `
      UPDATE users
      SET password = $1
      WHERE email = $2
      RETURNING id, email;
    `;

    const res = await pool.query(query, [password, email]);

    return res.command;
  } catch (error) {
    throw new Error("Change password cannot be completed");
  }
};
// CRUD FOR TEACHERS

export const createTeacher = async (id, name, lastname, email, dni) => {
  try {
    if ((!id, !name, !lastname, !email, !dni)) {
      throw new Error("All fields are required");
    }

    const query = `INSERT INTO teacher (id, name, lastname, email, dni) VALUES ($1,$2,$3,$4, $5)`;
    
    const resultdb = await pool.query(query, [id, name, lastname, email, dni]);
    
    return resultdb.rowCount;
  } catch (error) {}
};

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
  INSERT INTO student (id,
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



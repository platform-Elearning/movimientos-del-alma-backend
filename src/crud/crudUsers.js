import { pool } from "../db/configPG.js";
import { getAllEnrollmentsByStudentId } from "./crudCourses.js";

// CRUD FOR USER

export const createUser = async (id, email, password, role) => {
  if (!id || !email || !password || !role) {
    throw new Error("All fields are required");
  }

  const validRoles = ["teacher", "student", "admin"];
  if (!validRoles.includes(role)) {
    throw new Error("Rol must be 'teacher', 'student' o 'admin'");
  }
  try {
    const query = `
      INSERT INTO users (id, email, password, role)
      VALUES ($1, $2, $3, $4)
    `;

    const resultdb = await pool.query(query, [id, email, password, role]);

    return resultdb.rowCount;
  } catch (error) {
    console.error("Error in createUser:", error.message);
    throw new Error("Failed to create Student", error);
  }
};

export const updateUser = () => {};

export const deleteUser = () => {};

export const readLoginData = async (email) => {
  try {
    const query =
      "SELECT users.id, users.email, users.password, users.role, student.name " +
      "FROM users " +
      "LEFT JOIN student ON users.id = student.id " +
      "WHERE users.email = $1";
    const res = await pool.query(query, [email]);
    if (res.rows.length > 0) {
      return res.rows[0];
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    console.error("Error to get user and password:", err);
    throw new Error("Failed to readUserData", err);
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

export const createTeacher = async (
  id,
  name,
  lastname,
  identification_number,
  email
) => {
  try {
    if (!id || !name || !lastname || !identification_number || !email ) {
      throw new Error("All fields are required");
    }

    const query = `INSERT INTO teacher (id, name, lastname, identification_number, email) VALUES ($1,$2,$3,$4,$5)`;

    const resultdb = await pool.query(query, [
      id,
      name,
      lastname,
      identification_number,
      email
    ]);

    return resultdb.rowCount;
  } catch (error) {}
};

// CRUD FOR STUDENTS

export const createStudent = async (
  id,
  identification_number,
  name,
  lastname,
  email,
  nationality
) => {
  try {
    if (
      !id ||
      !identification_number ||
      !name ||
      !lastname ||
      !email ||
      !nationality 
    ) {
      throw new Error("All fields are required");
    }

    const query = `
  INSERT INTO student (id,
  identification_number,
  name,
  lastname,
  email,
  nationality)
  VALUES ($1, $2, $3, $4, $5, $6)
`;

    const resultdb = await pool.query(query, [
      id,
      identification_number,
      name,
      lastname,
      email,
      nationality
    ]);

    return resultdb.rowCount;
  } catch (error) {
    console.log("Error in function createStudent:", error.message);
    throw new Error("Failed to create Student");
  }
};

export const getStudentData = async (id) => {
  try {
    const query = `SELECT identification_number, name, lastname, email, nationality FROM student WHERE id = $1`;

    const responsedb = await pool.query(query, [id]);
    return responsedb.rows[0];
  } catch (error) {
    console.log("getStudentData error", error);
    throw new Error("getStudentData error");
  }
};

export const getAllStudents = async () => {
  try {
    const query = `SELECT * FROM student`;

    const response = await pool.query(query);

    return response.rows;
  } catch (error) {
    console.log("getStudentData error", error);
    throw new Error("getStudentData error");
  }
};

export const getStudentsWithCourses = async () => {
  try {
    const allStudents = await getAllStudents();

    const studentsWithCourses = [];
    
    for (const student of allStudents) {
      const enrollments = (await getAllEnrollmentsByStudentId(student.id)) || [];
     
      studentsWithCourses.push({
        user_id: student.id,
        dni: student.identification_number,
        name: student.name,
        last_name: student.lastname,
        email: student.email,
        nationality: student.nationality,
        courses: enrollments.map((enrollment) => ({
          course: enrollment.course_name,
          description: enrollment.description,
          modules: enrollment.modules_covered
        })),
      });
    }

    return studentsWithCourses;
  } catch (error) {
    console.log("getStudentsWithCourses error", error);
    throw new Error("getStudentsWithCourses error");
  }
};

export const getStudentWithDni = async (dni) => {
  try {
    const query = `SELECT * FROM student WHERE identification_number = $1`;
    const { rows } = await pool.query(query, [dni]); 

    if (rows.length === 0) {

      throw new Error(`No student found with DNI: ${dni}`);
    }

    return rows[0].id;  
    
  } catch (error) {
    console.error("getStudentWithDni error:", error.message || error);  // Imprimir el error con más detalles
    throw new Error(`Error while fetching student with DNI ${dni}: ${error.message || error}`);
  }
};
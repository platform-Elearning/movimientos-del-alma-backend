import { pool } from "../db/configPG.js";
import { getAllEnrollmentsByStudentId } from "./crudEnrollments.js";

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
    logger.warn("Error in function createUser.");
    throw new Error(error.detail || error);
  }
};

export const updateUser = () => {};

export const deleteUser = async (id) => {
  const query = `
    DELETE FROM users WHERE id = $1
  `;

  try {
    const result = await pool.query(query, [id]);

    console.log(`User delete with ID: ${id}`);

    return result.rowCount;
  } catch (error) {
    logger.warn("Error in function deleteUser.");
    throw new Error(error.message);
  }
};

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
  } catch (error) {
    logger.warn("Error to get user and password.");
    throw new Error(error.detail || error);
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
    logger.warn("Error in function changePassword.");
    throw new Error(error);
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
    if (!id || !name || !lastname || !identification_number || !email) {
      throw new Error("All fields are required");
    }

    const query = `INSERT INTO teacher (id, name, lastname, identification_number, email) VALUES ($1,$2,$3,$4,$5)`;

    const resultdb = await pool.query(query, [
      id,
      name,
      lastname,
      identification_number,
      email,
    ]);

    return resultdb.rowCount;
  } catch (error) {
    logger.warn("Error in function createTeacher.");
    throw new Error(error.detail);
  }
};

export const getTeacher = async (id) => {
  try {
    const query = `SELECT * FROM teacher WHERE id = $1`;

    const responsedb = await pool.query(query, [id]);

    if (responsedb.rows.length === 0) {
      throw new Error(`No teacher found with id: ${id}`);
    }

    return responsedb.rows[0];
  } catch (error) {
    logger.warn("Error in function getTeacher.");
    throw new Error(error.message);
  }
};

export const deleteTeacher = async (id) => {
  const query = `
    DELETE FROM teacher WHERE id = $1
  `;

  try {
    const result = await pool.query(query, [id]);

    console.log(`Teacher delete with ID: ${id}`);

    return result.rowCount;
  } catch (error) {
    logger.warn("Error in function deleteTeacher.");
    throw new Error(error.message);
  }
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
      nationality,
    ]);

    return resultdb.rowCount;
  } catch (error) {
    logger.warn("Error in function createStudent.");
    throw new Error(error.detail || error);
  }
};

export const getStudentData = async (id) => {
  try {
    const query = `SELECT identification_number, name, lastname, email, nationality FROM student WHERE id = $1`;

    const responsedb = await pool.query(query, [id]);
    return responsedb.rows[0];
  } catch (error) {
    logger.warn("Error in function getStudentData.");
    throw new Error(error.detail);
  }
};

export const getAllStudents = async () => {
  try {
    const query = `SELECT * FROM student`;

    const response = await pool.query(query);

    return response.rows;
  } catch (error) {
    logger.warn("Error in function getAllStudents.");
    throw new Error(error.detail);
  }
};

export const getStudentsWithCourses = async () => {
  try {
    const allStudents = await getAllStudents();

    const studentsWithCourses = [];

    for (const student of allStudents) {
      const enrollments =
        (await getAllEnrollmentsByStudentId(student.id)) || [];

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
          modules: enrollment.modules_covered,
        })),
      });
    }

    return studentsWithCourses;
  } catch (error) {
    logger.warn("Error in function getStudentsWithCourses.");
    throw new Error(error.detail);
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
    logger.warn("Error in function getStudentWithDni.");
    throw new Error(error.detail);
  }
};

export const deleteStudent = async (id) => {
  const query = `
    DELETE FROM student WHERE id = $1
  `;

  try {
    const result = await pool.query(query, [id]);

    console.log(`Student delete with ID: ${id}`);

    return result.rowCount;
  } catch (error) {
    logger.warn("Error in function deleteStudent.");
    throw new Error(error.message);
  }
};

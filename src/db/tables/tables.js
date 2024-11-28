import { pool } from "../configPG.js";

export const createUserRoleType = async () => {
  const query = `
    CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student');
  `;

  try {
    await pool.query(query);
    console.log("Type 'user_role' created or already exists.");
  } catch (error) {
    console.error("Error creating type 'user_role':", error);
  }
};

export const createEnrollmentStatusType = async () => {
  const query = `
    CREATE TYPE enrollment_status AS ENUM ('active', 'cancelled', 'completed');
  `;

  try {
    await pool.query(query);
    console.log("Type 'enrollment_status' created or already exists.");
  } catch (error) {
    console.error("Error creating type 'enrollment_status':", error);
  }
};

export const createUsersTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'users'
    );
  `;

  const createQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR PRIMARY KEY,
      email VARCHAR UNIQUE,
      password VARCHAR,
      role user_role
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (tableExists) {
      console.log("Table 'users' already exists.");
    } else {
      await pool.query(createQuery);
      console.log("Table 'users' created.");
    }
  } catch (error) {
    console.error("Error creating table 'users':", error);
  }
};

export const createCoursesTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'courses'
    );
  `;

  const createQuery = `
    CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR,
      name VARCHAR,
      duration_months INTEGER,
      quantity_lessons INTEGER,
      quantity_videos INTEGER,
      enrollment_fee INTEGER,
      monthly_fee INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (tableExists) {
      console.log("Table 'courses' already exists.");
    } else {
      await pool.query(createQuery);
      console.log("Table 'courses' created.");
    }
  } catch (error) {
    console.error("Error creating table 'courses':", error);
  }
};

export const createTeachersTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'teacher'
    );
  `;

  const createQuery = `
    CREATE TABLE IF NOT EXISTS teacher (
      id VARCHAR PRIMARY KEY,
      name VARCHAR,
      lastname VARCHAR,
      email VARCHAR
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (tableExists) {
      console.log("Table 'teacher' already exists.");
    } else {
      await pool.query(createQuery);
      console.log("Table 'teacher' created.");
    }
  } catch (error) {
    console.error("Error creating table 'teacher':", error);
  }
};

export const createEnrollmentsTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'enrollments'
    );
  `;

  const createQuery = `
    CREATE TABLE IF NOT EXISTS enrollments (
      id SERIAL PRIMARY KEY,
      student_id VARCHAR,
      course_id INTEGER,
      enrollment_date TIMESTAMP,
      enrollment_status enrollment_status,
      payment_status VARCHAR,
      notes VARCHAR,
      FOREIGN KEY (student_id) REFERENCES users(id),
      FOREIGN KEY (course_id) REFERENCES courses(id)
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (tableExists) {
      console.log("Table 'enrollments' already exists.");
    } else {
      await pool.query(createQuery);
      console.log("Table 'enrollments' created.");
    }
  } catch (error) {
    console.error("Error creating table 'enrollments':", error);
  }
};

export const createPaymentMethodsTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'payment_methods'
    );
  `;

  const createQuery = `
    CREATE TABLE IF NOT EXISTS payment_methods (
      id INTEGER PRIMARY KEY,
      name VARCHAR,
      description VARCHAR
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (tableExists) {
      console.log("Table 'payment_methods' already exists.");
    } else {
      await pool.query(createQuery);
      console.log("Table 'payment_methods' created.");
    }
  } catch (error) {
    console.error("Error creating table 'payment_methods':", error);
  }
};

export const createPaymentsTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'payments'
    );
  `;

  const createQuery = `
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY,
      enrollment_id INTEGER,
      amount INTEGER,
      payment_method_id INTEGER,
      months_covered INTEGER,
      payment_date TIMESTAMP,
      currency VARCHAR,
      payment_reference VARCHAR,
      FOREIGN KEY (enrollment_id) REFERENCES enrollments(id),
      FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id)
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (tableExists) {
      console.log("Table 'payments' already exists.");
    } else {
      await pool.query(createQuery);
      console.log("Table 'payments' created.");
    }
  } catch (error) {
    console.error("Error creating table 'payments':", error);
  }
};

export const createStudentsTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'students'
    );
  `;

  const createQuery = `
    CREATE TABLE IF NOT EXISTS students (
      id VARCHAR PRIMARY KEY,
      identificationNumber VARCHAR,
      name VARCHAR,
      lastname VARCHAR,
      email VARCHAR UNIQUE,
      nationality VARCHAR,
      FOREIGN KEY (id) REFERENCES users(id)
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (tableExists) {
      console.log("Table 'students' already exists.");
    } else {
      await pool.query(createQuery);
      console.log("Table 'students' created.");
    }
  } catch (error) {
    console.error("Error creating table 'students':", error);
  }
};

export const createTeacherCoursesTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'teacher_courses'
    );
  `;

  const createQuery = `
    CREATE TABLE IF NOT EXISTS teacher_courses (
      id INTEGER PRIMARY KEY,
      teacher_id VARCHAR,
      course_id INTEGER,
      FOREIGN KEY (teacher_id) REFERENCES teacher(id),
      FOREIGN KEY (course_id) REFERENCES courses(id)
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (tableExists) {
      console.log("Table 'teacher_courses' already exists.");
    } else {
      await pool.query(createQuery);
      console.log("Table 'teacher_courses' created.");
    }
  } catch (error) {
    console.error("Error creating table 'teacher_courses':", error);
  }
};

export const createCourseModulesTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'course_modules'
    );
  `;

  const createQuery = `
    CREATE TABLE IF NOT EXISTS course_modules (
      id SERIAL PRIMARY KEY,
      course_id INTEGER,
      module_number INTEGER,
      name VARCHAR,
      description TEXT,
      duration INTEGER,
      FOREIGN KEY (course_id) REFERENCES courses(id)
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (tableExists) {
      console.log("Table 'course_modules' already exists.");
    } else {
      await pool.query(createQuery);
      console.log("Table 'course_modules' created.");
    }
  } catch (error) {
    console.error("Error creating table 'course_modules':", error);
  }
};

export const createModuleVideosTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'module_videos'
    );
  `;

  const createQuery = `
    CREATE TABLE IF NOT EXISTS module_videos (
      id SERIAL PRIMARY KEY,
      module_id INTEGER,
      title VARCHAR,
      url VARCHAR,
      description TEXT,
      duration INTEGER,
      FOREIGN KEY (module_id) REFERENCES course_modules(id)
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (tableExists) {
      console.log("Table 'module_videos' already exists.");
    } else {
      await pool.query(createQuery);
      console.log("Table 'module_videos' created.");
    }
  } catch (error) {
    console.error("Error creating table 'module_videos':", error);
  }
};

export const createLessonsTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'lessons'
    );
  `;

  const createQuery = `
    CREATE TABLE IF NOT EXISTS lessons (
      id SERIAL PRIMARY KEY,
      module_id INTEGER,
      title VARCHAR,
      content TEXT,
      lesson_number INTEGER,
      estimated_time INTEGER,
      FOREIGN KEY (module_id) REFERENCES course_modules(id)
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (tableExists) {
      console.log("Table 'lessons' already exists.");
    } else {
      await pool.query(createQuery);
      console.log("Table 'lessons' created.");
    }
  } catch (error) {
    console.error("Error creating table 'lessons':", error);
  }
};
import { pool } from "../configPG.js";

const createUserRoleType = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT 1 FROM pg_type WHERE typname = 'user_role'
    );
  `;

  const createQuery = `
    CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student');
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    if (!checkResult.rows[0].exists) {
      await pool.query(createQuery);
      console.log("Type 'user_role' created.");
    }
  } catch (error) {
    console.error("Error creating type 'user_role':", error);
  }
};

const createUsersTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'users'
    );
  `;

  const createQuery = `
    CREATE TABLE "users" (
      "id" VARCHAR PRIMARY KEY,
      "email" VARCHAR UNIQUE,
      "password" VARCHAR,
      "role" user_role
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    if (!checkResult.rows[0].exists) {
      await pool.query(createQuery);
      console.log("Table 'users' created.");
    }
  } catch (error) {
    console.error("Error creating table 'users':", error);
  }
};

const createCoursesTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'courses'
    );
  `;

  const createQuery = `
    CREATE TABLE "courses" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR,
  "description" VARCHAR
);
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (!tableExists) {
      await pool.query(createQuery);
      console.log("Table 'courses' created.");
    } else {
      console.log("Table 'courses' already exists.");
    }
  } catch (error) {
    console.error("Error creating table 'courses':", error);
  }
};

const createTeacherTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'teacher'
    );
  `;

  const createQuery = `
    CREATE TABLE "teacher" (
      "id" VARCHAR PRIMARY KEY,
      "identification_number" VARCHAR,
      "name" VARCHAR,
      "lastname" VARCHAR,
      "email" VARCHAR
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (!tableExists) {
      await pool.query(createQuery);
      console.log("Table 'teacher' created.");
    } else {
      console.log("Table 'teacher' already exists.");
    }
  } catch (error) {
    console.error("Error creating table 'teacher':", error);
  }
};

const createEnrollmentsTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'enrollments'
    );
  `;

  const createQuery = `
    CREATE TABLE "enrollments" (
      "id" SERIAL PRIMARY KEY,
      "student_id" VARCHAR,
      "course_id" INTEGER,
      "enrollment_date" TIMESTAMP,
      "modules_covered" INTEGER, 
      "notes" VARCHAR,
      FOREIGN KEY ("student_id") REFERENCES "users" ("id"),
      FOREIGN KEY ("course_id") REFERENCES "courses" ("id")
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (!tableExists) {
      await pool.query(createQuery);
      console.log("Table 'enrollments' created.");
    } else {
      console.log("Table 'enrollments' already exists.");
    }
  } catch (error) {
    console.error("Error creating table 'enrollments':", error);
  }
};

const createStudentTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'student'
    );
  `;

  const createQuery = `
    CREATE TABLE "student" (
      "id" VARCHAR PRIMARY KEY,
      "identification_number" VARCHAR,
      "name" VARCHAR,
      "lastname" VARCHAR,
      "email" VARCHAR UNIQUE,
      "nationality" VARCHAR,
      FOREIGN KEY ("id") REFERENCES "users" ("id")
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    if (!checkResult.rows[0].exists) {
      await pool.query(createQuery);
      console.log("Table 'student' created.");
    } else {
      console.log("Table 'student_table' already exists.");
    }
  } catch (error) {
    console.error("Error creating table 'student':", error);
  }
};

const createTeacherCoursesTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'teacher_courses'
    );
  `;

  const createQuery = `
    CREATE TABLE "teacher_courses" (
      "id" INTEGER PRIMARY KEY,
      "teacher_id" VARCHAR,
      "course_id" INTEGER,
      FOREIGN KEY ("teacher_id") REFERENCES "teacher" ("id"),
      FOREIGN KEY ("course_id") REFERENCES "courses" ("id")
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (!tableExists) {
      await pool.query(createQuery);
      console.log("Table 'teacher_courses' created.");
    } else {
      console.log("Table 'teacher_courses' already exists.");
    }
  } catch (error) {
    console.error("Error creating table 'teacher_courses':", error);
  }
};

const createCourseModulesTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'course_modules'
    );
  `;

  const createQuery = `
    CREATE TABLE "course_modules" (
      "id" SERIAL PRIMARY KEY,
      "course_id" INTEGER,
      "module_number" INTEGER,
      "name" VARCHAR,
      "description" TEXT,
      FOREIGN KEY ("course_id") REFERENCES "courses" ("id")
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (!tableExists) {
      await pool.query(createQuery);
      console.log("Table 'course_modules' created.");
    } else {
      console.log("Table 'course_modules' already exists.");
    }
  } catch (error) {
    console.error("Error creating table 'course_modules':", error);
  }
};

const createLessonsTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'lessons'
    );
  `;

  const createQuery = `
    CREATE TABLE "lessons" (
      "id" SERIAL PRIMARY KEY,
      "module_id" INTEGER,
      "lesson_number" INTEGER,
      "title" VARCHAR,
      "description" TEXT,
      "url" VARCHAR,
      FOREIGN KEY ("module_id") REFERENCES "course_modules" ("id")
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (!tableExists) {
      await pool.query(createQuery);
      console.log("Table 'lessons' created.");
    } else {
      console.log("Table 'lessons' already exists.");
    }
  } catch (error) {
    console.error("Error creating table 'lessons':", error);
  }
};

export const createTablesDbPostgres = async () => {
  try {
    await pool.query("BEGIN");
    await createUserRoleType();
    await createUsersTable();
    await createCoursesTable();
    await createTeacherTable();
    await createEnrollmentsTable();
    await createStudentTable();
    await createTeacherCoursesTable();
    await createCourseModulesTable();
    await createLessonsTable();

    await pool.query("COMMIT");

    console.log(`
      ╔═════════════════════════════════════════╗
      ║ Tables created/initialized successfully ║
      ╚═════════════════════════════════════════╝
      `);
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error initializing tables:", error);
    throw new Error("Failed to initialize tables.");
  }
};

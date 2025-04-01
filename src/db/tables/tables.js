import logger from "../../utils/logger.js";
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
      logger.info("Type 'user_role' created.");
    }
  } catch (error) {
    logger.error(`Error creating type 'user_role':. ERROR: ${error.message}`, {
      stack: error.stack,
    });
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
      logger.info("Table 'users' created.");
    }
  } catch (error) {
    logger.error(`Error creating table 'users':. ERROR: ${error.message}`, {
      stack: error.stack,
    });
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
      logger.info("Table 'courses' created.");
    } else {
      logger.warn("Table 'courses' already exists.");
    }
  } catch (error) {
    logger.error(`Error creating table 'courses': ERROR: ${error.message}`, {
      stack: error.stack,
    });
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
      "email" VARCHAR,
      "nationality" VARCHAR,
      "course_id" INTEGER, -- Agregado para asignar un curso
      FOREIGN KEY ("course_id") REFERENCES "courses" ("id") ON DELETE SET NULL
    );
  `;

  const alterQuery = `
    ALTER TABLE "teacher"
    ADD COLUMN IF NOT EXISTS "course_id" INTEGER,
    ADD CONSTRAINT fk_course
    FOREIGN KEY ("course_id") REFERENCES "courses" ("id") ON DELETE SET NULL;
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (!tableExists) {
      await pool.query(createQuery);
      logger.info("Table 'teacher' created.");
    } else {
      await pool.query(alterQuery);
      logger.warn(
        "Table 'teacher' already exists. Column 'course_id' ensured."
      );
    }
  } catch (error) {
    logger.error(`Error creating table 'teacher': ERROR: ${error.message}`, {
      stack: error.stack,
    });
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
      FOREIGN KEY ("student_id") REFERENCES "users" ("id") ON DELETE CASCADE,
      FOREIGN KEY ("course_id") REFERENCES "courses" ("id") ON DELETE CASCADE
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (!tableExists) {
      await pool.query(createQuery);
      logger.info("Table 'enrollments' created.");
    } else {
      logger.warn("Table 'enrollments' already exists.");
    }
  } catch (error) {
    logger.error(
      `Error creating table 'enrollments': ERROR: ${error.message}`,
      {
        stack: error.stack,
      }
    );
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
      "nationality" VARCHAR,
      "email" VARCHAR UNIQUE,
      FOREIGN KEY ("id") REFERENCES "users" ("id")
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    if (!checkResult.rows[0].exists) {
      await pool.query(createQuery);
      logger.info("Table 'student' created.");
    } else {
      logger.warn("Table 'student_table' already exists.");
    }
  } catch (error) {
    logger.error(`Error creating table 'student': ERROR: ${error.message}`, {
      stack: error.stack,
    });
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
      logger.info("Table 'teacher_courses' created.");
    } else {
      logger.warn("Table 'teacher_courses' already exists.");
    }
  } catch (error) {
    logger.error(
      `Error creating table 'teacher_courses': ERROR: ${error.message}`,
      {
        stack: error.stack,
      }
    );
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
      FOREIGN KEY ("course_id") REFERENCES "courses" ("id") ON DELETE CASCADE
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (!tableExists) {
      await pool.query(createQuery);
      logger.info("Table 'course_modules' created.");
    } else {
      logger.warn("Table 'course_modules' already exists.");
    }
  } catch (error) {
    logger.error(
      `Error creating table 'course_modules': ERROR: ${error.message}`,
      {
        stack: error.stack,
      }
    );
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
      "course_id" INTEGER,
      "lesson_number" INTEGER,
      "title" VARCHAR,
      "description" TEXT,
      "url" VARCHAR,
      FOREIGN KEY ("module_id") REFERENCES "course_modules" ("id") ON DELETE CASCADE,
      FOREIGN KEY ("course_id") REFERENCES "courses" ("id") ON DELETE CASCADE
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (!tableExists) {
      await pool.query(createQuery);
      logger.info("Table 'lessons' created.");
    } else {
      logger.warn("Table 'lessons' already exists.");
    }
  } catch (error) {
    logger.error(`Error creating table 'lessons': ERROR: ${error.message}`, {
      stack: error.stack,
    });
  }
};

const createReportProblemTable = async () => {
  const checkQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'reportProblem'
    );
  `;

  const createQuery = `
    CREATE TABLE "reportProblem" (
      "id" SERIAL PRIMARY KEY,
      "user_id" VARCHAR NOT NULL, -- Cambiado a VARCHAR para coincidir con la columna 'id' de 'users'
      "description" TEXT NOT NULL,
      "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
    );
  `;

  try {
    const checkResult = await pool.query(checkQuery);
    const tableExists = checkResult.rows[0].exists;

    if (!tableExists) {
      await pool.query(createQuery);
      console.log("Table 'reportProblem' created.");
    } else {
      console.warn("Table 'reportProblem' already exists.");
    }
  } catch (error) {
    console.error(
      `Error creating table 'reportProblem': ERROR: ${error.message}`,
      {
        stack: error.stack,
      }
    );
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
    await createReportProblemTable();

    await pool.query("COMMIT");

    logger.info(`
      ╔═════════════════════════════════════════╗
      ║ Tables created/initialized successfully ║
      ╚═════════════════════════════════════════╝
      `);
  } catch (error) {
    await pool.query("ROLLBACK");
    logger.error(`Error initializing tables: ERROR: ${error.message}`, {
      stack: error.stack,
    });
    throw new Error("Failed to initialize tables.");
  }
};

import { pool } from "../db/configPG.js";
import { getDate } from "../utils/utils.js";

// ENROLLMENTS

export const getEnrollment = async (student_id, course_id) => {
  try {
    const query = `
  SELECT * 
  FROM enrollments
  WHERE student_id = $1 AND course_id = $2
`;

    const res = await pool.query(query, [student_id, course_id]);

    return res.rows[0];
  } catch (error) {
    console.log("cehckEnrollment not found", error);
    throw new Error("Check enrollment not found", error);
  }
};

export const getAllEnrollmentsByStudentId = async (student_id) => {
  try {
    const query = `
    SELECT
      c.id AS course_id,
      c.name AS course_name,
      c.duration_months,
      c.quantity_lessons,
      c.quantity_videos,
      c.enrollment_fee,
      c.enrollment_fee_usd,
      c.monthly_fee,
      c.monthly_fee_usd
    FROM
      enrollments e
    INNER JOIN
      courses c ON e.course_id = c.id
    WHERE
      e.student_id = $1;
  `;

    const result = await pool.query(query, [student_id]);

    if (result.rows.length === 0) {
      return [];
    }

    return result.rows;
  } catch (error) {
    console.error("Error in getAllEnrollmentsByStudentId:", error);

    return {
      success: false,
      message: "Internal server error",
      error: error.message,
    };
  }
};

// COURSES

export const createCourse = async (
  name,
  duration_months,
  quantity_lessons,
  quantity_videos,
  enrollment_fee,
  enrollment_fee_USD,
  monthly_fee,
  monthly_fee_USD
) => {
  if (
    !name ||
    !duration_months ||
    !quantity_lessons ||
    !quantity_videos ||
    !enrollment_fee ||
    !enrollment_fee_USD ||
    !monthly_fee ||
    !monthly_fee_USD
  ) {
    throw new Error("All fields are required");
  }

  const query = `
      INSERT INTO courses (name, duration_months, quantity_lessons, quantity_videos, enrollment_fee,
      enrollment_fee_USD,
      monthly_fee,
      monthly_fee_USD)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

  const resultdb = await pool.query(query, [
    name,
    duration_months,
    quantity_lessons,
    quantity_videos,
    enrollment_fee,
    enrollment_fee_USD,
    monthly_fee,
    monthly_fee_USD,
  ]);
  return resultdb;
};

export const getCourses = async () => {
  const query = `
    SELECT * FROM courses;
  `;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error in getAllCourses:", error);
    throw new Error("Failed to get courses");
  }
};

export const getCourseById = () => {};

export const updateCourse = () => {};

export const deleteCourse = () => {};


export const registerToCourse = async (
  student_id,
  course_id,
  modules_covered,
  notes
) => {
  if (!student_id || !course_id || !modules_covered) {
    throw new Error("All field are required");
  }

  const enrollment_date = getDate();

  try {
    const query = `INSERT INTO enrollments (student_id, course_id, enrollment_date, modules_covered, notes) VALUES ($1, $2, $3, $4, $5)`;
    const resultdb = await pool.query(query, [
      student_id,
      course_id,
      enrollment_date,
      modules_covered,
      notes,
    ]);

    return resultdb.rowCount;
  } catch (error) {
    console.error("Error in registerToCourse:", error.message);
    throw new Error("Failed to register to course", error);
  }
};

// MODULES

export const createCourseModule = async (course_id, module_number, name, description) => {
  if (!course_id || !module_number || !name || !description){
    throw new Error("All fields are required");
  }

  const query = `INSERT INTO course_modules (course_id, module_number, name, description, duration) VALUES ($1, $2, $3, $4, $5)`;

  const resultdb = await pool.query(query, [course_id, module_number, name, description]);

  return resultdb;
} 

export const getModulesForStudent = async (student_id, course_id) => {
  const queryModules = "SELECT * FROM course_modules WHERE course_id = $1";
  const queryCovered =
    "SELECT modules_covered FROM enrollments WHERE student_id = $1 AND course_id = $2";

  try {

    const modulesResult = await pool.query(queryModules, [course_id]);
    if (modulesResult.rows.length === 0) {
      throw new Error("No modules found for this course");
    }

    const modules = modulesResult.rows;

    const modulesCoveredResult = await pool.query(queryCovered, [
      student_id,
      course_id,
    ]);
  
    if (modulesCoveredResult.rows[0].modules_covered.length === 0) {
      throw new Error("No enrollment found for this student in this course");
    }

    return modules.slice(0, modulesCoveredResult.rows[0].modules_covered)
  

  } catch (error) {
    console.error(
      `Error retrieving covered modules for student ${student_id} in course ${course_id}:`,
      error.message
    );
    throw new Error("Error retrieving covered modules");
  }
};

// LESSON

export const createLesson = async (module_id, title, description, lesson_number, url) => {
  if (!module_id || !title || !description || !lesson_number || !url){
    throw new Error("All fields are required");
  }

  const query = `INSERT INTO lessons (module_id, title, content, lesson_number, estimated_time) VALUES ($1, $2, $3, $4, $5)`;

  const resultdb = await pool.query(query, [module_id, title, description, lesson_number, url]);

  return resultdb;


}
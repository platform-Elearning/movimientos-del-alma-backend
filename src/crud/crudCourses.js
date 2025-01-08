import { pool } from "../db/configPG.js";
import { getDate } from "../utils/utils.js";

// COURSES

export const createCourse = async (name, description) => {
  if (!name || !description) {
    throw new Error("All fields are required");
  }

  try {
    const query = `
      INSERT INTO courses (name,
    description)
      VALUES ($1, $2)
    `;

    const resultdb = await pool.query(query, [name, description]);
    return resultdb;
  } catch (error) {
    console.log("Error in function createCourse");
    throw new Error(error.detail);
  }
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
    throw new Error(error.detail);
  }
};

export const getCourseById = () => {};

export const updateCourse = () => {};

export const deleteCourse = async (id) => {
  const deleteModulesQuery = `DELETE FROM course_modules WHERE course_id = $1`;
  const deleteCourseQuery = `DELETE FROM courses WHERE id = $1`;

  try {
    await pool.query("BEGIN");
    await pool.query(deleteModulesQuery, [id]);
    const result = await pool.query(deleteCourseQuery, [id]);
    await pool.query("COMMIT");

    return result.rowCount;
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error in deleteCourse:", error);
    throw new Error(error.detail || "Failed to delete course.");
  }
};

export const getCoursesWithModules = async () => {
  try {
    const allCourses = await getCourses();

    const coursesWithModules = [];

    for (const course of allCourses) {
      const modules = (await getModulesOfDeterminedCourse(course.id)) || [];

      coursesWithModules.push({
        course_id: course.id,
        name: course.name,
        description: course.description,
        modules: modules.map((module) => ({
          module_number: module.module_number,
          name: module.name,
          description: module.description,
        })),
      });
    }

    return coursesWithModules;
  } catch (error) {
    console.log("getCoursesWithModules error", error);
    throw new Error(error.detail);
  }
};

export const getCoursesWithModulesAndLessons = async () => {
  const query = `
    SELECT
      courses.id AS course_id,
      courses.name AS course_name,
      course_modules.id AS module_id,
      course_modules.name AS module_name,
      lessons.id AS lesson_id,
      lessons.lesson_number AS lesson_number,
      lessons.title AS lesson_title,
      lessons.description AS lesson_description,
      lessons.url AS lesson_url
    FROM
      courses
    LEFT JOIN
      course_modules ON courses.id = course_modules.course_id
    LEFT JOIN
      lessons ON course_modules.id = lessons.module_id;
  `;

  try {
    const result = await pool.query(query);
    const coursesMap = {};

    /////////////////////////////////////////////////////
    result.rows.forEach((row) => {


      if (!coursesMap[row.course_id]) {
        coursesMap[row.course_id] = {
          id: row.course_id,
          name: row.course_name,
          modules: [],
        };
      }

    
      if (row.module_id) {

        const moduleIndex = coursesMap[row.course_id].modules.findIndex(
          (m) => m.id === row.module_id
        );

        if (moduleIndex === -1) {
          coursesMap[row.course_id].modules.push({
            id: row.module_id,
            name: row.module_name,
            lessons: [],
          });
        }

        const module = coursesMap[row.course_id].modules.find(
          (m) => m.id === row.module_id
        );

        if (row.lesson_id) {
          module.lessons.push({
            id: row.lesson_id,
            number: row.lesson_number,
            title: row.lesson_title,
            description: row.lesson_description,
            url: row.lesson_url,
          });
          
        }
      }



    });
    ////////////////////////////////////////////////

    return Object.values(coursesMap);
  } catch (error) {
    console.error("Error ejecutando la consulta:", error);
    throw error;
  }
};

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
    throw new Error(error.detail);
  }
};

// MODULES

export const createCourseModule = async (
  course_id,
  module_number,
  name,
  description
) => {
  if (!course_id || !module_number || !name || !description) {
    throw new Error("All fields are required");
  }

  try {
    const query = `INSERT INTO course_modules (course_id, module_number, name, description) VALUES ($1, $2, $3, $4)`;

    const resultdb = await pool.query(query, [
      course_id,
      module_number,
      name,
      description,
    ]);

    return resultdb;
  } catch (error) {
    console.error(`Error to createCourse Module:`, error.detail);
    throw new Error(error.detail);
  }
};

export const getEnrolledModules = async (student_id, course_id) => {
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

    return modules.slice(0, modulesCoveredResult.rows[0].modules_covered);
  } catch (error) {
    console.error(
      `Error retrieving covered modules for student ${student_id} in course ${course_id}:`,
      error.message
    );
    throw new Error(error.message);
  }
};

export const getModulesOfDeterminedCourse = async (id) => {
  try {
    const query = `
      SELECT
        cm.module_number,
        cm.name,
        cm.description
      FROM
        course_modules cm
      INNER JOIN
        courses c ON cm.course_id = c.id
      WHERE
        c.id = $1;
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return [];
    }

    return result.rows;
  } catch (error) {
    console.error("Error in getModulesForCourse:", error);
    throw new Error(error.detail);
  }
};

export const getModuleByCourseId = async (course_id) => {
  const query = `
    SELECT * FROM course_modules WHERE course_id = $1;
  `;

  try {
    const result = await pool.query(query, [course_id]);

    if (result.rows.length === 0) {
      throw new Error(`No module found with course_id: ${course_id}`);
    }

    return result.rows;
  } catch (error) {
    console.error("Error in getAllCourses:", error);
    throw new Error(error);
  }
};

// LESSON

export const createLesson = async (
  module_id,
  course_id,
  lesson_number,
  title,
  description,
  url
) => {
  if (
    !module_id ||
    !course_id ||
    !lesson_number ||
    !title ||
    !description ||
    !url
  ) {
    throw new Error("All fields are required");
  }

  try {
    const query = `INSERT INTO lessons (module_id, course_id, lesson_number, title, description, url) VALUES ($1, $2, $3, $4, $5, $6)`;

    const resultdb = await pool.query(query, [
      module_id,
      course_id,
      lesson_number,
      title,
      description,
      url,
    ]);

    return resultdb;
  } catch (error) {
    console.log("Error in function createLesson");
    throw new Error(error);
  }
};

export const getLessons = async () => {
  const query = `
    SELECT * FROM lessons;
  `;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error in getAllCourses:", error);
    throw new Error(error.detail);
  }
};

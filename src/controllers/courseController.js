import {
  createCourse,
  getCourses,
  getEnrolledModules,
  createCourseModule,
  createLesson,
  deleteCourse,
  getModuleByCourseId,
  getLessons,
  getCoursesWithModulesAndLessons,
  getCoursesWithModules,
  deleteLesson,
  deleteModule,
  getCoursesWithModulesAndLessonsFilteredByCourseAndStudentId,
  getLessonsByModuleIdAndCourseId,
} from "../crud/crudCourses.js";
import { getAllEnrollmentsByStudentId } from "../crud/crudEnrollments.js";
import logger from "../utils/logger.js";
import { checkExist, checkLessonExist } from "../utils/utils.js";

// COURSES

export const getAllCoursesController = async (req, res) => {
  try {
    const courses = await getCourses();
    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    logger.error(`Error in getAllCoursesController. ERROR: ${error.message}`, {
      stack: error.stack,
    });

    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

export const getAllCoursesWithModulesController = async (req, res) => {
  try {
    const coursesWithModules = await getCoursesWithModules();
    return res.status(200).json({
      success: true,
      data: coursesWithModules,
    });
  } catch (error) {
    logger.error(
      `Error in getAllCoursesWithModulesController. ERROR: ${error.message}`,
      {
        stack: error.stack,
      }
    );
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

export const getAllCoursesWithModulesAndLessonsController = async (
  req,
  res
) => {
  try {
    const coursesWithModulesAndLessons =
      await getCoursesWithModulesAndLessons();
    return res.status(200).json({
      success: true,
      data: coursesWithModulesAndLessons,
    });
  } catch (error) {
    logger.error(
      `Error in getAllCoursesWithModulesController. ERROR: ${error.message}`,
      {
        stack: error.stack,
      }
    );
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

export const getCoursesWithModulesAndLessonsFilteredByCourseAndStudentIdController =
  async (req, res) => {
    const student_id = req.query.student_id;
    const course_id = req.query.course_id;

    try {
      const dataTotal =
        await getCoursesWithModulesAndLessonsFilteredByCourseAndStudentId(
          course_id,
          student_id
        );

      return res.status(200).json({
        success: true,
        data: dataTotal,
      });
    } catch (error) {
      logger.error(
        `Error in getCoursesWithModulesAndLessonsFilteredByCourseAndStudentIdController. ERROR: ${error.message}`,
        {
          stack: error.stack,
        }
      );
      return res.status(500).json({
        success: false,
        errorMessage: "Internal server error",
        error: error.message,
      });
    }
  };

/*export const getDataCoursesCompleteByStudentIdController = async (req, res) => {
  const { id } = req.params;

  try {
  } catch (error) {
    console.error(
      "Error in getDataCoursesCompleteByStudentIdController:",
      error
    );
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};*/

export const createCourseController = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  try {
    const check = await checkExist("courses", "name", null, name);

    if (check) {
      return res.status(409).json({
        success: false,
        message: "Course already exists",
      });
    }

    const courseCreated = await createCourse(name, description);

    if (!courseCreated) {
      throw new Error("Failed to create course");
    }

    logger.info(`Course ${name} create correctly`);
    return res.status(201).json({
      success: true,
      message: "Course create correctly",
    });
  } catch (error) {
    logger.error(`Error in courseCreateController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

export const getCoursesWithStudentIdController = async (req, res) => {
  const { id } = req.headers;

  if (!id) {
    return res.status(400).json({
      success: false,
      errorMessage: "ID is required in the headers",
    });
  }
  try {
    const enrollments = await getAllEnrollmentsByStudentId(id);

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: enrollments,
    });
  } catch (error) {
    logger.error(
      `Error in getCoursesWithStudentIdController. ERROR: ${error.message}`,
      {
        stack: error.stack,
      }
    );
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching courses",
      error: error.message || "Unknown error",
    });
  }
};

export const deleteCourseController = async (req, res) => {
  const { id } = req.body;

  if (!id || !Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      error: "Error on data ID",
    });
  }

  try {
    const response = await deleteCourse(id);

    if (response === 0) {
      return res.status(404).json({
        success: false,
        message: `No course found with ID ${id}.`,
      });
    }
    logger.info(`Course with ID ${id} deleted successfully.`);
    return res.status(200).json({
      success: true,
      message: `Course with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    logger.error(`Error in deleteCourseController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

// MODULES

export const getModulesOfStudentController = async (req, res) => {
  const student_id = req.query.student_id;
  const course_id = req.query.course_id;

  try {
    const modulesOfStudent = await getEnrolledModules(student_id, course_id);

    return res.status(200).json({
      success: true,
      data: modulesOfStudent,
    });
  } catch (error) {
    logger.error(`Error in getAllCoursesController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

export const getModuleByCourseIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getModuleByCourseId(id);

    return res.status(200).json({
      success: true,
      message: response,
    });
  } catch (error) {
    logger.error(
      `Error in getModuleByCourseIdController. ERROR: ${error.message}`,
      {
        stack: error.stack,
      }
    );
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

export const createCourseModuleController = async (req, res) => {
  const { course_id, module_number, name, description } = req.body;

  if (!course_id || !module_number || !name || !description) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  try {
    const check = await checkExist(
      "course_modules",
      "course_id",
      "module_number",
      course_id,
      module_number
    );

    if (check) {
      return res.status(409).json({
        success: false,
        message: "Module number already exists",
      });
    }

    const moduleCreated = await createCourseModule(
      course_id,
      module_number,
      name,
      description
    );

    if (!moduleCreated) {
      throw new Error("Failed to create module");
    }

    logger.info(`Module ${name} create correctly.`);
    return res.status(201).json({
      success: true,
      message: "Module create correctly successfully",
    });
  } catch (error) {
    logger.error(
      `Error in createCourseModuleController. ERROR: ${error.message}`,
      {
        stack: error.stack,
      }
    );
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteModuleController = async (req, res) => {
  const { id } = req.params;

  try {
    const check = await checkExist("users", "id", null, id);

    if (!check) {
      return res.status(409).json({
        success: false,
        message: "User not exist",
      });
    }

    const response = await deleteModule(id);

    if (response.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Module with ID ${id} not found` });
    }

    logger.info(`Module with ID ${id} deleted successfully`);
    return res.status(200).json({
      success: true,
      data: `Module with ID ${id} deleted successfully`,
    });
  } catch (error) {
    logger.error(`Error in deleteModuleController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

// LESSONS

export const createLessonController = async (req, res) => {
  const { module_id, course_id, lesson_number, title, description, url } =
    req.body;

  if (
    !module_id ||
    !course_id ||
    !lesson_number ||
    !title ||
    !description ||
    !url
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  try {
    const check = await checkLessonExist(module_id, course_id, lesson_number);

    if (!check) {
      return res.status(409).json({
        success: false,
        message: "Lesson already exist",
      });
    }

    const lessonCreated = await createLesson(
      module_id,
      course_id,
      lesson_number,
      title,
      description,
      url
    );

    if (!lessonCreated) {
      throw new Error("Failed to create module");
    }

    logger.info(
      `Lesson number ${lesson_number} of module with id ${module_id} create correctly`
    );
    return res.status(201).json({
      success: true,
      message: "Lesson create correctly",
    });
  } catch (error) {
    logger.error(`Error in createLessonController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllLessonsController = async (req, res) => {
  try {
    const lessons = await getLessons();

    return res.status(200).json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    logger.error(`Error in getAllLessonsController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

export const deleteLessonController = async (req, res) => {
  const { id } = req.params;

  try {
    const check = await checkExist("lessons", "id", null, id);

    if (!check) {
      return res.status(409).json({
        success: false,
        message: "Lesson not exist",
      });
    }

    const response = await deleteLesson(id);

    if (response.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Lesson with ID ${id} not found` });
    }

    logger.info(`Lesson with ID ${id} deleted successfully`);
    return res.status(200).json({
      success: true,
      data: `Lesson with ID ${id} deleted successfully`,
    });
  } catch (error) {
    logger.error(`Error in deleteLessonController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

export const getLessonsByModuleIdAndCourseIdController = async (req, res) => {
  const module_id = req.query.module_id;
  const course_id = req.query.course_id;

  try {
    const response = await getLessonsByModuleIdAndCourseId(
      module_id,
      course_id
    );

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    logger.error(
      `Error in getLessonsByModuleIdAndCourseIdController. ERROR: ${error.message}`,
      {
        stack: error.stack,
      }
    );
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

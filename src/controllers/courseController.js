import {
  createCourse,
  getCourses,
  getEnrolledModules,
  createCourseModule,
  createLesson,
  getCoursesWithModules,
  deleteCourse,
  getModuleByCourseId,
  getLessons,
} from "../crud/crudCourses.js";
import { getAllEnrollmentsByStudentId } from "../crud/crudEnrollments.js";
import { checkExist } from "../utils/utils.js";

// COURSES

export const getAllCoursesController = async (req, res) => {
  try {
    const courses = await getCourses();
    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error in getAllCoursesController:", error);
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
    console.error("Error in getAllCoursesWithModulesController:", error);
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

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

    console.log("Course create correctly");
    return res.status(201).json({
      success: true,
      message: "Course create correctly successfully",
    });
  } catch (error) {
    console.error("Error in courseCreateController:", error);
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
    console.error(error);
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

    return res.status(200).json({
      success: true,
      message: `Course with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error in deleteCourseController:", error);
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

// MODULES

export const getModulesOfStudentController = async (req, res) => {
  const { student_id, course_id } = req.body;

  try {
    const modulesOfStudent = await getEnrolledModules(student_id, course_id);

    return res.status(200).json({
      success: true,
      data: modulesOfStudent,
    });
  } catch (error) {
    console.error("Error in getAllCoursesController:", error);
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

export const getModuleByCourseIdController = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const response = await getModuleByCourseId(id);

    return res.status(200).json({
      success: true,
      message: response,
    });
  } catch (error) {
    console.error("Error in getModuleByCourseIdController:", error);
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

    const check = await checkExist("course_modules", "course_id", "module_number", course_id, module_number);

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

    console.log("Module create correctly");
    return res.status(201).json({
      success: true,
      message: "Module create correctly successfully",
    });
  } catch (error) {
    const errorMessage = error.message;
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: errorMessage,
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

    const check = await checkExist("lessons", "lesson_number", null, lesson_number);

    if (check) {
      return res.status(409).json({
        success: false,
        message: "Lesson number already exist",
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

    console.log("Lesson create correctly");
    return res.status(201).json({
      success: true,
      message: "Lesson create correctly successfully",
    });
  } catch (error) {
    console.log(error)
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
    console.error("Error in getAllLessonsController:", error);
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
}

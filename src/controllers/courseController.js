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
    console.error("Error in getAllCoursesWithModulesController:", error);
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

    console.log(course_id, student_id);

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
      console.error(
        "Error in getCoursesWithModulesAndLessonsFilteredByCourseAndStudentIdController:",
        error
      );
      return res.status(500).json({
        success: false,
        errorMessage: "Internal server error",
        error: error.message,
      });
    }
  };

export const getDataCoursesCompleteByStudentIdController = async (req, res) => {
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
  const student_id = req.query.student_id;
  const course_id = req.query.course_id;

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

    return res.status(200).json({
      success: true,
      data: `Module with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error in deleteModuleController:", error);
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

    console.log("Lesson create correctly");
    return res.status(201).json({
      success: true,
      message: "Lesson create correctly successfully",
    });
  } catch (error) {
    console.log(error);
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

    return res.status(200).json({
      success: true,
      data: `Lesson with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error in deleteLessonController:", error);
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
    console.error("Error in getLessonsByModuleIdAndCourseIdController:", error);
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

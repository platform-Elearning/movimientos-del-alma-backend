import {
  createCourse,
  getAllEnrollmentsByStudentId,
  getCourses,
  getEnrolledModules,
  createCourseModule,
  createLesson,
  getCoursesWithModules
} from "../crud/crudCourses.js";


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
}

export const createCourseController = async (req, res) => {
  const {
    name,
    description
  } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  try {
    const courseCreated = await createCourse(
      name,
      description
    );

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
      error: error,
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
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

// LESSONS

export const createLessonController = async (req, res) => {
  const { module_id, lesson_number, title, description, url } = req.body;
  console.log("el controller entra");
  if (!module_id || !lesson_number || !title || !description  || !url) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  try {
    console.log("el try si entra");
    const lessonCreated = await createLesson(
      module_id,
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
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

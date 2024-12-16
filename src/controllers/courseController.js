import {
  createCourse,
  getAllEnrollmentsByStudentId,
  getEnrollment,
  registerToCourse,
  getCourses,
  getModulesForStudent,
  createCourseModule,
} from "../crud/crudCourses.js";
import { getStudentWithDni } from "../crud/crudUsers.js";
import { pool } from "../db/configPG.js";

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

export const createCourseController = async (req, res) => {
  const {
    name,
    duration_months,
    quantity_lessons,
    quantity_videos,
    enrollment_fee,
    enrollment_fee_usd,
    monthly_fee,
    monthly_fee_usd,
  } = req.body;

  if (
    !name ||
    !duration_months ||
    !quantity_lessons ||
    !quantity_videos ||
    !enrollment_fee ||
    !enrollment_fee_usd ||
    !monthly_fee ||
    !monthly_fee_usd
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  try {
    const courseCreated = await createCourse(
      name,
      duration_months,
      quantity_lessons,
      quantity_videos,
      enrollment_fee,
      enrollment_fee_usd,
      monthly_fee,
      monthly_fee_usd
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
    const modulesOfStudent = await getModulesForStudent(
      student_id,
      course_id
    );

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
  const { course_id, module_number, name, description, duration } = req.body;

  if (
    !course_id ||
    !module_number ||
    !name ||
    !description ||
    !duration 
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  try {
    const moduleCreated = await createCourseModule(course_id, module_number, name, description, duration);

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

// ENROLLMENT

export const createEnrollmentToCourseController = async (req, res) => {
  const { dni, course_id, modules_covered, notes } = req.body;

  if (!dni || !course_id || !modules_covered) {
    return res.status(400).json({
      success: false,
      errorMessage: "DNI, course_id, and modules_covered are required",
    });
  }

  try {
    const student_id = await getStudentWithDni(dni);
    if (!student_id) {
      return res.status(404).json({
        success: false,
        errorMessage: "Student with the provided DNI does not exist.",
      });
    }

    const enrollment = await getEnrollment(student_id, course_id);

    if (enrollment) {
      const currentModules = enrollment.modules_covered;
      const maxModules = 12;

      if (currentModules + modules_covered > maxModules) {
        const remainingModules = maxModules - currentModules;
        return res.status(400).json({
          success: false,
          errorMessage: `The maximum number of modules is ${maxModules}. You can add up to ${remainingModules} more module(s).`,
        });
      }

      const updatedModules = enrollment.modules_covered + modules_covered;

      await pool.query(
        `
        UPDATE enrollments
        SET modules_covered = $1, notes = $2
        WHERE student_id = $3 AND course_id = $4
        `,
        [updatedModules, notes || "No se dejan notas", student_id, course_id]
      );

      return res.status(200).json({
        success: true,
        message: "Enrollment updated successfully.",
      });
    }

    const courseExists = await pool.query(
      "SELECT 1 FROM courses WHERE id = $1 LIMIT 1",
      [course_id]
    );

    if (courseExists.rowCount === 0) {
      return res.status(404).json({
        success: false,
        errorMessage: `Course with ID ${course_id} does not exist.`,
      });
    }

    const registrationSuccess = await registerToCourse(
      student_id,
      course_id,
      modules_covered,
      notes || "No se dejan notas"
    );

    if (!registrationSuccess) {
      throw new Error("Failed to register the student to the course.");
    }

    return res.status(201).json({
      success: true,
      message: "Student enrolled in the course successfully.",
    });
  } catch (error) {
    console.error("Error in enrollmentToCourseController:", error);

    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error.",
      error: error.message || error,
    });
  }
};

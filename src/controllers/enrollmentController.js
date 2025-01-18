import { registerToCourse } from "../crud/crudCourses.js";
import { getEnrollment } from "../crud/crudEnrollments.js";
import { getStudentWithDni } from "../crud/crudUsers.js";
import { pool } from "../db/configPG.js";

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



import {
  addCourse,
  checkEnrollment,
  registerToCourse,
} from "../crud/crudCourses.js";

export const courseCreateController = async (req, res) => {
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
    (!name,
    !duration_months,
    !quantity_lessons,
    !quantity_videos,
    !enrollment_fee,
    !enrollment_fee_usd,
    !monthly_fee,
    !monthly_fee_usd)
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  try {
    const courseCreated = await addCourse(
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

export const enrollmentToCourseController = async (req, res) => {
  const { student_id, course_id, enrollment_status, notes } = req.body;

  
  const check = await checkEnrollment(student_id, course_id);

  if (check) {
    throw new Error("This user is already enrollment to this course");
  }

  try {
    const register = await registerToCourse(
      student_id,
      course_id,
      enrollment_status,
      notes
    );

    if (!register) {
      throw new Error("Failed to register to course");
    }

    console.log("Register user in course with success");

    return res.status(201).json({
      success: true,
      message: "Register to course successfully",
    });
  } catch (error) {
    console.error("Error in enrollmentToCourseController:", error);

    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

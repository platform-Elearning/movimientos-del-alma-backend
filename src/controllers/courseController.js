import { addCourse } from "../crud/crudCourses.js";
//import { pool } from "../db/configPG.js";
import { generateRandomId } from "../utils/utils.js";

export const courseCreateController = async (req, res) => {
  const {
    name,
    duration_months,
    quantity_lessons,
    quantity_videos,
    enrollment_fee,
    enrollment_fee_USD,
    monthly_fee,
    monthly_fee_USD,
  } = req.body;

  if (
    (!name,
    !duration_months,
    !quantity_lessons,
    !quantity_videos,
    !enrollment_fee,
    !enrollment_fee_USD,
    !monthly_fee,
    !monthly_fee_USD)
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  const id = generateRandomId();
 
  try {
    
    const courseCreated = await addCourse(
      id,
      name,
      duration_months,
      quantity_lessons,
      quantity_videos,
      enrollment_fee,
      enrollment_fee_USD,
      monthly_fee,
      monthly_fee_USD,
    );

    
    if (!courseCreated) {
      throw new Error("Failed to create course");
    }

    console.log("Course create correctly");
  } catch (error) {
    console.error("Error in courseCreateController:", error);
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

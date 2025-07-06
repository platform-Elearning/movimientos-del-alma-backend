import { createReport, getReports } from "../crud/crudReport.js";
import { checkExist } from "../utils/utils.js";

export const createReportController = async (req, res) => {
  const { user_id, description } = req.body;

  if (!user_id || !description) {
    return res.status(400).json({
      success: false,
      error: "Mandatory data missing: user_id and description",
    });
  }

  try {
    const userExists = await checkExist("users", "id", null, user_id);

    if (!userExists) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const reportCreated = await createReport(user_id, description);

    if (!reportCreated) {
      throw new Error("Failed to create report");
    }

    console.log(`Report created by user ${user_id} correctly`);
    return res.status(201).json({
      message: "Report created correctly",
      data: reportCreated,
    });
  } catch (error) {
    console.error(`Error in createReportController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

export const getReportsController = async (req, res) => {
  try {
    const dataReports = await getReports();

    if (!dataReports) {
      throw new Error("Failed to retrieve reports");
    }

    console.log(dataReports);
    console.log(`Reports retrieved successfully`);
    return res.status(200).json({
      message: "Reports retrieved successfully",
      data: dataReports,
    });
  } catch (error) {
    console.error(`Error in getReportsController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

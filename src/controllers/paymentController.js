import { pool } from "../db/configPG";

export const createMethodPaymentController = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  try {
    const check = await checkMethodPaymentExist(name);

    if (check) {
      throw new Error("Method payment already exist");
    }

    const methodCreated = await createMethodPayment(name, description);

    if (!methodCreated) {
        throw new Error("Failed to create method payment");
      }

      return res.status(201).json({
        success: true,
        message: " Method payment created successfully",
        name: methodCreated.name,
      });

  } catch (error) {
    console.error("Error in studentCreateController:", error);

    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.mesage || error,
    });
  }
};

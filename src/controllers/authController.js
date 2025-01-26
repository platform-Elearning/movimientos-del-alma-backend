import { readLoginData, changePassword } from "../crud/crudUsers.js";
import { authFunc } from "../passwordStrategy/passwordStrategy.js";
import { settings } from "../settings/settings.js";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const loginController = async (req, res) => {
  const secretKey = settings.jwt.secretKey;
  const { email, password } = req.body;

  try {
    const userData = await readLoginData(email);

    const isValidated = await authFunc.authLogin(password, userData.password);
    if (!isValidated) {
      return res.status(401).send("Invalid Credentials");
    }

    const token = jwt.sign(
      {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    logger.info(`Loggin with success with EMAIL: ${email}`);
    res.json({ token });
  } catch (error) {
    logger.error(`Error in loginController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    res.status(401).send("Error in login controller");
    return error.message;
  }
};

export const changePasswordController = async (req, res) => {
  const { email, password, newPassword1, newPassword2 } = req.body;

  if (newPassword1 !== newPassword2) {
    logger.warn(
      "Error: The new password fields do not match on changePasswordController"
    );
    return res.status(400).json({
      success: false,
      errorMessage: "The new password must be the same in both fields.",
    });
  }

  const hashedPassword = authFunc.hashPassword(newPassword1);

  try {
    const userData = await readLoginData(email);
    const isValidated = await authFunc.authLogin(password, userData.password);
    if (!isValidated) {
      logger.warn(
        "Invalid current password, please try again. on changePasswordController"
      );
      return res.status(401).json({
        success: false,
        errorMessage: "Invalid current password, please try again.",
      });
    }

    const response = await changePassword(hashedPassword, email);

    if (response == "UPDATE") {
      return res.status(200).json({
        success: true,
        message: "The password has been updated",
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    logger.error(`Error in changePassword. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

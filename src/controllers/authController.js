import { readUserData } from "../crud/crudUsers.js";
import { authFunc } from "../passwordStrategy/passwordStrategy.js";
import { settings } from "../settings/settings.js";
import jwt from "jsonwebtoken";

export const loginController = async (req, res) => {
  const secretKey = settings.jwt.secretKey;
  const { email, password } = req.body;
  try {
    const userData = await readUserData(email);

    const isValidated = await authFunc.authLogin(password, userData.password);
    if (!isValidated) {
      return res.status(401).send("Invalid Credentials");
    }

    const token = jwt.sign(
      {
        id: userData.id,
        email: userData.email,
        role: userData.role,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    console.log("ERROR request - /login", error);
    res.status(401).send("Error in login controller");
  }
};

export const changePasswordController = async (req, res) => {
  const { email, password, newPassword1, newPassword2 } = req.body;

  if (newPassword1 !== newPassword2) {
    console.log("Error: The new password fields do not match.");
    return res.status(400).json({
      success: false,
      errorMessage: "The new password must be the same in both fields.",
    });
  }

  const hashedPassword = authFunc.hashPassword(newPassword1);

  try {
    const userData = await readUserData(email);
    const isValidated = await authFunc.authLogin(password, userData.password);
    if (!isValidated) {
      console.log("Invalid current password, please try again.");
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
    console.log("Error in changePassword", error);
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};
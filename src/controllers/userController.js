import {
  changePassword,
  checkUserExist,
  createStudent,
  createUser,
  getUserAndPassword,
} from "../crud/crudUsers.js";
import { pool } from "../db/configPG.js";
import { authFunc } from "../passwordStrategy/passwordStrategy.js";
import { settings } from "../settings/settings.js";
import jwt from "jsonwebtoken";
import { generateUserId, randomPassword } from "../utils/utils.js";

export const studentCreateController = async (req, res) => {
  const id = generateUserId();
  const randomPW = randomPassword();
  const role = "student";
  const hashedPassword = authFunc.hashPassword(randomPW);

  const { identificationNumber, name, lastname, nationality, email } = req.body;

  if ((!identificationNumber || !name || !lastname || !nationality, !email)) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  try {
    const check = await checkUserExist(email);

    if (check) {
      throw new Error("User already exist");
    }

    await pool.query("BEGIN");

    const userCreated = await createUser(id, email, hashedPassword, role);

    if (!userCreated) {
      throw new Error("Failed to create user");
    }

    const studentCreated = await createStudent(
      id,
      identificationNumber,
      name,
      lastname,
      nationality,
      email
    );

    if (!studentCreated) {
      throw new Error("Failed to create student");
    }

    await pool.query("COMMIT");

    console.log("Student create correctly");
    console.log(randomPW);
    return res.status(201).json({
      success: true,
      message: "Student and user created successfully",
      userId: id,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error in studentCreateController:", error);

    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

export const loginController = async (req, res) => {
  const secretKey = settings.jwt.secretKey;
  const { email, password } = req.body;
  try {
    const userData = await getUserAndPassword(email);

    const isValidated = await authFunc.authLogin(password, userData.password);
    if (!isValidated) {
      return res.status(401).send("Invalid Credentials");
    }

    const token = jwt.sign(
      {
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

  const hashedPassword = authFunc.hashPassword(newPassword1)

  try {
    const userData = await getUserAndPassword(email);
    const isValidated = await authFunc.authLogin(password, userData.password);
    if (!isValidated) {
      console.log("Invalid current password, please try again.")
      return res.status(401).json({
        success: false,
        errorMessage: "Invalid current password, please try again.",
      });
    }

    const response = await changePassword(hashedPassword, email)

    if (response == 'UPDATE') {
      return res.status(200).json({
        success: true,
        message: "The password has been updated",
      });
    } else {
      throw new Error("User not found")
    }

  } catch (error) {
    console.log("Error in changePassword", error)
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

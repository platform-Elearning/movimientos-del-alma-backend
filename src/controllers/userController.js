import {
  checkUserExist,
  createStudent,
  createTeacher,
  createUser,
} from "../crud/crudUsers.js";
import { pool } from "../db/configPG.js";
import { authFunc } from "../passwordStrategy/passwordStrategy.js";
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

export const teacherCreateController = async (req, res) => {
  const id = generateUserId();
  const randomPW = randomPassword();
  const role = "teacher";
  const hashedPassword = authFunc.hashPassword(randomPW);

  const { name, lastname, email, dni } = req.body;

  if ((!name, !lastname, !email, !dni)) {
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

    const teacherCreated = await createTeacher(id, name, lastname, email, dni);

    if (!teacherCreated) {
      throw new Error("Failed to create teacher");
    }

    await pool.query("COMMIT");

    console.log("Teacher create correctly");
    console.log(randomPW);

    return res.status(201).json({
      success: true,
      message: "Teacher and user created successfully",
      userId: id,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error in teacherCreateController:", error);
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

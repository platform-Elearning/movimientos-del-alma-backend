import { createStudent, createUser, getUserAndPassword } from "../crud/crudUsers.js";
import { pool } from "../db/configPG.js";
import { authFunc } from "../passwordStrategy/passwordStrategy.js";
import { settings } from "../settings/settings.js";
import jwt from "jsonwebtoken";

const secretKey = settings.jwt.secretKey;

// import { generateUserId } from "../utils/utils.js";

export const studentCreateController = async (req, res) => {
  const {
    identificationNumber,
    name,
    lastname,
    nationality,
    email,
    username,
    password,
  } = req.body;

  if (
    (!identificationNumber || !name || !lastname || !nationality,
    !email || !username || !password)
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  const id = "kjk1";
  const role = "student";
  const hashedPassword = authFunc.hashPassword(password);

  try {
    await pool.query("BEGIN");

    const userCreated = await createUser(id, username, hashedPassword, role);

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
    return res.status(201).json({
      success: true,
      message: "Student and user created successfully",
      userId: id,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error in studentCreateController:", error);

    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // OBTENGO USERNAME Y PW
    const userData = await getUserAndPassword(username);
    console.log(userData.password, password)

    // OBTENGO TRUE O FLASE
    const isValidated = await authFunc.authLogin(password, userData.password);
    if (!isValidated) {
      return res.status(401).send("Invalid Credentials");
    }

    const token = jwt.sign(
      {
        username: userData.username,
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



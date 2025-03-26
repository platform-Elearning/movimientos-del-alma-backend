//import sendWelcomeSms from "../contact/twilio.js";
import {
  createStudent,
  createTeacher,
  createUser,
  deleteStudent,
  deleteTeacher,
  deleteUser,
  getAllStudents,
  getStudentData,
  getStudentsWithCourses,
  getTeacher,
  updateStudent,
  updateUser,
} from "../crud/crudUsers.js";
import { pool } from "../db/configPG.js";
import { authFunc } from "../passwordStrategy/passwordStrategy.js";
import {
  checkExist,
  generateRandomId,
  randomPassword,
} from "../utils/utils.js";
import logger from "../utils/logger.js";
// USERS
export const test = async () => {};

export const createAdminController = async (req, res) => {
  const { id, email, password } = req.body;

  if ((!id, !email, !password)) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  const role = "admin";
  const hashedPassword = authFunc.hashPassword(password);

  try {
    const check = await checkExist("users", "email", null, email);

    if (check) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    await pool.query("BEGIN");

    const userCreated = await createUser(id, email, hashedPassword, role);

    if (!userCreated) {
      throw new Error("Failed to create ADMIN");
    }

    await pool.query("COMMIT");

    logger.info(`Admin create successfully with ID: ${id}`);

    //await sendWelcomeSms(email, password); TWILIO

    return res.status(201).json({
      success: true,
      message: "ADMIN created successfully",
      adminID: id,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    logger.error(`Error in createAdminController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

export const getUserController = async (req, res) => {
  const { id } = req.headers;

  if (!id) {
    return res.status(400).json({
      success: false,
      errorMessage: "ID is required in the headers",
    });
  }

  try {
    const response = await getStudentData(id);

    if (!response) {
      throw new Error("Student not found");
    }

    return res.status(200).json({
      dni: response.identification_number,
      name: response.name,
      lastname: response.lastname,
      email: response.email,
      nationality: response.nationality,
      identification_number: response.identification_number,
    });
  } catch (error) {
    logger.error(`Error in getUserController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllUsersWithCoursesController = async (req, res) => {
  try {
    const response = await getStudentsWithCourses();
    return res.status(200).json({
      response,
    });
  } catch (error) {
    logger.error(
      `Error in getAllUsersWithCoursesController. ERROR: ${error.message}`,
      {
        stack: error.stack,
      }
    );
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

export const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
    const check = await checkExist("users", "id", null, id);

    if (!check) {
      return res.status(409).json({
        success: false,
        message: "User not exist",
      });
    }

    const response = await deleteUser(id);

    if (response.rowCount === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }

    logger.info(`User with ID: ${id} delete successfully`);
    return res.status(200).json({
      success: true,
      data: `User with ID ${id} deleted successfully`,
    });
  } catch (error) {
    logger.error(`Error in deleteUserController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

export const updateUserController = async (req, res) => {
  const { user_id, email, identification_number, name, lastname, nationality } =
    req.body;

  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const check = await checkExist("users", "id", null, user_id);

    if (!check) {
      return res.status(409).json({
        success: false,
        message: "User not exist",
      });
    }

    const updateUserResult = await updateUser(user_id || null, email || null);

    if (updateUserResult.rowCount === 0) {
      return res.status(200).json({
        success: true,
        message: "No fields were updated in the users table.",
      });
    }

    const updateStudentResult = await updateStudent(
      user_id || null,
      identification_number || null,
      name || null,
      lastname || null,
      nationality || null,
      email || null
    );

    if (updateStudentResult.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Error to create User with Id ${user_id}` });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
    });
  }
};

// TEACHER

export const createTeacherController = async (req, res) => {
  const id = generateRandomId();
  const randomPW = randomPassword();
  const role = "teacher";
  const hashedPassword = authFunc.hashPassword(randomPW);

  const { name, lastname, identification_number, email } = req.body;

  if (!name || !lastname || !identification_number || !email) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  try {
    const check = await checkExist("users", "email", null, email);

    if (check) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    await pool.query("BEGIN");

    const userCreated = await createUser(id, email, hashedPassword, role);

    if (!userCreated) {
      throw new Error("Failed to create user");
    }

    const teacherCreated = await createTeacher(
      id,
      name,
      lastname,
      identification_number,
      email
    );

    if (!teacherCreated) {
      throw new Error("Failed to create teacher");
    }

    await pool.query("COMMIT");

    logger.info(`Teacher create with success, ID: ${id}`);

    return res.status(201).json({
      success: true,
      message: "Teacher and user created successfully",
      userId: id,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    logger.error(`Error in teacherCreateController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

export const getAllTeachersController = async (req, res) => {
  try {
    const response = await getAllTeachers();

    if (!response || response.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No teachers found",
      });
    }

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    logger.error(`Error in getAllTeachersController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteTeacherController = async (req, res) => {
  const { id } = req.params;

  try {
    const check = await checkExist("teacher", "id", null, id);

    if (!check) {
      return res.status(409).json({
        success: false,
        message: "Teacher not exist",
      });
    }

    const response = await deleteTeacher(id);

    if (response.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Teacher with ID ${id} not found` });
    }

    const userDeletionResult = await deleteUser(id);

    if (userDeletionResult.rowCount === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }

    logger.info(`Teacher with ID ${id} deleted successfully`);
    return res.status(200).json({
      success: true,
      data: `Teacher with ID ${id} deleted successfully`,
    });
  } catch (error) {
    logger.error(`Error in deleteTeacherController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

// STUDENT

export const getAllStudentsController = async (req, res) => {
  try {
    const response = await getAllStudents();

    return res.status(200).json({
      response,
    });
  } catch (error) {
    logger.error(`Error in getAllStudentsController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error,
    });
  }
};

export const createStudentController = async (req, res) => {
  const { identification_number, name, lastname, nationality, email } =
    req.body;

  if ((!name || !lastname || !identification_number || !nationality, !email)) {
    return res
      .status(400)
      .json({ success: false, error: "Mandatory data missing" });
  }

  const id = generateRandomId();
  const role = "student";
  const hashedPassword = authFunc.hashPassword(identification_number);

  try {
    const check = await checkExist("users", "email", null, email);

    const checkIdentification = await checkExist(
      "student",
      "identification_number",
      null,
      identification_number
    );

    if (check || checkIdentification) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    await pool.query("BEGIN");

    const userCreated = await createUser(id, email, hashedPassword, role);

    if (!userCreated) {
      throw new Error("Failed to create user");
    }

    const studentCreated = await createStudent(
      id,
      identification_number,
      name,
      lastname,
      nationality,
      email
    );

    if (!studentCreated) {
      throw new Error("Failed to create student");
    }

    await pool.query("COMMIT");

    logger.info(`Student create correctly with ID: ${id}`);
    return res.status(201).json({
      success: true,
      message: "Student and user created successfully",
      userId: id,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    logger.error(`Error in createStudentController. ERROR: ${error.message}`, {
      stack: error.stack,
    });

    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.mesage || error,
    });
  }
};

export const deleteStudentController = async (req, res) => {
  const { id } = req.params;

  try {
    const check = await checkExist("student", "id", null, id);

    if (!check) {
      return res.status(409).json({
        success: false,
        message: "Student not exist",
      });
    }

    const response = await deleteStudent(id);

    if (response.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Student with ID ${id} not found` });
    }

    const userDeletionResult = await deleteUser(id);

    if (userDeletionResult.rowCount === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }

    logger.info(`Student with ID ${id} deleted successfully`);
    return res.status(200).json({
      success: true,
      data: `Student with ID ${id} deleted successfully`,
    });
  } catch (error) {
    logger.error(`Error in deleteStudentController. ERROR: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      errorMessage: "Internal server error",
      error: error.message,
    });
  }
};

import { Router } from "express";
import {
  createAdminController,
  createStudentController,
  createTeacherController,
  deleteStudentController,
  deleteTeacherController,
  deleteUserController,
  getAllStudentsController,
  getAllUsersWithCoursesController,
  getAllTeachersController,
  getUserController,
  updateUserController,
  updateTeacherController,
  getStudentsByCourseIdController,
} from "../controllers/userController.js";
import {
  loginController,
  changePasswordController,
} from "../controllers/authController.js";
import {
  adminAuthMiddleware,
  authenticateToken,
  isAdmin,
  isTeacher,
} from "../auth/auth.js";

const routerUsers = Router();
// ROUTER STUDENTS //
routerUsers
  .route("/createCompleteStudent")
  .post(authenticateToken, isAdmin, createStudentController);

routerUsers
  .route("/getStudentById")
  .get(authenticateToken, isAdmin, getUserController);

routerUsers
  .route("/getAllStudents")
  .get(authenticateToken, isAdmin, getAllStudentsController);

routerUsers
  .route("/getStudentsWithCourses")
  .get(authenticateToken, isAdmin, getAllUsersWithCoursesController);

routerUsers
  .route("/deleteStudent/:id")
  .delete(authenticateToken, isAdmin, deleteStudentController);

routerUsers
  .route("/updateStudent")
  .put(authenticateToken, isAdmin, updateUserController);

routerUsers
  .route("/getStudentsByCourseId")
  .get(authenticateToken, isTeacher, getStudentsByCourseIdController);

// ROUTER TEACHERS //

routerUsers
  .route("/createCompleteTeacher")
  .post(authenticateToken, isAdmin, createTeacherController);

routerUsers
  .route("/getAllTeachers")
  .get(authenticateToken, isAdmin, getAllTeachersController);

routerUsers
  .route("/deleteTeacher/:id")
  .delete(authenticateToken, isAdmin, deleteTeacherController);

routerUsers
  .route("/updateTeacher")
  .put(authenticateToken, isAdmin, updateTeacherController);

// ROUTE FOR LOGIN
routerUsers.route("/login").post(loginController);

// ROUTE FOR CHANGE PASSWORD
routerUsers
  .route("/changePassword")
  .post(authenticateToken, changePasswordController);

// ROUTE FOR CREATE ADMIN
routerUsers
  .route("/createAdmin")
  .post(adminAuthMiddleware, createAdminController);

// ROUTE FOR DELETE USER
routerUsers
  .route("/deleteUser/:id")
  .delete(authenticateToken, isAdmin, deleteUserController);

export default routerUsers;

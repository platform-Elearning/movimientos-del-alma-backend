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
} from "../controllers/userController.js";
import {
  loginController,
  changePasswordController,
} from "../controllers/authController.js";

const routerUsers = Router();
// ROUTER STUDENTS //
routerUsers.route("/createCompleteStudent").post(createStudentController);

routerUsers.route("/getStudentById").get(getUserController);

routerUsers.route("/getAllStudents").get(getAllStudentsController);

routerUsers
  .route("/getStudentsWithCourses")
  .get(getAllUsersWithCoursesController);

routerUsers.route("/deleteStudent/:id").delete(deleteStudentController);

routerUsers.route("/updateStudent").put(updateUserController);

// ROUTER TEACHERS //

routerUsers.route("/createCompleteTeacher").post(createTeacherController);

routerUsers.route("/getAllTeachers").get(getAllTeachersController);

routerUsers.route("/deleteTeacher/:id").delete(deleteTeacherController);

routerUsers.route("/updateTeacher").put(updateTeacherController);



// ROUTE FOR LOGIN
routerUsers.route("/login").post(loginController);

// ROUTE FOR CHANGE PASSWORD
routerUsers.route("/changePassword").post(changePasswordController);

// ROUTE FOR CREATE ADMIN
routerUsers.route("/createAdmin").post(createAdminController);

// ROUTE FOR DELETE USER
routerUsers.route("/deleteUser/:id").delete(deleteUserController);

export default routerUsers;

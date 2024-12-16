import { Router } from "express";
import { createAdminController, createStudentController, createTeacherController, getAllStudentsController, getAllUsersWithCoursesController, getUserController } from "../controllers/userController.js";
import { loginController, changePasswordController } from "../controllers/authController.js";

const routerUsers = Router();

// ROUTE FOR CREATE STUDENT AND USERSTUDENT
routerUsers.route("/createCompleteStudent").post(createStudentController);

//ROUTE FOR GET STUDENT
routerUsers.route("/getStudentById").get(getUserController);

// ROUTE FOR GET ALL STUDENTS
routerUsers.route("/getAllStudents").get(getAllStudentsController);

// ROUTE FOR CREATE TEACHER AND USERTEACHER
routerUsers.route("/createCompleteTeacher").post(createTeacherController);

// ROUTE FOR LOGIN
routerUsers.route("/login").post(loginController);

// ROUTE FOR CHANGE PASSWORD
routerUsers.route("/changePassword").post(changePasswordController);

// ROUTE FOR CREATE ADMIN
routerUsers.route("/createAdmin").post(createAdminController);

// ROUTER FOR GET STUDENT WITH COURSES ASIGNED"
routerUsers.route("/getStudentsWithCourses").get(getAllUsersWithCoursesController);

export default routerUsers;

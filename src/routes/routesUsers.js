import { Router } from "express";
import { adminCreateController, studentCreateController, teacherCreateController } from "../controllers/userController.js";
import { loginController, changePasswordController } from "../controllers/authController.js";

const routerUsers = Router();

// ROUTE FOR CREATE STUDENT AND USERSTUDENT
routerUsers.route("/createCompleteStudent").post(studentCreateController);

// ROUTE FOR CREATE TEACHER AND USERTEACHER
routerUsers.route("/createCompleteTeacher").post(teacherCreateController);

// ROUTE FOR LOGIN
routerUsers.route("/login").post(loginController);

// ROUTE FOR CHANGE PASSWORD
routerUsers.route("/changePassword").post(changePasswordController);

// ROUTE FOR CREATE ADMIN
routerUsers.route("/createAdmin").post(adminCreateController);



export default routerUsers;

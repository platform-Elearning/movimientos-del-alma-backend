import { Router } from "express";
import { loginController, studentCreateController } from "../controllers/userController.js";

const routerUsers = Router();

// ROUTE FOR CREATE STUDENT AND USERSTUDENT
routerUsers.route("/createCompleteStudent").post(studentCreateController);

// ROUTE FOR LOGIN
routerUsers.route("/login").post(loginController);


export default routerUsers;

import { Router } from "express";
import { courseCreateController } from "../controllers/courseController.js";

const routerCourses = Router();

// ROUTE FOR CREATE COURSE
routerCourses.route("/createCourse").post(courseCreateController);

export default routerCourses;
import { Router } from "express";
import { courseCreateController, enrollmentToCourseController } from "../controllers/courseController.js";

const routerCourses = Router();

// ROUTE FOR CREATE COURSE
routerCourses.route("/createCourse").post(courseCreateController);


// ROUTE FOR REGISTER TO COURSE
routerCourses.route("/registerToCourse").post(enrollmentToCourseController);

export default routerCourses;
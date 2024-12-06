import { Router } from "express";
import { courseCreateController, enrollmentToCourseController, getCoursesWithStudentIdController } from "../controllers/courseController.js";

const routerCourses = Router();

// ROUTE FOR CREATE COURSE
routerCourses.route("/createCourse").post(courseCreateController);

// ROUTE FOR REGISTER TO COURSE
routerCourses.route("/registerToCourse").post(enrollmentToCourseController);

// ROUTER FOR GET ALL COURSES WITH STUDENT_ID
routerCourses.route("/getCoursesById").get(getCoursesWithStudentIdController);

export default routerCourses;
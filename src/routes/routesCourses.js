import { Router } from "express";
import { courseCreateController, enrollmentToCourseController, getCoursesWithStudentIdController, getAllCoursesController, modulesOfStudentController } from "../controllers/courseController.js";

const routerCourses = Router();

// ROUTE FOR GET ALL COURSES
routerCourses.route("/getAllCourses").get(getAllCoursesController);

// ROUTE FOR CREATE COURSE
routerCourses.route("/createCourse").post(courseCreateController);

// ROUTE FOR REGISTER TO COURSE
routerCourses.route("/registerToCourse").post(enrollmentToCourseController);

// ROUTER FOR GET ALL COURSES WITH STUDENT_ID
routerCourses.route("/getCoursesByStudentId").get(getCoursesWithStudentIdController);

// router to get a student's modules
routerCourses.route("/getModulesOfStudent").get(modulesOfStudentController);

export default routerCourses;
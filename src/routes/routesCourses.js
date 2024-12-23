import { Router } from "express";
import { createCourseController, getCoursesWithStudentIdController, getAllCoursesController, getModulesOfStudentController, createCourseModuleController, createLessonController, getAllCoursesWithModulesController } from "../controllers/courseController.js";
import { authenticateToken } from "../auth/auth.js";

const routerCourses = Router();

// ROUTE FOR GET ALL COURSES
routerCourses.route("/getAllCourses").get(getAllCoursesController);

// ROUTE FOR GET ALL COURSES WITH MODULES
routerCourses.route("/getAllCoursesWithModules").get(getAllCoursesWithModulesController);

// ROUTE FOR CREATE COURSE
routerCourses.route("/createCourse").post(createCourseController);

// ROUTER FOR GET ALL COURSES WITH STUDENT_ID
routerCourses.route("/getCoursesByStudentId").get(getCoursesWithStudentIdController);

// router to create module
routerCourses.route("/createCourseModule").post(createCourseModuleController);

// router to get a student's modules
routerCourses.route("/getModulesOfStudent").get(getModulesOfStudentController);

// router to create lesson
routerCourses.route("/createLesson").post(createLessonController);

export default routerCourses;
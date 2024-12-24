import { Router } from "express";
import { createCourseController, getCoursesWithStudentIdController, getAllCoursesController, getModulesOfStudentController, createCourseModuleController, createLessonController, getAllCoursesWithModulesController, deleteCourseController, getModuleByCourseIdController } from "../controllers/courseController.js";
import { authenticateToken } from "../auth/auth.js";

const routerCourses = Router();

/// COURSES ///

// ROUTE FOR GET ALL COURSES
routerCourses.route("/getAllCourses").get(getAllCoursesController);

// ROUTE FOR GET ALL COURSES WITH MODULES
routerCourses.route("/getAllCoursesWithModules").get(getAllCoursesWithModulesController);

// ROUTE FOR CREATE COURSE
routerCourses.route("/createCourse").post(createCourseController);

//router for delete course
routerCourses.route("/deleteCourse").post(deleteCourseController);

// ROUTER FOR GET ALL COURSES WITH STUDENT_ID
routerCourses.route("/getCoursesByStudentId").get(getCoursesWithStudentIdController);

/// MODULES ///

// router to create module
routerCourses.route("/createCourseModule").post(createCourseModuleController);

// router to get a student's modules
routerCourses.route("/getModulesOfStudent").get(getModulesOfStudentController);

// router to get modules by course id
routerCourses.route("/getModulesByCourseId").get(getModuleByCourseIdController);

/// LESSONS ///

// router to create lesson
routerCourses.route("/createLesson").post(createLessonController);

export default routerCourses;
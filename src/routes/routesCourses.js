import { Router } from "express";
import {
  createCourseController,
  getCoursesWithStudentIdController,
  getAllCoursesController,
  getModulesOfStudentController,
  createCourseModuleController,
  createLessonController,
  getAllCoursesWithModulesController,
  deleteCourseController,
  getModuleByCourseIdController,
  getAllLessonsController,
  getAllCoursesWithModulesAndLessonsController,
  deleteLessonController,
  deleteModuleController,
} from "../controllers/courseController.js";
import { authenticateToken } from "../auth/auth.js";

const routerCourses = Router();

/// COURSES ///

routerCourses.route("/getAllCourses").get(getAllCoursesController);

routerCourses
  .route("/getAllCoursesWithModules")
  .get(getAllCoursesWithModulesController);

routerCourses.route("/createCourse").post(createCourseController);

routerCourses.route("/deleteCourse").post(deleteCourseController);

routerCourses
  .route("/getCoursesByStudentId")
  .get(getCoursesWithStudentIdController);

routerCourses
  .route("/getAllCoursesWithModulesAndLessons")
  .get(getAllCoursesWithModulesAndLessonsController);

/// MODULES ///

routerCourses.route("/createCourseModule").post(createCourseModuleController);

routerCourses.route("/getModulesOfStudent").get(getModulesOfStudentController);

routerCourses
  .route("/getModulesByCourseId/:id")
  .get(getModuleByCourseIdController);

routerCourses.route("/deleteModule/:id").delete(deleteModuleController);

/// LESSONS ///

routerCourses.route("/createLesson").post(createLessonController);

routerCourses.route("/getLessons").get(getAllLessonsController);

routerCourses.route("/deleteLesson/:id").delete(deleteLessonController);


export default routerCourses;

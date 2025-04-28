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
  getCoursesWithModulesAndLessonsFilteredByCourseAndStudentIdController,
  getLessonsByModuleIdAndCourseIdController,
  assignCourseToTeacherController,
} from "../controllers/courseController.js";

const routerCourses = Router();

/// COURSES ///

routerCourses.route("/getAllCourses").get(getAllCoursesController);

routerCourses
  .route("/getAllCoursesWithModules")
  .get(getAllCoursesWithModulesController);

routerCourses.route("/createCourse").post(createCourseController);

routerCourses.route("/deleteCourse").delete(deleteCourseController);

routerCourses
  .route("/getCoursesByStudentId")
  .get(getCoursesWithStudentIdController);

routerCourses
  .route("/getAllCoursesWithModulesAndLessons")
  .get(getAllCoursesWithModulesAndLessonsController);

routerCourses
  .route("/getCoursesWithModulesAndLessonsFilteredByCourseAndStudentId")
  .get(getCoursesWithModulesAndLessonsFilteredByCourseAndStudentIdController);

routerCourses
  .route("/assignCourseToTeacher")
  .post(assignCourseToTeacherController);

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

routerCourses
  .route("/getLessonsByModuleIdAndCourseId")
  .get(getLessonsByModuleIdAndCourseIdController);

export default routerCourses;

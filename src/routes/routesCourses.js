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
import { authenticateToken, isAdmin, isTeacher, isStudent } from "../auth/auth.js";

const routerCourses = Router();

/// COURSES ///

routerCourses
  .route("/getAllCourses")
  .get(authenticateToken, authenticateToken, isAdmin, getAllCoursesController);

routerCourses
  .route("/getAllCoursesWithModules")
  .get(authenticateToken, isAdmin, getAllCoursesWithModulesController);

routerCourses
  .route("/createCourse")
  .post(authenticateToken, isAdmin, createCourseController);

routerCourses
  .route("/deleteCourse")
  .delete(authenticateToken, isAdmin, deleteCourseController);

routerCourses
  .route("/getCoursesByStudentId")
  .get(authenticateToken, getCoursesWithStudentIdController);

routerCourses
  .route("/getAllCoursesWithModulesAndLessons")
  .get(
    authenticateToken,
    isAdmin,
    getAllCoursesWithModulesAndLessonsController
  );

routerCourses
  .route("/getCoursesWithModulesAndLessonsFilteredByCourseAndStudentId")
  .get(
    authenticateToken,
    isStudent,
    getCoursesWithModulesAndLessonsFilteredByCourseAndStudentIdController
  );

routerCourses
  .route("/assignCourseToTeacher")
  .post(authenticateToken, isAdmin, assignCourseToTeacherController);

/// MODULES ///

routerCourses
  .route("/createCourseModule")
  .post(authenticateToken, isTeacher, createCourseModuleController);

routerCourses
  .route("/getModulesOfStudent")
  .get(authenticateToken, getModulesOfStudentController);

routerCourses
  .route("/getModulesByCourseId/:id")
  .get(authenticateToken, getModuleByCourseIdController);

routerCourses
  .route("/deleteModule/:id")
  .delete(authenticateToken, isTeacher, deleteModuleController);

/// LESSONS ///

routerCourses
  .route("/createLesson")
  .post(authenticateToken, isTeacher, createLessonController);

routerCourses
  .route("/getLessons")
  .get(authenticateToken, getAllLessonsController);

routerCourses
  .route("/deleteLesson/:id")
  .delete(authenticateToken, isTeacher, deleteLessonController);

routerCourses
  .route("/getLessonsByModuleIdAndCourseId")
  .get(authenticateToken, getLessonsByModuleIdAndCourseIdController);

export default routerCourses;

import { Router } from "express";
import {
  createEnrollmentToCourseController,
  getAllEnrollmentsByCourseIdController,
} from "../controllers/enrollmentController.js";
import { authenticateToken, isAdmin, isTeacher } from "../auth/auth.js";

const routerEnrollments = Router();

// ROUTE FOR REGISTER TO COURSE
routerEnrollments
  .route("/registerToCourse")
  .post(authenticateToken, isAdmin, createEnrollmentToCourseController);

routerEnrollments
  .route("/getAllEnrollmentsByCourseId/:course_id")
  .get(authenticateToken, isTeacher, getAllEnrollmentsByCourseIdController);

export default routerEnrollments;

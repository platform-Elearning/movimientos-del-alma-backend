import { Router } from "express";
import { createEnrollmentToCourseController } from "../controllers/enrollmentController.js";
import { authenticateToken, isAdmin } from "../auth/auth.js";

const routerEnrollments = Router();

// ROUTE FOR REGISTER TO COURSE
routerEnrollments
  .route("/registerToCourse")
  .post(authenticateToken, isAdmin, createEnrollmentToCourseController);

export default routerEnrollments;

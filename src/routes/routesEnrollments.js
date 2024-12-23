import { Router } from "express";
import { createEnrollmentToCourseController } from "../controllers/enrollmentController";

const routerEnrollments = Router();

// ROUTE FOR REGISTER TO COURSE
routerEnrollments.route("/registerToCourse").post(createEnrollmentToCourseController);

export default routerEnrollments;
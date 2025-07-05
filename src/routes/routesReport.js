import { Router } from "express";
import { createReportController } from "../controllers/reportController.js";
import { authenticateToken } from "../auth/auth.js";

const routerReport = Router();

routerReport
  .route("/create-report")
  .post(authenticateToken, createReportController);

export default routerReport;

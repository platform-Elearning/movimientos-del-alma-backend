import { Router } from "express";
import {
  createReportController,
  getReportsController,
} from "../controllers/reportController.js";
import { authenticateToken } from "../auth/auth.js";

const routerReport = Router();

routerReport
  .route("/create-report")
  .post(authenticateToken, createReportController);

routerReport.route("/get-reports").get(authenticateToken, getReportsController);

export default routerReport;

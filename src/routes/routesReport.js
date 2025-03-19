import { Router } from "express";
import { createReportController } from "../controllers/reportController.js";

const routerReport = Router();

routerReport.route("/create-report").post(createReportController);

export default routerReport;

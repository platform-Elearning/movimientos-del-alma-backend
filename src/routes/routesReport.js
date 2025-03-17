import { Router } from "express";
import { createReportController } from "../controllers/reportController.js";

const routerReport = Router();

routerReport.post(createReportController);

export default routerReport;

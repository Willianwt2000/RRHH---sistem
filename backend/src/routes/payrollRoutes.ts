import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { generatePayroll } from "../controllers/payrollController";

const payrollRouter = express.Router();

payrollRouter.post("/", authenticate, generatePayroll);

export default payrollRouter;
import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { getEmployees, softDeleteEmployee } from "../controllers/employeeController";

const employeeRouter = express.Router();

employeeRouter.get("/", authenticate, getEmployees);
employeeRouter.delete("/:id", authenticate, softDeleteEmployee);

export default employeeRouter;
import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createCargo, softDeleteCargo } from "../controllers/cargoController";

const cargoRouter = express.Router();

cargoRouter.post("/", authenticate, createCargo);
cargoRouter.delete("/:id", authenticate, softDeleteCargo);

export default cargoRouter;
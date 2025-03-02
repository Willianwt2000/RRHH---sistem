import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { getPonches, createPonche } from "../controllers/poncheController";

const poncheRouter = express.Router();

poncheRouter.get("/", authenticate, getPonches);
poncheRouter.post("/", authenticate, createPonche);

export default poncheRouter;
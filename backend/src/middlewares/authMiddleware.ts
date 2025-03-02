import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "SECRET_KEY";


declare module "express" {
  interface Request {
    user?: any; 
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ message: "Acceso no autorizado" });
    return; 
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};
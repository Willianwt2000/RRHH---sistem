import { Request, Response } from "express";
import { calculateSalary } from "../utils/payroll";

export const generatePayroll = (req: Request, res: Response) => {
  const { baseHours, extraHours, pricePerHour } = req.body;
  const payroll = calculateSalary(baseHours, extraHours, pricePerHour);
  res.status(200).json(payroll);
};
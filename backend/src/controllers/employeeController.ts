import { Request, Response } from "express";
import { listOfAccount } from "../data/data";

export const getEmployees = (req: Request, res: Response) => {
  try {
    res.status(200).json(listOfAccount);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener empleados" });
  }
};

export const softDeleteEmployee = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = listOfAccount.find((emp) => emp.id === Number(id));

    if (!employee) {
      res.status(404).json({ message: "Empleado no encontrado" });
      return; //para que la funcion termine aqui
    }

    employee.active = false; // Soft delete
    res.status(200).json({ message: "Empleado desactivado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al desactivar empleado" });
  }
};


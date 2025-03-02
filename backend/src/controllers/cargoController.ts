import { Request, Response } from "express";
import { listOfCargos } from "../data/data";

export const getCargos = (req: Request, res: Response) => {
  try {
    const activeCargos = listOfCargos.filter((cargo) => cargo.activo);
    res.status(200).json(activeCargos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener cargos" });
  }
};

export const createCargo = (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      res.status(400).json({ message: "El nombre del cargo es requerido" });
      return; 
    }

    const newCargo = {
      id: listOfCargos.length + 1,
      nombre,
      activo: true,
    };

    listOfCargos.push(newCargo);
    res.status(201).json(newCargo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear cargo" });
  }
};

export const softDeleteCargo = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cargo = listOfCargos.find((cargo) => cargo.id === Number(id));

    if (!cargo) {
      res.status(404).json({ message: "Cargo no encontrado" });
      return; 
    }

    cargo.activo = false; // Soft delete
    res.status(200).json({ message: "Cargo desactivado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al desactivar cargo" });
  }
};
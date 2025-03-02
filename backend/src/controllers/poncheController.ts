//poncheControllers
import { Request, Response } from "express";
import { listOfPonches } from "../data/data";

export const getPonches = (req: Request, res: Response) => {
  try {
    res.status(200).json(listOfPonches);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ponches" });
  }
};

export const createPonche = (req: Request, res: Response) => {
  try {
    const { empleadoId, fechaEntrada, fechaSalida } = req.body;

    if (!empleadoId || !fechaEntrada || !fechaSalida) {
      res.status(400).json({ message: "Todos los campos son requeridos" });
      return ;
    }

    const newPonche = {
      id: listOfPonches.length + 1,
      empleadoId,
      fechaEntrada,
      fechaSalida,
    };

    listOfPonches.push(newPonche);
    res.status(201).json(newPonche);
  } catch (error) {
    res.status(500).json({ message: "Error al crear ponche" });
  }
};
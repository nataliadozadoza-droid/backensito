import { Request, Response } from "express";
import * as service from "./search.service";

export const searchProfilesController = async (
  req: Request,
  res: Response
) => {
  try {
    const results = await service.searchProfiles(req.query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error en la búsqueda" });
  }
};
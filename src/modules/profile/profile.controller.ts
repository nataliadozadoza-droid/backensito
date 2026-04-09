import { Request, Response } from "express";
import * as service from "./profile.service";

// Crear perfil
export const create = async (req: Request, res: Response) => {
  try {
    const result = await service.createProfile(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating profile", error });
  }
};

// Obtener todos los perfiles
export const getAll = async (_req: Request, res: Response) => {
  try {
    const result = await service.getProfiles();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error getting profiles", error });
  }
};

// Obtener perfil por ID (CORREGIDO)
export const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const result = await service.getProfileById(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error getting profile", error });
  }
};

// Actualizar perfil (CORREGIDO)
export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const result = await service.updateProfile(id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

// Eliminar perfil (CORREGIDO)
export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const result = await service.deleteProfile(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error });
  }
};
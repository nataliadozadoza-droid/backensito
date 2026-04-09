import { Request, Response } from "express";
import * as service from "./profile.service";

// Crear perfil
export const create = async (req: Request, res: Response) => {
  try {
    const result = await service.createProfile(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el perfil", error });
  }
};

// Obtener todos los perfiles
export const getAll = async (_req: Request, res: Response) => {
  try {
    const result = await service.getProfiles();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los perfiles", error });
  }
};

// Obtener perfil por ID 
export const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const result = await service.getProfileById(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al importa el perfil", error });
  }
};

// Actualizar perfil
export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const result = await service.updateProfile(id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el perfil", error });
  }
};

// Eliminar perfil 
export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const result = await service.deleteProfile(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al borrar el perfil", error });
  }
};
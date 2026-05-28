import { Request, Response } from "express";
import * as service from "./search.service";

export const createProfileController = async (
  req: Request,
  res: Response
) => {
  try {

    const result =
      await service.createProfile(req.body);

    res.status(201).json(result);

  } catch (error: any) {

    res.status(500).json({
      error: error.message,
    });
  }
};

export const searchProfilesController = async (
  req: Request,
  res: Response
) => {
  try {

    const results =
      await service.searchProfiles(req.query);

    res.status(200).json(results);

  } catch (error: any) {

    res.status(500).json({
      error: error.message,
    });
  }
};

export const getProfileByIdController = async (
  req: Request,
  res: Response
) => {
  try {

    const result =
      await service.getProfileById(
        req.params.id as string
      );

    res.status(200).json(result);

  } catch (error: any) {

    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateProfileController = async (
  req: Request,
  res: Response
) => {
  try {

    const result =
      await service.updateProfile(
        req.params.id as string,
        req.body
      );

    res.status(200).json(result);

  } catch (error: any) {

    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteProfileController = async (
  req: Request,
  res: Response
) => {
  try {

    await service.deleteProfile(
      req.params.id as string
    );

    res.status(200).json({
      message: "Perfil eliminado",
    });

  } catch (error: any) {

    res.status(500).json({
      error: error.message,
    });
  }
};
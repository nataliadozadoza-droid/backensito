import { Request, Response } from "express";
import { UsersService } from "./users.service";

export class UsersController {

    private _UsersService = new UsersService();

    register = async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await this._UsersService.register(req.body);

            res.status(201).json(result);

        } catch (error: any) {

            res.status(500).json({
                error: error.message,
            });
        }
    };

    findAllUsers = async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await this._UsersService.findAllUsers();

            res.status(200).json(result);

        } catch (error: any) {

            res.status(500).json({
                error: error.message,
            });
        }
    };

    findById = async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await this._UsersService.findById(
                    req.params.id as string
                );

            res.status(200).json(result);

        } catch (error: any) {

            res.status(500).json({
                error: error.message,
            });
        }
    };

    update = async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await this._UsersService.update(
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

    remove = async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await this._UsersService.remove(
                    req.params.id as string
                );

            res.status(200).json(result);

        } catch (error: any) {

            res.status(500).json({
                error: error.message,
            });
        }
    };
}
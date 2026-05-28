import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

export class AuthController {

    private service = new AuthService();

    register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const result = await this.service.register(req.body);

            res.status(201).json(result);

        } catch (error) {
            next(error);
        }
    };

    login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const result = await this.service.login(req.body);

            res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    };

    findAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const users = await this.service.findAll();

            res.status(200).json(users);

        } catch (error) {
            next(error);
        }
    };

    findById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const user = await this.service.findById(
                req.params.id as string
            );

            res.status(200).json(user);

        } catch (error) {
            next(error);
        }
    };

    update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const user = await this.service.update(
                req.params.id as string,
                req.body
            );

            res.status(200).json(user);

        } catch (error) {
            next(error);
        }
    };

    remove = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const result = await this.service.remove(
                req.params.id as string
            );

            res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    };
}
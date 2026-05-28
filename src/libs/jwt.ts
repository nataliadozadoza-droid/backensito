import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}

export const signToken = (
    payload: JwtPayload
): string => {

    return jwt.sign(
        payload,
        env.jwtSecret as string,
        {
            expiresIn: "1d",
        }
    );
};

export const verifyToken = (
    token: string
): JwtPayload => {

    return jwt.verify(
        token,
        env.jwtSecret as string
    ) as JwtPayload;
};

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Token requerido",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token inválido",
            });
        }

        const decoded = verifyToken(token);

        (req as any).user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Token inválido",
        });
    }
};
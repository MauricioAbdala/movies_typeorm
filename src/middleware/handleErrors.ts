import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import AppError from "../errors/App.error";

export const handleErrors = (err: unknown, req: Request, res: Response, next: NextFunction): Response => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    };

    if (err instanceof z.ZodError) {
        return res.status(400).json({message: err.flatten().fieldErrors});
    };

    console.log(err);
    return res.status(500).json({ message: 'Internal server Error.' });
};

import { NextFunction, Request, Response } from "express";
import { movieRepo } from "../repositories";
import AppError from "../errors/App.error";

export const verifyNameExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const name: string = req.body.name;

    if (!name) return next();

    const movieExists: boolean = await movieRepo.exist({ where: { name } });

    if (movieExists) throw new AppError("Movie already exists.", 409);

    return next();
};

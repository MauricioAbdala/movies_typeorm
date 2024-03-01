import { NextFunction, Request, Response } from "express";
import { Movie } from "../entities";
import { movieRepo } from "../repositories";
import AppError from "../errors/App.error";

export const verifyIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const verifyId: Movie | null = await movieRepo.findOneBy({ id: Number(req.params.movieId) });

    if (!verifyId) {
        throw new AppError("Movie not found", 404);
    };

    res.locals = { ...res.locals, verifyId };

    return next();
};
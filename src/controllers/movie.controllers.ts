import { Request, Response } from "express";
import { createMovieService, deleteMovieService, readMovieService, updateMovieService } from "../services/movies.services";
import { Pagination } from "../interfaces/pagination.interface";
import { MovieCreate, MovieUpdate } from "../interfaces/movie.interfaces";

export const createMovieController = async (req: Request, res: Response): Promise<Response> => {
    const movie: MovieCreate = await createMovieService(req.body);

    return res.status(201).json(movie);
};

export const readMovieController = async (req: Request, res: Response): Promise<Response> => {
    const movies: Pagination = await readMovieService(res.locals.pagination);

    return res.status(200).json(movies);
};

export const updateMovieController = async (req: Request, res: Response): Promise<Response> => {
    const { verifyId } = res.locals;
    const { body } = req;
    const movie: MovieUpdate = await updateMovieService(verifyId, body);

    return res.status(200).json(movie);
};

export const deleteMovieController = async (req: Request, res: Response): Promise<Response> => {

    await deleteMovieService(res.locals.verifyId);

    return res.status(204).json();
};
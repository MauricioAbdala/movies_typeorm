import { Router } from "express";
import { createMovieController, deleteMovieController, readMovieController, updateMovieController } from "../controllers/movie.controllers";
import { verifyIdExists } from "../middleware/verifyIdExists.middleware";
import { validateBody } from "../middleware/validateBody.middleware";
import { movieCreateSchema, movieUpdateSchema } from "../schemas/movies.schemas";
import { pagination } from "../middleware/pagination.middleware";
import { verifyNameExists } from "../middleware/verifyNameExists.middleware";


export const movieRouter: Router = Router();

movieRouter.post('/', validateBody(movieCreateSchema), verifyNameExists, createMovieController);
movieRouter.get('/', pagination, readMovieController);

movieRouter.use('/:movieId', verifyIdExists);

movieRouter.patch('/:movieId', validateBody(movieUpdateSchema), verifyNameExists, updateMovieController);
movieRouter.delete('/:movieId', deleteMovieController);
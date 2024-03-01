import { Router } from "express";
import { movieRouter } from "./movie.router";

export const routes: Router = Router();

routes.use('/movies', movieRouter);
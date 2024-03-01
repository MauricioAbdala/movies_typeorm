import { Movie } from "./entities";
import { AppDataSource } from "./data-source";
import { MovieRepo } from "./interfaces/movie.interfaces";

export const movieRepo: MovieRepo = AppDataSource.getRepository(Movie);
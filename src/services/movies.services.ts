import { Movie } from "../entities";
import { MovieCreate, MovieUpdate } from "../interfaces/movie.interfaces";
import { Pagination, PaginationParams } from "../interfaces/pagination.interface";
import { movieRepo } from "../repositories";

export const createMovieService = async (payload: MovieCreate): Promise<Movie> => {
    const movie: Movie = await movieRepo.save(payload);

    return movie;
};

export const readMovieService = async ({ nextPage, page, perPage, prevPage, order, sort }: PaginationParams): Promise<Pagination> => {

    const [movies, count] = await movieRepo.findAndCount({
        order: { [sort]: order },
        skip: page,
        take: perPage
    });
    return {
        prevPage: page <= 1 ? null : prevPage,
        nextPage: count - page <= perPage ? null : nextPage,
        count,
        data: movies

    };
};

export const updateMovieService = async (movie: Movie, payload: MovieUpdate): Promise<Movie> => {
    return await movieRepo.save({ ...movie, ...payload });
};

export const deleteMovieService = async (movie: Movie): Promise<void> => {

    await movieRepo.remove(movie);
};
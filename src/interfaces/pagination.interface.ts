import { Movie } from "../entities";

export type Pagination = {
   prevPage: string | null;
   nextPage: string | null;
   count: number;
   data: Array<Movie>
};

export type PaginationParams = {
   page: number;
   perPage: number;
   order: string;
   sort: string;
   prevPage: string | null;
   nextPage: string | null
};
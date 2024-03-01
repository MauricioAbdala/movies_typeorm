import { NextFunction, Request, Response } from "express";
import { PaginationParams } from "../interfaces/pagination.interface";
import 'dotenv/config';

export const pagination = (req: Request, res: Response, next: NextFunction): void => {
    const queryPage: number = Number(req.query.page);
    const queryPerPage: number = Number(req.query.perPage);

    let page: number = 0;
    let perPage: number = 0;

    if (queryPage && queryPage > 1) {
        page = queryPage;
    } else {
        page = 1;
    };

    if (queryPerPage && queryPerPage <= 5 && queryPerPage > 0) {
        perPage = queryPerPage;
    } else {
        perPage = 5;
    };

    const baseUrl: string = `http://localhost:3000/movies`
    const prevPage: string = `${baseUrl}?page=${page - 1}&perPage=${perPage}`
    const nextPage: string = `${baseUrl}?page=${page + 1}&perPage=${perPage}`

    const queryOrder: any = req.query.order;
    const querySort: any = req.query.sort;

    const orderOpts: Array<string> = ['asc', 'desc'];
    const sortOpts: Array<string> = ['price', 'duration'];

    let order: string;
    let sort: string;

    if (!(querySort && sortOpts.includes(querySort))) {
        sort = 'id';
    } else {
        sort = querySort;
    };

    if (!querySort || !(queryOrder && orderOpts.includes(queryOrder))) {
        order = 'asc';
    } else {
        order = queryOrder;
    };

    const pagination: PaginationParams = {
        page: perPage * (page - 1),
        perPage,
        order,
        sort,
        prevPage,
        nextPage
    };

    res.locals = { ...res.locals, pagination };

    return next();
};
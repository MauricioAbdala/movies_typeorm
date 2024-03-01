import express, { Application, json } from "express";
import 'express-async-errors';
import { routes } from "./routes";
import { handleErrors } from "./middleware/handleErrors";

export const app: Application = express();
app.use(json());

app.use('/', routes);

app.use(handleErrors);

export default app;
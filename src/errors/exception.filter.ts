import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../logger/logger.service";
import { IExceptionFilter } from "./exception.filter.interface";
import { HTTPError } from "./http-error.class";

export class ExceptionFilter implements IExceptionFilter {
    logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
    }
    catch(err: HTTPError | Error, req: Request, res: Response, next: NextFunction) {
       if (err instanceof HTTPError) {
        this.logger.error(`[${err.context}] Code ${err.stausCode}: ${err.message}`)
        res.status(err.stausCode).send({ err: err.message })
       } else {
        this.logger.error(`${err.message}`)
        res.status(500).send({ err: err.message })
       }
    }
}
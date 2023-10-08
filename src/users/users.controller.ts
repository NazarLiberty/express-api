import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { HTTPError } from "../errors/http-error.class";

export class UsersController extends BaseController {
    constructor (logger: LoggerService) {
        super(logger)
        this.bindRoutes([
            { path: "/login", method: "post", func: this.login },
            { path: "/register", method: "post", func: this.register },
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        // return this.ok<string>(res, "User Logged")
        next(new HTTPError(401, "Ошибка авторизации"))
    }
    register(req: Request, res: Response, next: NextFunction) {
        return this.created(res)
    }
    
}
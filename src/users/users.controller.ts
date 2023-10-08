import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";

export class UsersController extends BaseController {
    constructor (logger: LoggerService) {
        super(logger)
        this.bindRoutes([
            { path: "/login", method: "post", func: this.login },
            { path: "/register", method: "post", func: this.register },
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        this.ok<string>(res, "User Logged")
    }
    register(req: Request, res: Response, next: NextFunction) {
        this.created(res)
    }
    
}
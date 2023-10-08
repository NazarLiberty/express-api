import express, { Express, Router } from "express";
import { Server } from "http";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";
import { ExceptionFilter } from "./errors/exception.filter";
import { HTTPError } from "./errors/http-error.class";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  usersController: UsersController;
  exceptionFilter: ExceptionFilter;

  constructor(logger: LoggerService, usersController: UsersController, exceptionFilter: ExceptionFilter) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
    this.exceptionFilter = exceptionFilter;
  }

  public useRoutes() {
    this.app.use("/users", this.usersController.router);
    
    this.app.use((req, res, next) => {
        const error = new HTTPError(404, "Not Found")
        next(error)
    })
  }

  public useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started on http://localhost:${this.port}`);
  }
}

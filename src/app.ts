import express, { Express, Router } from "express";
import { Server } from "http";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  usersController: UsersController

  constructor(logger: LoggerService, usersController: UsersController) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController
  }

  public useRoutes() {
    this.app.use("/users", this.usersController.router);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started on http://localhost:${this.port}`);
  }
}

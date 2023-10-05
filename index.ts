import http from "http";
import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "./users/users.js";

const port = 8000;
const app = express();

app.get("/hello", (req, res) => {
  res.send({ hello: "World" });
});

app.use("/users", userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  // @ts-ignore
  err.status = 404;
  next(err);
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if ("status" in err) res.status(typeof err.status === "number" ? err.status : 500);
  res.send({
    error: err.message
  })
});

app.listen(port, "127.0.0.1", () => {
  console.log(process.env.POST, process.env.HOST);
  console.log(`Server started on http://localhost:${port}`);
});

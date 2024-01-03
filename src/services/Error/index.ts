import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";

const errorHandleing = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err && err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  if (err && err instanceof MulterError) {
    return res.status(400).json({
      error: err,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
};

export default errorHandleing;

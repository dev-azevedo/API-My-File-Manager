import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IDataToken {
  id: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { id } = verify(token, process.env.JWT_SECRET) as IDataToken;
    req.body.idUser = +id;
    return next();
  } catch (err) {
    return res.status(401).end();
  }
};

export default isAuthenticated;

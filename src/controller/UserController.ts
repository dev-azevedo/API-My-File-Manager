import { NextFunction, Request, Response } from "express";
import UserServices from "../services/User/UserServices";
import { IUser } from "../services/User/typesUser";

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, dateBirth, phone, password, profileId } =
        req.body as IUser;

      const user = await UserServices.create({
        name,
        email,
        dateBirth,
        phone,
        password,
        profileId,
      });

      return res.status(201).json(user);
    } catch (err: any) {
      next(err);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const auth = await UserServices.signIn({ email, password });

      return res.json(auth);
    } catch (err: any) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserServices.getAll();
      return res.json(users);
    } catch (err: any) {
      next(err);
    }
  }

  async detailUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { idUser } = req.body;
      const user = await UserServices.detailUser(idUser);

      return res.json(user);
    } catch (err: any) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, dateBirth, phone, password, profileId } =
        req.body as IUser;
      const id = +req.params.id;
      const user = await UserServices.update(
        { id, name, email, dateBirth, phone, password, profileId },
        req.body.idUser
      );
      return res.json(user);
    } catch (err: any) {
      next(err);
    }
  }
}

export default new UserController();

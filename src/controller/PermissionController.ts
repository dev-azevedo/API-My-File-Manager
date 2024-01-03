import { NextFunction, Request, Response } from "express";
import { IPermission } from "../services/Permission/typePermission";
import PermissionService from "../services/Permission/PermissionService";

class PermissionController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { idUserPermission, idFolder, idRole } = req.body as IPermission;

      const permission = await PermissionService.create(
        { idUserPermission, idFolder, idRole },
        req.body.idUser
      );
      return res.json(permission);
    } catch (err: any) {
      next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const permission = await PermissionService.get(req.body.idUser);
      return res.json(permission);
    } catch (err: any) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { idUserPermission, idFolder, idRole } = req.body as IPermission;
      const id = +req.params.id;
      const permission = await PermissionService.update(
        { idUserPermission, idFolder, idRole },
        id,
        req.body.idUser
      );
      return res.json(permission);
    } catch (err: any) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const permission = await PermissionService.delete(id);
      return res.json(permission);
    } catch (err: any) {
      next(err);
    }
  }
}

export default new PermissionController();

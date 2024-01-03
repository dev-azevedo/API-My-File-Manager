import { NextFunction, Request, Response } from "express";
import RoleService from "../services/Role/RoleService";

class RoleController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const role = await RoleService.create(name);
      return res.json(role);
    } catch (err: any) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await RoleService.getAll();
      return res.json(role);
    } catch (err: any) {
      next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const role = await RoleService.get(id);
      return res.json(role);
    } catch (err: any) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const id = req.params.id;
      const role = await RoleService.update(name, id);
      return res.json(role);
    } catch (err: any) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const role = await RoleService.delete(id);
      return res.json(role);
    } catch (err: any) {
      next(err);
    }
  }
}

export default new RoleController();

import { NextFunction, Request, Response } from "express";
import ProfileService from "../services/Profile/ProfileService";

class ProfileController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const profile = await ProfileService.create(name);
      return res.json(profile);
    } catch (err: any) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await ProfileService.getAll();
      return res.json(profile);
    } catch (err: any) {
      next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const profile = await ProfileService.get(id);
      return res.json(profile);
    } catch (err: any) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const id = req.params.id;
      const profile = await ProfileService.update(name, id);
      return res.json(profile);
    } catch (err: any) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const profile = await ProfileService.delete(id);
      return res.json(profile);
    } catch (err: any) {
      next(err);
    }
  }
}

export default new ProfileController();

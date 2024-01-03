import { NextFunction, Request, Response } from "express";
import FolderService from "../services/Folder/FolderService";

class FolderController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const folder = await FolderService.create(name, req.body.idUser);
      return res.json(folder);
    } catch (err: any) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const folder = await FolderService.getAll();
      return res.json(folder);
    } catch (err: any) {
      next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const folder = await FolderService.get(id);
      return res.json(folder);
    } catch (err: any) {
      next(err);
    }
  }

  async getFolderUser(req: Request, res: Response, next: NextFunction) {
    try {
      const folders = await FolderService.getFolderUser(req.body.idUser);
      return res.json(folders);
    } catch (err: any) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, idUser } = req.body;
      const id = +req.params.id;
      const folder = await FolderService.update(name, id, idUser);
      return res.json(folder);
    } catch (err: any) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const folder = await FolderService.delete(id);
      return res.json(folder);
    } catch (err: any) {
      next(err);
    }
  }
}

export default new FolderController();

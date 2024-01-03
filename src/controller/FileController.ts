import { NextFunction, Request, Response } from "express";
import { IFile } from "../services/File/typeFile";
import FileService from "../services/File/FileService";

class FileController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { nameFile, idFolder, extension } = req.body as IFile;
      const file = await FileService.create(
        { nameFile, idFolder, extension },
        req.body.idUser
      );
      return res.json(file);
    } catch (err: any) {
      next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const file = await FileService.get(id);
      return res.json(file);
    } catch (err: any) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { nameFile, idFolder, extension } = req.body as IFile;
      const id = +req.params.id;
      const file = await FileService.update(
        { nameFile, idFolder, extension },
        id,
        req.body.idUser
      );
      return res.json(file);
    } catch (err: any) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const file = await FileService.delete(id);
      return res.json(file);
    } catch (err: any) {
      next(err);
    }
  }
}

export default new FileController();

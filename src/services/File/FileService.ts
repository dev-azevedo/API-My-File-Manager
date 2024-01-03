import prismaClient from "../../config/prismaClient";
import { IFile } from "./typeFile";

class FileService {
  async create(file: IFile, idUser: number) {
    if (!file.nameFile) {
      console.error("❌ Nome do arquivo inválido.");
      throw new Error("Nome do arquivo inválido.");
    }

    const fileAlreadyExist = await prismaClient.file.findFirst({
      where: {
        idFolder: file.idFolder,
        AND: {
          nameFile: file.nameFile,
        },
      },
    });

    if (fileAlreadyExist) {
      console.error("❌ Arquivo já cadastrado!");
      throw new Error("Arquivo já cadastrado!");
    }

    const fileDb = await prismaClient.file.create({
      data: {
        nameFile: file.nameFile,
        extension: file.extension,
        idFolder: file.idFolder,
        createdById: idUser,
        updatedById: idUser,
      },
      select: {
        id: true,
        nameFile: true,
        extension: true,
        idFolder: true,
        createdAt: true,
        createdById: true,
      },
    });

    return fileDb;
  }

  async get(idFolder: number) {
    const files = await prismaClient.file.findMany({
      where: {
        idFolder: idFolder,
      },
    });

    return files;
  }

  async getFolderUser(idUser: number) {
    const folders = await prismaClient.folder.findFirst({
      where: {
        idUser: idUser,
      },
    });

    return folders;
  }

  async update(file: IFile, idFile: number, idUser: number) {
    if (!file.nameFile) {
      console.error("❌ Nome do arquivo inválido.");
      throw new Error("Nome do arquivo inválido.");
    }

    const fileDb = await prismaClient.file.update({
      where: {
        id: idFile,
      },
      data: {
        nameFile: file.nameFile,
        extension: file.extension,
        idFolder: file.idFolder,
        updatedById: idUser,
        updatedAt: new Date(),
      },
    });

    return fileDb;
  }

  async delete(idFile: number) {
    const file = await prismaClient.file.delete({
      where: {
        id: idFile,
      },
    });

    return file;
  }
}

export default new FileService();

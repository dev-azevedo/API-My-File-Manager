import prismaClient from "../../config/prismaClient";

class FolderService {
  async create(name: string, idUser: number) {
    if (!name) {
      console.error("❌ Nome da pasta incorreto.");
      throw new Error("Nome da pasta incorreto.");
    }

    const folderAlreadyExist = await prismaClient.folder.findFirst({
      where: {
        path: name,
        AND: {
          idUser: idUser,
        },
      },
    });

    if (folderAlreadyExist) {
      console.error("❌ Você já tem uma pasta cadastrada com esse nome.");
      throw new Error("Você já tem uma pasta cadastrada com esse nome.");
    }

    const folder = await prismaClient.folder.create({
      data: {
        path: name,
        idUser: idUser,
        createdById: idUser,
        updatedById: idUser,
      },
      select: {
        id: true,
        path: true,
        createdAt: true,
        createdById: true,
      },
    });

    return folder;
  }

  async getAll() {
    const folder = await prismaClient.folder.findMany();

    return folder;
  }

  async get(idFolder: number) {
    const folder = await prismaClient.folder.findFirst({
      where: {
        id: idFolder,
      },
    });

    return folder;
  }

  async getFolderUser(idUser: number) {
    const permission = await prismaClient.permission.findMany({
      where: {
        idUserPermission: idUser,
      },
    });

    const folderPromises: Promise<any>[] = permission.map(
      async (permission) => {
        const fold = await prismaClient.folder.findMany({
          where: {
            id: permission.idFolder,
          },
        });

        return fold;
      }
    );

    const foldersPermission = (await Promise.all(folderPromises)).flat();

    const folders = await prismaClient.folder.findMany({
      where: {
        idUser: idUser,
      },
    });

    return foldersPermission.concat(folders);
  }

  async update(name: string, idFolder: number, idUser: number) {
    if (!name) {
      console.error("❌ Nome da pasta incorreto.");
      throw new Error("Nome da pasta incorreto.");
    }

    const folder = await prismaClient.folder.update({
      where: {
        id: idFolder,
      },
      data: {
        path: name,
        updatedById: idUser,
        updatedAt: new Date(),
      },
    });

    return folder;
  }

  async delete(idFolder: number) {
    const folder = await prismaClient.folder.delete({
      where: {
        id: idFolder,
      },
    });

    return folder;
  }
}

export default new FolderService();

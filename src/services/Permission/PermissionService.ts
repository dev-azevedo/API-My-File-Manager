import prismaClient from "../../config/prismaClient";
import { IPermission } from "./typePermission";

class PermissionService {
  async create(permission: IPermission, idUser: number) {
    await this.validateRequiredField(permission);

    const permissionAlreadyExist = await prismaClient.permission.findFirst({
      where: {
        idFolder: permission.idFolder,
        AND: {
          idUserPermission: permission.idUserPermission,
        },
      },
    });

    if (permissionAlreadyExist) {
      console.error("❌ Permissão já concedida para este usuário!");
      throw new Error("Permissão já concedida para este usuário!");
    }

    const permissionDb = await prismaClient.permission.create({
      data: {
        idUserPermission: permission.idUserPermission,
        idFolder: permission.idFolder,
        idRole: permission.idRole,
        createdById: idUser,
        updatedById: idUser,
      },
      select: {
        id: true,
        idUserPermission: true,
        idFolder: true,
        idRole: true,
        createdAt: true,
        createdById: true,
      },
    });

    return permissionDb;
  }

  async validateRequiredField(permission: IPermission) {
    if (!permission.idUserPermission) {
      console.error("❌ Informe qual usuário terá a permissão.");
      throw new Error("Informe qual usuário terá a permissão.");
    }

    if (!permission.idFolder) {
      console.error("❌ Informe qual pasta deseja liberar permissão.");
      throw new Error("Informe qual pasta deseja liberar permissão.");
    }

    if (!permission.idRole) {
      console.error("❌ Informe qual o papel o usuário terá sobre essa pasta.");
      throw new Error("Informe qual o papel o usuário terá sobre essa pasta.");
    }
  }

  async get(idUser: number) {
    const permission = await prismaClient.permission.findMany({
      where: {
        idUserPermission: idUser,
      },
    });

    return permission;
  }

  async getFolderUser(idUser: number) {
    const folders = await prismaClient.folder.findFirst({
      where: {
        idUser: idUser,
      },
    });

    return folders;
  }

  async update(permission: IPermission, idPermission: number, idUser: number) {
    await this.validateRequiredField(permission);

    const permissionDb = await prismaClient.permission.update({
      where: {
        id: idPermission,
      },
      data: {
        idUserPermission: permission.idUserPermission,
        idFolder: permission.idFolder,
        idRole: permission.idRole,
        updatedById: idUser,
        updatedAt: new Date(),
      },
    });

    return permissionDb;
  }

  async delete(idPermission: number) {
    const permission = await prismaClient.permission.delete({
      where: {
        id: idPermission,
      },
    });

    return permission;
  }
}

export default new PermissionService();

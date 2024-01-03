import prismaClient from "../../config/prismaClient";

class RoleService {
  async create(name: string) {
    if (!name) {
      console.error("❌ Nome incorreto.");
      throw new Error("Nome incorreto.");
    }

    const roleAlreadyExist = await prismaClient.role.findFirst({
      where: {
        name: name,
      },
    });

    if (roleAlreadyExist) {
      console.error("❌ Papel já cadastrado.");
      throw new Error("Papel já cadastrado.");
    }

    const role = await prismaClient.role.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return role;
  }

  async getAll() {
    const role = await prismaClient.role.findMany();

    return role;
  }

  async get(idRole: string) {
    const role = await prismaClient.role.findFirst({
      where: {
        id: +idRole,
      },
    });

    return role;
  }

  async update(name: string, idRole: string) {
    if (!name) {
      console.error("❌ Nome do papel incorreto.");
      throw new Error("Nome do papel incorreto.");
    }

    const role = await prismaClient.role.update({
      where: {
        id: +idRole,
      },
      data: {
        name: name,
        updatedAt: new Date(),
      },
    });

    return role;
  }

  async delete(idRole: string) {
    const role = await prismaClient.role.delete({
      where: {
        id: +idRole,
      },
    });

    return role;
  }
}

export default new RoleService();

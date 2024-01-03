import prismaClient from "../../config/prismaClient";

class ProfileService {
  async create(name: string) {
    if (!name) {
      console.error("❌ Nome incorreto.");
      throw new Error("Nome incorreto.");
    }

    const profileAlreadyExist = await prismaClient.profile.findFirst({
      where: {
        name: name,
      },
    });

    if (profileAlreadyExist) {
      console.error("❌ Perfil já cadastrado.");
      throw new Error("Perfil já cadastrado.");
    }

    const profile = await prismaClient.profile.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return profile;
  }

  async getAll() {
    const profile = await prismaClient.profile.findMany();

    return profile;
  }

  async get(idProfile: string) {
    const profile = await prismaClient.profile.findFirst({
      where: {
        id: +idProfile,
      },
    });

    return profile;
  }

  async update(name: string, idProfile: string) {
    if (!name) {
      console.error("❌ Nome do perfil incorreto.");
      throw new Error("Nome do perfil incorreto.");
    }

    const profile = await prismaClient.profile.update({
      where: {
        id: +idProfile,
      },
      data: {
        name: name,
        updatedAt: new Date(),
      },
    });

    return profile;
  }

  async delete(idProfile: string) {
    const profile = await prismaClient.profile.delete({
      where: {
        id: +idProfile,
      },
    });

    return profile;
  }
}

export default new ProfileService();

import prismaClient from "../../config/prismaClient";
import { hash, compare } from "bcryptjs";
import { IUser, ISignInUser } from "./typesUser";
import { sign } from "jsonwebtoken";
import Helper from "../Utils/Helper/HelperService";

class UserService {
  async create(user: IUser) {
    await this.validateRequiredField(user);

    const passwordHash = await hash(user.password, 8);

    const newUser = await prismaClient.user.create({
      data: {
        name: user.name.toLowerCase(),
        email: user.email,
        dateBirth: user.dateBirth,
        phone: user.phone,
        password: passwordHash,
        profileId: user.profileId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        dateBirth: true,
        phone: true,
        profileId: true,
      },
    });

    const result: any = { ...newUser };
    result.name = Helper.autoCapitalize(result.name);

    result.phone = Helper.setMaskPhone(result.phone);

    return result;
  }

  async validateRequiredField(user: IUser) {
    if (!user.name) {
      console.error("❌ O nome é obrigatório.");
      throw new Error("O nome é obrigatório.");
    }

    if (!user.phone) {
      console.error("❌ O telefone é obrigatório.");
      throw new Error("O telefone é obrigatório.");
    }

    if (!user.dateBirth) {
      console.error("❌ A data de nascimento é obrigatório.");
      throw new Error("A data de nascimento é obrigatório.");
    }

    if ("password" in user && !user.password) {
      console.error("❌ A senha é obrigatório.");
      throw new Error("A senha é obrigatório.");
    }

    if (!user.email) {
      console.error("❌ O email é obrigatório.");
      throw new Error("O email é obrigatório.");
    }

    const emailAlreadyExist = await prismaClient.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (user.id) {
      if (emailAlreadyExist && emailAlreadyExist?.id !== user.id) {
        console.error(
          `❌ Email já cadastrado. update = ${user.id} - ${emailAlreadyExist.id}`
        );
        throw new Error("Email já cadastrado.");
      }

      return;
    }

    if (emailAlreadyExist) {
      console.error("❌ Email já cadastrado.");
      throw new Error("Email já cadastrado.");
    }
  }

  async signIn({ email, password }: ISignInUser) {
    const user = await this.getUser(email);
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      console.error("❌ Email ou senha incorreto.");
      throw new Error("Email ou senha incorreto.");
    }

    const token = sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return {
      id: user.id,
      name: Helper.autoCapitalize(user.name),
      email: user.email,
      profile: user.profileId,
      token: token,
    };
  }

  async getAll() {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        dateBirth: true,
        profileId: true,
      },
    });

    return users;
  }

  async getUser(email: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      console.error("❌ Email ou senha incorreto.");
      throw new Error("Email ou senha incorreto.");
    }

    return user;
  }

  async detailUser(idUser: number) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: idUser,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        profileId: true,
        dateBirth: true,
      },
    });

    const result: any = { ...user };
    result.name = Helper.autoCapitalize(result.name);
    result.phone = Helper.setMaskPhone(result.phone);

    return result;
  }

  async update(updateClient: IUser, idUser: number) {
    await this.validateRequiredField(updateClient);

    const user = await prismaClient.user.findFirst({
      where: {
        id: idUser,
      },
    });

    if (!user) {
      console.error("❌ Usuario não localizado.");
      throw new Error("Usuario não localizado.");
    }

    const userUpdate = await prismaClient.user.update({
      where: {
        id: updateClient.id,
      },

      data: {
        name: updateClient.name,
        email: updateClient.email,
        phone: updateClient.phone,
        dateBirth: updateClient.dateBirth,
        updatedAt: new Date(),
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        dateBirth: true,
      },
    });

    if (!userUpdate) {
      console.error("❌ Erro ao atualizar usuario.");
      throw new Error("Erro ao atualizar usuario.");
    }

    return userUpdate;
  }
}

export default new UserService();

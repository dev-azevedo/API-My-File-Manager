import prismaClient from "../config/prismaClient";
import { typeContacts } from "../services/Client/emum";

interface ITypeContact {
  id: number;
  name: string;
}

const initialProfile = async () => {
  try {
    await Promise.all([
      prismaClient.profile.create({
        data: {
          name: "admin",
        },
      }),
      prismaClient.profile.create({
        data: {
          name: "partner",
        },
      }),
    ]);
    console.log("👤 Create profiles!");
  } catch (error) {
    console.error("Ocorreu um erro ao adicionar profile:", error);
  }
};

const initialTypeContact = async (): Promise<void> => {
  return new Promise(async (res, rej) => {
    try {
      const types: Array<ITypeContact> = Object.entries(typeContacts)
        .filter(([key]) => !isNaN(Number(key)))
        .map(([key, value]) => ({
          id: +key,
          name: value as string,
        }));

      const promises = types.map(async (type) => {
        try {
          await prismaClient.typeContact.create({
            data: {
              id: type.id,
              name: type.name,
            },
          });
        } catch (error) {
          console.error(
            `❌ Ocorreu um erro ao adicionar tipo - ${type.name}:`,
            error
          );
          rej(error);
        }
      });

      await Promise.all(promises);

      console.log("📞 Create types contacts!");
      res();
    } catch (error) {
      console.error("Ocorreu um erro ao adicionar tipos de contato:", error);
      rej(error);
    }
  });
};

const firstStart = async () => {
  try {
    await Promise.all([await initialProfile(), await initialTypeContact()]);
  } catch (err) {
    console.error(`Ocorreu um erro ao adicionar tipo: `, err);
  } finally {
    await prismaClient.$disconnect();
  }
};

firstStart();

import { Expo, ExpoPushMessage } from "expo-server-sdk";
import prismaClient from "../config/prismaClient";
import Helper from "../services/Utils/Helper/HelperService";
import fs from "fs";

const sendNotification = async () => {
  const expo = new Expo();

  try {
    const clients = await prismaClient.client.findMany();

    if (!clients) {
      console.error("❌ Não localizamos clientes cadastrados");
      throw new Error("Não localizamos clientes cadastrados.");
    }

    const daysForSendNotify = [10, 15, 20, 25, 30];

    clients.map(async (client) => {
      const dateClient = new Date(client.createdAt || "");
      const directory = client.pathFile || "";

      daysForSendNotify.forEach((day) => {
        const validateDays = Helper.validateDaysOfRegister(dateClient, day);
        if (validateDays && !hasFiles(directory)) notification(client, expo);
      });
    });
  } catch (error) {
    console.error("Ocorreu um erro ao enviar notificação:", error);
  } finally {
    await prismaClient.$disconnect();
  }
};

const hasFiles = (directory: string) => {
  if (fs.existsSync(directory)) {
    const listaArquivos = fs.readdirSync(directory);

    return listaArquivos.length === 0 ? false : true;
  }

  return false;
};

const notification = async (client: any, expo: Expo) => {
  const partnerPerClient = await prismaClient.partner.findMany({
    where: {
      idClient: client.id,
    },
  });

  partnerPerClient.map(async (partner) => {
    const partnerDB = await prismaClient.user.findFirst({
      where: {
        id: partner.idUser,
      },
    });

    const nameClient = Helper.autoCapitalize(client.name);
    const message: ExpoPushMessage = {
      to: partnerDB?.expoToken || "",
      sound: "default",
      title: `📱 Atualização Necessária para ${nameClient}`,
      body: `Faltam arquivos essenciais para ${nameClient}. Por favor, atualize para continuarmos. 😊`,
      data: { id: client.id },
    };

    expo
      .sendPushNotificationsAsync([message])
      .then((receipts) => {
        console.log(receipts);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

sendNotification();

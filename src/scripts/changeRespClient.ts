import prismaClient from "../config/prismaClient";
import Helper from "../services/Utils/Helper/HelperService";

const changeRespClient = async () => {
  try {
    const clients = await prismaClient.client.findMany();

    if (!clients) {
      console.error("❌ Não localizamos clientes cadastrados");
      throw new Error("Não localizamos clientes cadastrados.");
    }

    clients.map(async (client) => {
      const dateClient = new Date(client.createdAt || "");

      const validateDays = Helper.validateDaysOfRegister(dateClient, 90);
      if (validateDays) updateClient(client);
    });
  } catch (error) {
    console.error("Ocorreu um erro ao enviar notificação:", error);
  } finally {
    await prismaClient.$disconnect();
  }
};

const updateClient = async (client: any) => {
  const partnerResp = await prismaClient.partner.findMany({
    where: {
      idClient: +client.id,
    },
  });

  partnerResp.map(async (partner) => {
    await prismaClient.partner.update({
      where: {
        id: partner.id,
      },
      data: {
        idUser: 1,
      },
    });
  });
};

changeRespClient();

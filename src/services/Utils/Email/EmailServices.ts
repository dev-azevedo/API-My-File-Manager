import { IEmailProps } from "./typesEmail";
import smtp from "../../../config/nodemailer";
import { promises, readFile } from "fs";
import path from "path";

class EmailService {
  sendMail({ toEmail, subject, html, attachments }: IEmailProps) {
    const emailConfig = {
      from: `Portal do parceiro <${process.env.EMAIL_NODEMAILER}>`,
      to: toEmail,
      subject,
      html,
      attachments,
    };

    return new Promise(async (resolve, reject) => {
      try {
        const result = await smtp.sendMail(emailConfig);
        return resolve(result);
      } catch (err) {
        console.error(err);
        return reject(err);
      }
    });
  }

  async getContentEmail() {
    const pathHtml = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "assets",
      "templateHtmlEmail.txt"
    );

    try {
      const conteudo: string = await promises.readFile(pathHtml, "utf-8");
      return conteudo;
    } catch (erro) {
      console.error("Ocorreu um erro ao ler o html email:", erro.message);
      return null;
    }
  }
}

export default new EmailService();

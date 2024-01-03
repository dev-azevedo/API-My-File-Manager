import { createTransport } from "nodemailer";

const smtp = createTransport({
  host: "smtp.skymail.net.br",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_NODEMAILER,
    pass: process.env.PASS_NODEMAILER,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

smtp.verify(function (error, success) {
  if (error) {
    return console.error("❌ Erro connecting the nodamiler: ", error);
  }

  return console.log("📧 Ready-to-use email service!");
});

export default smtp;

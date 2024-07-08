import nodemailer from "nodemailer";
import { configService } from "@/services/config.service";

const options = {
  service: "Mail.ru",
  auth: {
    user: configService.MAILER_EMAIL,
    pass: configService.MAILER_TOKEN,
  },
};

const mailOptions: nodemailer.SendMailOptions = {
  from: configService.MAILER_EMAIL,
};

const transporter: nodemailer.Transporter = nodemailer.createTransport(options);

async function send(opt: nodemailer.SendMailOptions) {
  return transporter.sendMail({ ...opt, ...mailOptions });
}

export const mailerService = {
  send,
};

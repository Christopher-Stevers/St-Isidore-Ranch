import nodemailer, { type Transporter } from "nodemailer";
import { env } from "~/env.mjs";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
  htmlMessage?: string;
}
// Configure your email service provider
const emailWrapper = async ({
  email,
  subject,
  message,
  htmlMessage,
}: EmailOptions) => {
  try {
    console.log("send email");
    const transporter: Transporter =
      nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 465, // e.g., "Gmail", "Outlook", "SendGrid", etc.
        auth: {
          user: env.EMAIL_USERNAME,
          pass: env.EMAIL_PASSWORD,
        },
      });

    const mailOptions = {
      from: env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      text: message,
      html: htmlMessage,
    };

    await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export default emailWrapper;

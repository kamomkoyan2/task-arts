import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();
const sendVerificationMail = async (to: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS,
    },
  });

  const mailOptions = {
    from: 'youremail@gmail.com',
    to,
    subject: 'Verify your email address',
    html: `Please click the link to verify your email: <a href="http://localhost:3000/api/v1/auth/verify-email?token=${token}">Verify email</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default { sendVerificationMail };

import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();
const sendVerificationMail = async (to: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'c4323ce21ffec2',
      pass: 'f79bcf45fe82d3',
    },
  });

  const mailOptions = {
    from: 'youremail@gmail.com',
    to,
    subject: 'Verify your email address',
    html: `Please click the link to verify your email: <a href="http://localhost:3000/verify-email?token=${token}">Verify email</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default { sendVerificationMail };

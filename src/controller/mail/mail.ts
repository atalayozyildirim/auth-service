import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

const sendMail = (
  mailOpt: { to: string; subject: string; text: string; user: any },
  req: Request,
  res: Response
) => {
  const { to, subject, text, user } = mailOpt;

  const transporter = nodemailer.createTransport({
    host: "smtp.yandex.com",
    port: parseInt(process.env.SMTP_PORT || "536"),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    secure: process.env.SMTP_PORT === "465",
  });

  const mailDetails = {
    from: process.env.SMTP_USER,
    to: to,
    subject: subject,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 50px auto;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding: 10px 0;
          border-bottom: 1px solid #dddddd;
        }
        .header h2 {
          margin: 0;
          color: #333333;
        }
        .content {
          padding: 20px;
          text-align: center;
        }
        .content p {
          font-size: 16px;
          color: #666666;
        }
        .content a {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 16px;
          color: #ffffff;
          background-color: #007bff;
          text-decoration: none;
          border-radius: 5px;
        }
        .footer {
          text-align: center;
          padding: 10px 0;
          border-top: 1px solid #dddddd;
          font-size: 12px;
          color: #999999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Merhaba ${user.email}</h2>
        </div>
        <div class="content">
          <p>Şifreni değiştirmek istediğini duyduk. Aşağıdaki butona tıklayarak şifreni sıfırlayabilirsin.</p>
          <a href="http://localhost:3000/reset-password?token=${user.token}&redirect=localhost">Şifreni Sıfırla</a>
        </div>
        <div class="footer">
          <p>Eğer bu isteği sen yapmadıysan, hemen hesabını güvene al !</p>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  transporter.sendMail(mailDetails, (err, data) => {
    if (err) return console.error("Error sending mail:", err);
    res.status(200).json({ message: "Mail sent successfully" });
  });
};

export { sendMail };

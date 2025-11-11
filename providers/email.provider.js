require('dotenv').config()
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'suporteeco2eco@gmail.com',
        pass: process.env.PASSWORD_EMAIL
    }
});

exports.sendPasswordResetEmail = async (to, token) => {
  const code = token.slice(-5); // captura os últimos 5 dígitos
  try {
    const info = await transporter.sendMail({
      from: `"Eco2Eco: Redefinição de Senha" <joaojohnson1504@gmail.com>`,
      to,
      subject: "Código para redefinição de senha",
      html: `
        <div style="
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f5f7fa;
          padding: 40px 20px;
          text-align: center;
          color: #333;
        ">
          <div style="
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            max-width: 500px;
            margin: 0 auto;
            padding: 30px 40px;
          ">
            <h3 style="
              color: #2e8b57;
              font-size: 22px;
              margin-bottom: 16px;
            ">Redefinição de Senha</h3>

            <p style="
              font-size: 16px;
              color: #555;
              margin-bottom: 24px;
            ">
              Use o código abaixo para confirmar sua identidade no app:
            </p>

            <h2 style="
              background-color: #e8f5e9;
              color: #2e8b57;
              display: inline-block;
              font-size: 28px;
              font-weight: bold;
              letter-spacing: 3px;
              padding: 14px 28px;
              border-radius: 8px;
              margin-bottom: 10px;
            ">${code}</h2>
          </div>
        </div>
      `
    });
    console.log('Email enviado:', info.response);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
};
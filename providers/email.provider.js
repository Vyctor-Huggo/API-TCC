const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'joaojohnson1504@gmail.com',
        pass: 'uhfe tbht cncm mcfz'
    }
});

exports.sendPasswordResetEmail = async (to, token) => {
  const code = token.slice(-5); // captura os últimos 5 dígitos
  try {
    const info = await transporter.sendMail({
      from: `"Seu App" <joaojohnson1504@gmail.com>`,
      to,
      subject: "Código para redefinição de senha",
      html: `
        <h3>Redefinição de Senha</h3>
        <p>Use o código abaixo para confirmar sua identidade no app:</p>
        <h2>${code}</h2>
      `
    });
    console.log('Email enviado:', info.response);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
};
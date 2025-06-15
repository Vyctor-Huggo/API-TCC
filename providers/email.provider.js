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
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  await transporter.sendMail({
    from: `"Seu App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Redefinição de senha",
    html: `
      <h3>Redefinição de Senha</h3>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${resetLink}">${resetLink}</a>
    `
  });
};

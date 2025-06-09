const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'joaojohnson1504@gmail.com',
        pass: 'uhfe tbht cncm mcfz'
    }
});
async function sendPasswordResetEmail(to, token) {
    const link = `https://localhost:3000/reset-password?token=${token}`;
    await transporter.sendMail({
        from: '"João Johnson" <joaojohnson1504@gmail.com>', // email de quem ta enviando
        to: "vyctorhuggo322@gmail.com, joaojbatatafrita@gmail.com", //email de quem ta recebendo, pode ser mais de um
        subject: 'Redefinição de Senha',
        text: 'receba',
        html: `<p>Para redefinir sua senha, clique no link abaixo:</p><a href="${link}">${link}</a>`
    });
    console.log("[TOKEN DE RESET DE SENHA]:", token);
    console.log("[LINK DE RESET]:", link);
}

module.exports = { sendPasswordResetEmail };
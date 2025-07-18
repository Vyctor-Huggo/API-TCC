const passwordService = require("../services/password.service");
/**
 * Controller para redefinir a senha com token.
 * Recebe o token e a nova senha no corpo da requisição.
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {Function} next 
 */
exports.resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.body.email, req.body.code, req.body.newPassword);
    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller para solicitar redefinição de senha.
 * Envia um e-mail com link/token de redefinição.
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {Function} next 
 */
exports.requestReset = async (req, res, next) => {
  try {
    await passwordService.requestPasswordReset(req.body.email);
    res.status(200).json({ message: 'E-mail de redefinição enviado' });
  } catch (err) {
    next(err);
  }
};



/**
 * Verifica se o código de verificação enviado pelo usuário é válido.
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {Function} next 
 */
exports.verifyCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      console.log('erro aqui cont');
      return res.status(400).json({ error: 'Email e código são obrigatórios' });
    }

    const result = await passwordService.verifyResetCode(email, code);
    console.log("resultado: ", result);
    res.status(200).json(result);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const express = require('express');
const passwordController = require('../controllers/password.controller');

/**
 * Conecta as rotas de autenticação e redefinição de senha ao app principal.
 *
 * @function
 * @param {import("express").Express} app - A instância principal do Express
 *
 * @example
 * const express = require("express");
 * const app = express();
 * const { mainRouter } = require("./routes/password.routes");
 * mainRouter(app);
 */
function passwordRouter(app) {
  const router = express.Router();

  // Rotas de redefinição de senha

  /**
   * @route POST /password/reset-request
   * @summary Solicita o envio do e-mail para redefinição de senha
   * @description Recebe o e-mail no corpo da requisição e envia o e-mail de reset
   */
  router.post('/reset-request', passwordController.requestReset);//evia o email de recuperação

  /**
   * @route POST /password/reset
   * @summary Redefine a senha do usuário
   * @description Recebe email, código e nova senha no corpo da requisição.
   */
  router.post('/reset', passwordController.resetPassword); //coloca token e nova senha

  /**
   * @route POST /password/verify-code
   * @summary Verifica se o código de redefinição é válido
   * @description Recebe email e código no corpo da requisição.
   */
  router.post('/verify-code', passwordController.verifyCode);

  // Conectando tudo ao app principal
  app.use('/password', router);
}

module.exports = { passwordRouter };

//aqui tem tanto o password quanto o auth


const express = require('express');
const authController = require('../controllers/auth.controller');
const passwordController = require('../controllers/password.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

/**
 * Conecta as rotas de autenticação e redefinição de senha ao app principal.
 *
 * @function
 * @param {import("express").Express} app - A instância principal do Express
 *
 * @example
 * const express = require("express");
 * const app = express();
 * const { mainRouter } = require("./routes/authAndPassword.routes");
 * mainRouter(app);
 */
function authRouter(app) {
  const router = express.Router();

  // Rotas de autenticação

  /**
   * @route POST /auth/register
   * @summary Registra um novo usuário no sistema
   * @description Recebe name, email e password no corpo da requisição.
   */
  router.post('/auth/register', authController.register);

  /**
   * @route POST /auth/login
   * @summary Realiza o login de um usuário
   * @description Retorna os dados do usuário autenticado e um token JWT.
   */
  router.post('/auth/login', authController.login);

  /**
   * @route GET /auth/me
   * @summary Retorna o perfil do usuário autenticado
   * @description Requer um token JWT válido no header Authorization.
   */
  router.get('/auth/me', verifyToken, authController.getProfile);

  /**
   * @route PUT /auth/update
   * @summary Atualiza a senha do usuário autenticado
   * @description Recebe o novo password no corpo e requer um token JWT válido.
   */
  router.put('/auth/update', verifyToken, authController.updateUserPassword);

  // Rotas de redefinição de senha

  /**
   * @route POST /password/reset-request
   * @summary Solicita o envio do e-mail para redefinição de senha
   * @description Recebe o e-mail no corpo da requisição e envia o e-mail de reset
   */
  router.post('/password/reset-request', passwordController.requestReset);//evia o email de recuperação

  /**
   * @route POST /password/reset
   * @summary Redefine a senha do usuário
   * @description Recebe email, código e nova senha no corpo da requisição.
   */
  router.post('/password/reset', passwordController.resetPassword); //coloca token e nova senha

  /**
   * @route POST /password/verify-code
   * @summary Verifica se o código de redefinição é válido
   * @description Recebe email e código no corpo da requisição.
   */
  router.post('/password/verify-code', passwordController.verifyCode);

  // Conectando tudo ao app principal
  app.use(router);
}

module.exports = { authRouter };

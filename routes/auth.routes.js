const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

function authRouter(app) {
  const router = express.Router();

/**
 * @route POST /auth/register
 * @summary Registra um novo usuário no sistema
 * @description Recebe name, email e password no corpo da requisição.
 */
router.post('/register', authController.register);

/**
 * @route POST /auth/login
 * @summary Realiza o login de um usuário
 * @description Retorna os dados do usuário autenticado e um token JWT.
 */
router.post('/login', authController.login);

/**
 * @route GET /auth/me
 * @summary Retorna o perfil do usuário autenticado
 * @description Requer um token JWT válido no header Authorization.
 */
router.get("/me", verifyToken, authController.getProfile);

router.put("/update", verifyToken, authController.updateUserPassword);

/**
 * Conecta as rotas de autenticação ao app principal
 * 
 * @function
 * @param {import("express").Express} app - A instância principal do Express
 * 
 * @example
 * const express = require("express");
 * const app = express(); 
 * const { authRouter } = require("./routes/auth.routes");
 * authRouter(app);
 */
router.post('/forgot-password', authController.requestReset);

/**
 * @route POST /auth/reset-password
 * @summary Reseta a senha do usuário
 * @description Recebe token e nova senha no corpo da requisição.
 */
router.post('/reset-password', authController.resetPassword);

/**
 * @route POST /auth/verify-code
 * @summary Verifica se o token de redefinição é válido
 * @description Recebe o token no corpo da requisição.
 */
router.post('/verify-code', authController.verifyCode);


app.use('/auth', router);
}

module.exports = { authRouter };
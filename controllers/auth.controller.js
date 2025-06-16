const authService = require("../services/auth.service");

/**
 * Controller para registrar um novo usuário.
 * Recebe os dados do `req.body` e envia para o serviço de autenticação.
 * @param {import("express").Request} req - Objeto da request Express
 * @param {import("express").Response} res - Objeto da response Express
 */
exports.register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Controller para registrar um novo usuário.
 * Recebe os dados do `req.body` e envia para o serviço de autenticação.
 * @param {import("express").Request} req - Objeto da request Express
 * @param {import("express").Response} res - Objeto da response Express
 */
exports.login = async (req, res) => {
  try {
    const user = await authService.loginUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Controller para retornar o perfil do usuário autenticado.
 * 
 * Esta função depende de um middleware de autenticação JWT que insere o ID do usuário em `req.user.id`.
 * 
 * @param {import("express").Request} req - Objeto da requisição do Express, com `req.user` preenchido pelo middleware
 * @param {import("express").Response} res - Objeto da resposta do Express
 * 
 * @returns {Object} Retorna os dados do perfil do usuário autenticado
 * 
 * @example
 * // Exemplo de resposta bem-sucedida:
 * {
 *   "User": {
 *     "name": "Nome do Usuário",
 *     "email": "email@example.com",
 *     "Created": "2025-04-27T15:30:00.000Z"
 *   }
 * }
 * 
 * @example
 * // Exemplo de resposta de erro:
 * {
 *   "error": "Usuário não encontrado"
 * }
 */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Pegando o id que o middleware inseriu no req.user

    const user = await authService.getUserProfile(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar perfil: " + err.message });
  }
};

exports.updateUserPassword = async (req, res) => {

  try {
    const userId = req.user.id; // Pegando o id que o middleware inseriu no req.user
    
    if (!req.body.newPassword) {
      return res.status(400).json({ error: "Nova senha não fornecida" });
    }

    const user = await authService.updateUserPassword(userId, req.body);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar perfil: " + err.message });
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
    await authService.requestPasswordReset(req.body.email);
    res.status(200).json({ message: 'E-mail de redefinição enviado' });
  } catch (err) {
    next(err);
  }
};

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

    const result = await authService.verifyResetCode(email, code);
    console.log("resultado: ", result);
    res.status(200).json(result);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


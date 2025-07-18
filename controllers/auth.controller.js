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




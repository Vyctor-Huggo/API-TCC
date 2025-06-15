  /**
   * @module repositories/auth
   * @description Repositório responsável por operações de autenticação com o banco de dados (via Prisma).
   */

  const prisma = require("../infrastructures/prisma");
  const bcrypt = require('bcrypt');


  /**
   * @typedef {Object} UserData
   * @property {string} name - Nome do usuário
   * @property {string} email - E-mail do usuário
   * @property {string} password - Senha criptografada
   */

  /**
   * Cria um novo usuário no banco.
   * 
   * @param {UserData} userData - Dados do usuário a ser criado
   * @returns {Promise<Object>} Usuário criado
   */
  exports.createUser = async (userData) => {
    return await prisma.user.create({
      data: userData,
      select: {
        email: true,
        password: true,
        createdAt: true,
      },
    });
  };

  /**
   * Busca um usuário pelo e-mail.
   * 
   * @param {string} email - E-mail do usuário
   * @returns {Promise<Object|null>} Usuário encontrado ou null
   */
  exports.findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true, // necessário para o bcrypt.compare
        createdAt: true
      }
    });
  };


  /**
   * Busca um usuário pelo ID.
   * 
   * @param {string} userId - ID do usuário
   * @returns {Promise<Object|null>} Usuário encontrado ou null
   */
  exports.findUserById = async (userId) => {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        createdAt: true,
      },
    });
  };

  /**
   * Atualiza os dados de um usuário existente.
   * 
   * @param {string} userId - ID do usuário a ser atualizado
   * @param {Partial<UserData>} newData - Dados parciais a atualizar
   * @returns {Promise<Object>} Usuário atualizado
   */
  exports.updateUserById = async (userId, newData) => {
    return await prisma.user.update({
      where: { id: userId },
      data: newData,
    });
  };


exports.saveResetToken = async (userId, token, expiresAt) => {
  await prisma.passwordResetToken.create({
    data: { userId, token, expiresAt }
  });
};

exports.findResetToken = async (token) => {
  return await prisma.passwordResetToken.findUnique({ where: { token } });
};

exports.updatePassword = async (userId, hashedPassword) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword }
  });
};


exports.deleteResetToken = async (token) => {
  await prisma.passwordResetToken.delete({ where: { token } });
};
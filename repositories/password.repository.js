  const prisma = require("../infrastructures/prisma");
  const bcrypt = require('bcrypt');

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
 * Busca um token de reset por email e código (últimos 5 caracteres).
 * 
 * @param {string} email - Email do usuário
 * @param {string} code - Últimos 5 caracteres do token
 * @returns {Promise<Object|null>} Token encontrado ou null
 */
exports.findResetTokenByEmailAndCode = async (email, code) => {
  return await prisma.passwordResetToken.findFirst({
    where: {
      token: {
        endsWith: code,
      },
      user: {
        email: email,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
    },
  });
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
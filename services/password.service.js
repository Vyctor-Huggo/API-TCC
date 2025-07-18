const authRepository = require("../repositories/password.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const { sendPasswordResetEmail } = require('../providers/email.provider');
const { v4: uuidv4 } = require('uuid');

//reset de senha

/**
 * Solicita um e-mail de redefinição de senha.
 * 
 * @param {string} email - E-mail do usuário que deseja redefinir a senha
 * @throws {Error} Se usuário não for encontrado
 */
exports.requestPasswordReset = async (email) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) throw new Error('Usuário não encontrado');

  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // expira em 1 hora

  await authRepository.saveResetToken(user.id, token, expiresAt);
  await sendPasswordResetEmail(email, token);
};

/**
 * Redefine a senha do usuário com base no token de reset.
 * 
 * @param {string} code - 5 ultimos digitos do Token de redefinição recebido no e-mail
 * @param {string} newPassword - Nova senha do usuário
 * @throws {Error} Se o token for inválido ou expirado
 */
exports.resetPassword = async (email, code, newPassword) => {
  const record = await authRepository.findResetTokenByEmailAndCode(email, code);
  if (!record || record.expiresAt < new Date()) throw new Error('Token inválido ou expirado');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await authRepository.updatePassword(record.userId, hashedPassword);
  await authRepository.deleteResetToken(record.token);
};

/**
 * Verifica se o código de verificação é válido para o email fornecido.
 * 
 * @param {string} email - Email do usuário
 * @param {string} code - Código (últimos 5 caracteres do token)
 * @returns {Promise<Object>} Resultado da verificação
 * @throws {Error} Se não encontrar ou se estiver expirado
 */
exports.verifyResetCode = async (email, code) => {
  const record = await authRepository.findResetTokenByEmailAndCode(email, code);

  if (!record) throw new Error('Código inválido ou não encontrado');

  if (record.expiresAt < new Date()) throw new Error('Código expirado');

  return { valid: true };
};

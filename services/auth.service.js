const authRepository = require("../repositories/auth.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const SECRET_KEY = process.env.SECRET_KEY;

const { sendPasswordResetEmail } = require('../providers/email.provider');
const { v4: uuidv4 } = require('uuid');

/**
 * Gera um token JWT para autenticação.
 *
 * @param {{ id: string, email: string }} user - Objeto do usuário contendo `id` e `email`
 * @returns {string} Token JWT assinado
 *
 * @example
 * const token = generateToken({ id: "123", email: "user@example.com" });
 */
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "30m",
  });
}

/**
 * Registra um novo usuário no sistema.
 * Verifica se o e-mail já está cadastrado e salva com senha criptografada.
 * 
 * @param {Object} userData - Dados do novo usuário
 * @param {string} userData.name - Nome do usuário
 * @param {string} userData.email - E-mail do usuário
 * @param {string} userData.password - Senha do usuário
 * @returns {Promise<Object>} O usuário criado
 * @throws {Error} Se o e-mail já estiver cadastrado
 */
exports.registerUser = async ({ name, email, password }) => {
  const existing = await authRepository.findUserByEmail(email);
  if (existing) throw new Error("E-mail já cadastrado");

  const hash = await bcrypt.hash(password, 10);
  return await authRepository.createUser({ name, email, password: hash });
};

/**
 * Recupera o perfil de um usuário pelo ID.
 * 
 * Essa função busca um usuário no banco de dados utilizando o ID fornecido.
 * Lança um erro caso o usuário não seja encontrado.
 * 
 * @param {string} userId - O ID do usuário a ser buscado
 * @returns {Promise<Object>} Os dados do usuário encontrado
 * 
 * @throws {Error} Se o usuário não for encontrado
 * 
 * @example
 * const profile = await getUserProfile("8b5592a4-9206-4805-b666-e4fa79e54649");
 * console.log(profile.name); // "João"
 */
exports.getUserProfile = async (userId) => {
  const user = await authRepository.findUserById(userId);
  if (!user) throw new Error("Usuário não encontrado");

  return user;
};

/**
 * Realiza o login de um usuário.
 * Compara a senha informada com o hash salvo no banco.
 * 
 * @param {Object} loginData - Dados de login
 * @param {string} loginData.email - E-mail do usuário
 * @param {string} loginData.password - Senha do usuário
 * @returns {Promise<Object>} O usuário autenticado
 * @throws {Error} Se o e-mail não existir ou a senha for inválida
 */
exports.loginUser = async ({ email, password }) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) throw new Error("E-mail não cadastrado");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Senha inválida");

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    token
  };
};

exports.updateUserPassword = async (userId, { newPassword }) => {
  const hash = await bcrypt.hash(newPassword, 10);
  const user = await authRepository.updatePassword(userId, hash);

  if (!user) throw new Error("Usuário não encontrado");

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    token
  };
};


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
 * @param {string} token - Token de redefinição recebido no e-mail
 * @param {string} newPassword - Nova senha do usuário
 * @throws {Error} Se o token for inválido ou expirado
 */
exports.resetPassword = async (token, newPassword) => {
  const record = await authRepository.findResetToken(token);
  if (!record || record.expiresAt < new Date()) throw new Error('Token inválido ou expirado');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await authRepository.updatePassword(record.userId, hashedPassword);
  await authRepository.deleteResetToken(token);
};
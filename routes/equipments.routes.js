const express = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const equipmentController = require('../controllers/equipments.controller');

/**
 * Conecta as rotas dos equipamentos ao app principal.
 *
 * @param {import("express").Express} app - A instância principal do Express
 */
function equipmentsRouter(app) {
  const router = express.Router();

  // Middleware global de autenticação
  router.use(verifyToken);

  // ===============================
  // 🔌 Elétricos
  // ===============================

  /**
   * @route POST /equipment/electric
   * @summary Cadastra um novo equipamento elétrico
   * @description Cria um equipamento do tipo elétrico vinculado ao usuário autenticado.
   */
  router.post('/electric', equipmentController.createElectric);

  /**
   * @route GET /equipment/electric
   * @summary Lista todos os equipamentos elétricos
   * @description Retorna todos os equipamentos do tipo elétrico cadastrados pelo usuário autenticado.
   */
  router.get('/electric', equipmentController.getAllElectric);

  /**
   * @route PUT /equipment/electric/:id
   * @summary Atualiza um equipamento elétrico
   * @description Edita as informações de um equipamento elétrico específico, vinculado ao usuário autenticado.
   */
  router.put('/electric/:id', equipmentController.updateElectric);

  /**
   * @route DELETE /equipment/electric/:id
   * @summary Remove um equipamento elétrico
   * @description Exclui permanentemente um equipamento elétrico do banco de dados.
   */
  router.delete('/electric/:id', equipmentController.deleteElectric);

  // ===============================
  // 💧 Hídricos
  // ===============================

  /**
   * @route POST /equipment/water
   * @summary Cadastra um novo equipamento hídrico
   * @description Cria um equipamento do tipo hídrico vinculado ao usuário autenticado.
   */
  router.post('/water', equipmentController.createWater);

  /**
   * @route GET /equipment/water
   * @summary Lista todos os equipamentos hídricos
   * @description Retorna todos os equipamentos do tipo hídrico cadastrados pelo usuário autenticado.
   */
  router.get('/water', equipmentController.getAllWater);

  /**
   * @route PUT /equipment/water/:id
   * @summary Atualiza um equipamento hídrico
   * @description Edita as informações de um equipamento hídrico específico, vinculado ao usuário autenticado.
   */
  router.put('/water/:id', equipmentController.updateWater);

  /**
   * @route DELETE /equipment/water/:id
   * @summary Remove um equipamento hídrico
   * @description Exclui permanentemente um equipamento hídrico do banco de dados.
   */
  router.delete('/water/:id', equipmentController.deleteWater);

  // Conectando ao app principal
  app.use('/equipment', router);
}

module.exports = { equipmentsRouter };

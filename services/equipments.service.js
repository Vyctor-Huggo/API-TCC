const equipmentsRepository = require('../repositories/equipments.repository');

/**
 * Energia
 */
async function addElectricEquipment(data) {
  if (!data || !data.userId || !data.name || !data.kw || !data.time || !data.totalConsum) {
    throw new Error('Dados incompletos para criar o equipamento elétrico.');
  }

  return equipmentsRepository.createEnergyEquipment(data);
}

async function listElectricEquipments(userId) {
  if (!userId) {
    throw new Error('ID do usuário é obrigatório para listar os equipamentos.');
  }

  return equipmentsRepository.getAllEnergyEquipmentsByUser(userId);
}

async function editElectricEquipment(id, data) {
  if (!id) {
    throw new Error('ID do equipamento é obrigatório para editar.');
  }

  if (!data || (!data.name && !data.kw && !data.time && !data.totalConsum)) {
    throw new Error('Dados insuficientes para atualização do equipamento.');
  }

  return equipmentsRepository.updateEnergyEquipment(id, data);
}

async function removeElectricEquipment(id) {
  if (!id) {
    throw new Error('ID do equipamento é obrigatório para deletar.');
  }

  return equipmentsRepository.deleteEnergyEquipment(id);
}

/**
 * Água
 */
async function addWaterEquipment(data) {
  return await equipmentsRepository.createWaterEquipment(data);
}

async function listWaterEquipments(userId) {
  return await equipmentsRepository.getWaterEquipmentsByUser(userId);
}

async function editWaterEquipment(id, data) {
  return await equipmentsRepository.updateWaterEquipment(id, data);
}

async function removeWaterEquipment(id) {
  return await equipmentsRepository.deleteWaterEquipment(id);
}

module.exports = {
  addElectricEquipment,
  listElectricEquipments,
  editElectricEquipment,
  removeElectricEquipment,

  addWaterEquipment,
  listWaterEquipments,
  editWaterEquipment,
  removeWaterEquipment,
};

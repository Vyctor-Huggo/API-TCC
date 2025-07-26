const equipmentsRepository = require('../repositories/equipments.repository');

/**
 * Energia
 */
async function addElectricEquipment(data) {
  if (!data || !data.userId || !data.name || !data.kw || !data.time || !data.totalConsum) {
    throw new Error('Dados incompletos para adicionar o equipamento elétrico.');
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

/**
 * Água
 */
async function addWaterEquipment(data) {
  if (!data || !data.userId || !data.name || !data.l || !data.time || !data.totalConsum) {
    throw new Error('Dados incompletos para adicionar o equipamento hídrico.');
  }

  return equipmentsRepository.createWaterEquipment(data);
}

async function listWaterEquipments(userId) {
  if (!userId) {
    throw new Error('ID do usuário é obrigatório para listar os equipamentos.');
  }

  return equipmentsRepository.getWaterEquipmentsByUser(userId);
}

async function editWaterEquipment(id, data) {
  if (!id) {
    throw new Error('ID do equipamento é obrigatório para editar.');
  }

  if (!data || (!data.name && !data.l && !data.time && !data.totalConsum)) {
    throw new Error('Dados insuficientes para atualização do equipamento.');
  }
  
  return equipmentsRepository.updateWaterEquipment(id, data);
}

async function removeEquipment(id) {
  if (!id) {
    throw new Error('ID do equipamento é obrigatório para deletar.');
  }

  return equipmentsRepository.deleteEquipment(id);
}

module.exports = {
  addElectricEquipment,
  listElectricEquipments,
  editElectricEquipment,

  addWaterEquipment,
  listWaterEquipments,
  editWaterEquipment,


  removeEquipment,
};

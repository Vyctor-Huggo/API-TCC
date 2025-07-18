const equipmentsRepository = require('../repositories/equipments.repository');

/**
 * Energia
 */
async function addElectricEquipment(data) {
  return await equipmentsRepository.createElectricEquipment(data);
}

async function listElectricEquipments(userId) {
  return await equipmentsRepository.getElectricEquipmentsByUser(userId);
}

async function editElectricEquipment(id, data) {
  return await equipmentsRepository.updateElectricEquipment(id, data);
}

async function removeElectricEquipment(id) {
  return await equipmentsRepository.deleteElectricEquipment(id);
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

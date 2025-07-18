const prisma = require("../infrastructures/prisma");

// 🌟 CRUD Genérico da tabela Equipment
async function createEquipment(data) {
  return await prisma.equipment.create({ data });
}

async function getEquipmentsByUser(userId, type) {
  return await prisma.equipment.findMany({
    where: { userId, type },
    include: {
      energy: true,
      water: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

async function updateEquipment(id, data) {
  return await prisma.equipment.update({
    where: { id },
    data,
  });
}

async function deleteEquipment(id) {
  return await prisma.equipment.delete({
    where: { id },
  });
}

// 🌟 EnergyEquipment específico
async function createEnergyData(equipmentId, data) {
  return await prisma.energyEquipment.create({
    data: { equipmentId, ...data },
  });
}

async function updateEnergyData(equipmentId, data) {
  return await prisma.energyEquipment.update({
    where: { equipmentId },
    data,
  });
}

// 🌟 WaterEquipment específico
async function createWaterData(equipmentId, data) {
  return await prisma.waterEquipment.create({
    data: { equipmentId, ...data },
  });
}

async function updateWaterData(equipmentId, data) {
  return await prisma.waterEquipment.update({
    where: { equipmentId },
    data,
  });
}

module.exports = {
  createEquipment,
  getEquipmentsByUser,
  updateEquipment,
  deleteEquipment,

  createEnergyData,
  updateEnergyData,

  createWaterData,
  updateWaterData,
};
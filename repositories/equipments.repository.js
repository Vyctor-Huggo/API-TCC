const prisma = require("../infrastructures/prisma");
/**
 * Equipamentos Elétricos
 */
async function createEnergyEquipment({ userId, name, kw, time, totalConsum }) {
  const equipment = await prisma.equipment.create({
    data: {
      name: name,
      userId: userId,
      type: 'ELECTRIC',
      energy: {
        create: {
          kw: kw, //recebe em KW
          time: time,
          totalConsum: totalConsum,
        },
      },
    },
    include: {
      energy: true,
    },
  });

  return equipment;
}

async function getAllEnergyEquipmentsByUser(userId) {
  const equipments = await prisma.equipment.findMany({
    where: { userId, type: 'ELECTRIC' },
    include: { energy: true },
  });

  return equipments.map((eq) => ({
    id: eq.id,
    name: eq.name,
    kw: (eq.energy?.kw || 0) * 1000,
    time: eq.energy?.time || 0,
    totalConsum: eq.energy?.totalConsum || 0,
  }));
}

async function updateEnergyEquipment(id, { nome, kw, time, totalConsum }) {
  await prisma.equipment.update({
    where: { id },
    data: { name: nome },
  });

  await prisma.energyEquipment.update({
    where: { equipmentId: id },
    data: {
      kw: kw,
      time: time,
      totalConsum: totalConsum,
    },
  });

  return {
    id,
    nome,
    kw,
    time,
    totalConsum,
  };
}

/**
 * Equipamentos de Água
 */
async function createWaterEquipment({ userId, name, l, time, totalConsum }) {
  const equipment = await prisma.equipment.create({
    data: {
      name: name,
      userId: userId,
      type: 'WATER',
      energy: {
        create: {
          l: l, //recebe em litros
          time: time,
          totalConsum: totalConsum,
        },
      },
    },
    include: {
      water: true,
    },
  });

  return equipment;
}

async function getWaterEquipmentsByUser(userId) {
  const equipments = await prisma.equipment.findMany({
    where: { userId, type: 'WATER' },
    include: { water: true },
  });

  return equipments.map((eq) => ({
    id: eq.id,
    name: eq.name,
    l: (eq.water?.l || 0) * 1000,
    time: eq.water?.time || 0,
    totalConsum: eq.water?.totalConsum || 0,
  }));
}

async function updateWaterEquipment(id, { nome, l, usosPorDia, consumoMes }) {
  await prisma.equipment.update({
    where: { id },
    data: { name: nome },
  });

  await prisma.energyEquipment.update({
    where: { equipmentId: id },
    data: {
      flux: l,
      time: usosPorDia,
      totalConsum: consumoMes,
    },
  });

  return {
    id,
    nome,
    kw,
    time,
    totalConsum,
  };
}

async function deleteEquipment(id) {
  await prisma.waterEquipment.delete({
    where: { equipmentId: id },
  });

  await prisma.equipment.delete({
    where: { id },
  });
}

module.exports = {
  // Energia
  createEnergyEquipment,
  getAllEnergyEquipmentsByUser,
  updateEnergyEquipment,

  // Água
  createWaterEquipment,
  getWaterEquipmentsByUser,
  updateWaterEquipment,
  

  deleteEquipment
};

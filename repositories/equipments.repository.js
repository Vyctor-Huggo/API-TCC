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

async function updateEnergyEquipment(id, { name, kw, time, totalConsum }) {
  // Atualiza o Equipment e o EnergyEquipment juntos
  const equipment = await prisma.equipment.update({
    where: { id },
    data: {
      name, // atualiza o nome
      energy: {
        update: {
          kw,
          time,
          totalConsum,
        },
      },
    },
    include: {
      energy: true,
    },
  });

  return {
    id: equipment.id,
    name: equipment.name,
    kw: equipment.energy?.kw,
    time: equipment.energy?.time,
    totalConsum: equipment.energy?.totalConsum,
  };
}

/**
 * Equipamentos de Água
 */
async function createWaterEquipment({ userId, name, flux, time, totalConsum }) {
  console.log({ userId, name, flux, time, totalConsum });
  const equipment = await prisma.equipment.create({
    data: {
      name: name,
      userId: userId,
      type: 'WATER',
      water: {
        create: {
          flux, //recebe em litros
          time,
          totalConsum,
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
    flux: eq.water?.flux || 0,
    time: eq.water?.time || 0,
    totalConsum: eq.water?.totalConsum || 0,
  }));
}

async function updateWaterEquipment(id, { nome, flux, time, totalConsum }) {
  // Atualiza o Equipment e o EnergyEquipment juntos
  const equipment = await prisma.equipment.update({
    where: { id },
    data: {
      nome, // atualiza o nome
      water: {
        update: {
          flux,
          time,
          totalConsum,
        },
      },
    },
    include: {
        water: true,
    },
  });

  return {
    id: equipment.id,
    name: equipment.name,
    flux: equipment.water?.flux,
    time: equipment.water?.time,
    totalConsum: equipment.water?.totalConsum,
  };
}

async function deleteElectricEquipment(id) {
  await prisma.energyEquipment.delete({ where: { equipmentId: id } });
  await prisma.equipment.delete({ where: { id } });
}

async function deleteWaterEquipment(id) {
  await prisma.waterEquipment.delete({ where: { equipmentId: id } });
  await prisma.equipment.delete({ where: { id } });
}

module.exports = {
  // Energia
  createEnergyEquipment,
  getAllEnergyEquipmentsByUser,
  updateEnergyEquipment,
  deleteElectricEquipment,

  // Água
  createWaterEquipment,
  getWaterEquipmentsByUser,
  updateWaterEquipment,
  deleteWaterEquipment,
};

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
    nome: eq.name,
    potencia: (eq.energyEquipment?.kw || 0) * 1000,
    horasPorDia: eq.energyEquipment?.time || 0,
    consumoMes: eq.energyEquipment?.totalConsum || 0,
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

async function deleteEnergyEquipment(id) {
  await prisma.energyEquipment.delete({
    where: { equipmentId: id },
  });

  await prisma.equipment.delete({
    where: { id },
  });
}

/**
 * Equipamentos de Água
 */
async function createWaterEquipment({ userId, nome, litrosPorUso, usosPorDia, consumoMes }) {
  const equipment = await prisma.equipment.create({
    data: {
      name: nome,
      type: 'WATER',
      userId,
    },
  });

  await prisma.waterEquipment.create({
    data: {
      equipmentId: equipment.id,
      litersPerUse: litrosPorUso,
      usesPerDay: usosPorDia,
      totalConsum: consumoMes,
    },
  });

  return {
    id: equipment.id,
    nome,
    litrosPorUso,
    usosPorDia,
    consumoMes,
  };
}

async function getWaterEquipmentsByUser(userId) {
  const equipments = await prisma.equipment.findMany({
    where: { userId, type: 'WATER' },
    include: { waterEquipment: true },
  });

  return equipments.map((eq) => ({
    id: eq.id,
    nome: eq.name,
    litrosPorUso: eq.waterEquipment?.litersPerUse || 0,
    usosPorDia: eq.waterEquipment?.usesPerDay || 0,
    consumoMes: eq.waterEquipment?.totalConsum || 0,
  }));
}

async function updateWaterEquipment(id, { nome, litrosPorUso, usosPorDia, consumoMes }) {
  await prisma.equipment.update({
    where: { id },
    data: { name: nome },
  });

  await prisma.waterEquipment.update({
    where: { equipmentId: id },
    data: {
      litersPerUse: litrosPorUso,
      usesPerDay: usosPorDia,
      totalConsum: consumoMes,
    },
  });

  return {
    id,
    nome,
    litrosPorUso,
    usosPorDia,
    consumoMes,
  };
}

async function deleteWaterEquipment(id) {
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
  deleteEnergyEquipment,

  // Água
  createWaterEquipment,
  getWaterEquipmentsByUser,
  updateWaterEquipment,
  deleteWaterEquipment,
};

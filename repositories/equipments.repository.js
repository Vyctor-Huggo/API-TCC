const prisma = require("../infrastructures/prisma");
/**
 * Equipamentos Elétricos
 */
async function createElectricEquipment({ userId, nome, potencia, horasPorDia, consumoMes }) {
  const equipment = await prisma.equipment.create({
    data: {
      name: nome,
      type: 'ELECTRIC',
      userId,
    },
  });

  await prisma.energyEquipment.create({
    data: {
      equipmentId: equipment.id,
      kw: potencia / 1000,
      time: horasPorDia,
      totalConsum: consumoMes,
    },
  });

  return {
    id: equipment.id,
    nome,
    potencia,
    horasPorDia,
    consumoMes,
  };
}

async function getElectricEquipmentsByUser(userId) {
  const equipments = await prisma.equipment.findMany({
    where: { userId, type: 'ELECTRIC' },
    include: { energyEquipment: true },
  });

  return equipments.map((eq) => ({
    id: eq.id,
    nome: eq.name,
    potencia: (eq.energyEquipment?.kw || 0) * 1000,
    horasPorDia: eq.energyEquipment?.time || 0,
    consumoMes: eq.energyEquipment?.totalConsum || 0,
  }));
}

async function updateElectricEquipment(id, { nome, potencia, horasPorDia, consumoMes }) {
  await prisma.equipment.update({
    where: { id },
    data: { name: nome },
  });

  await prisma.energyEquipment.update({
    where: { equipmentId: id },
    data: {
      kw: potencia / 1000,
      time: horasPorDia,
      totalConsum: consumoMes,
    },
  });

  return {
    id,
    nome,
    potencia,
    horasPorDia,
    consumoMes,
  };
}

async function deleteElectricEquipment(id) {
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
  createElectricEquipment,
  getElectricEquipmentsByUser,
  updateElectricEquipment,
  deleteElectricEquipment,

  // Água
  createWaterEquipment,
  getWaterEquipmentsByUser,
  updateWaterEquipment,
  deleteWaterEquipment,
};

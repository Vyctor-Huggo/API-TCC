const prisma = require("../infrastructures/prisma");

module.exports = {
  // Cria um novo equipamento elétrico
  async createElectric({ userId, nome, potencia, horasPorDia, consumoMes }) {
    const equipment = await prisma.equipment.create({
      data: {
        name: nome,
        type: 'ELECTRIC',
        userId: userId,
      },
    });

    await prisma.energyEquipment.create({
      data: {
        equipmentId: equipment.id,
        kw: potencia / 1000, // converte para kW
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
  },

  // Lista todos os equipamentos elétricos de um usuário
  async findAllElectricByUser(userId) {
    const equipments = await prisma.equipment.findMany({
      where: {
        userId: userId,
        type: 'ELECTRIC',
      },
      include: {
        energyEquipment: true,
      },
    });

    return equipments.map((eq) => ({
      id: eq.id,
      nome: eq.name,
      potencia: (eq.energyEquipment?.kw || 0) * 1000,
      horasPorDia: eq.energyEquipment?.time || 0,
      consumoMes: eq.energyEquipment?.totalConsum || 0,
    }));
  },

  // Atualiza um equipamento elétrico
  async updateElectric({ id, nome, potencia, horasPorDia, consumoMes }) {
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
  },

  // Deleta um equipamento elétrico
  async deleteElectric(id) {
    await prisma.energyEquipment.delete({
      where: { equipmentId: id },
    });

    await prisma.equipment.delete({
      where: { id },
    });
  },
};

const prisma = require("./infrastructures/prisma");

async function createEnergyEquipment({ userId, name, kw, time, totalConsum  }) {
  const equipment = await prisma.equipment.create({
    data: {
      name: name,
      userId: userId,
      type: 'ELECTRIC', // ou qualquer valor correspondente ao enum EquipmentType
      energy: {
        create: {
          kw: kw,
          time: time,
          totalConsum: totalConsum,
        },
      },
    },
    include: {
      energy: true,
    },
  });
}
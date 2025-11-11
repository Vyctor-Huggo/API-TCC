const equipmentService = require('../services/equipments.service');

/**
 * 🔌 Elétricos
 */
exports.createElectric = async (req, res) => {
  try {
    const { name, kw, time, totalConsum } = req.body;
    const equipment = await equipmentService.addElectricEquipment({ userId: req.user.id, name, kw, time, totalConsum });
    res.status(201).json(equipment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllElectric = async (req, res) => {
  try {
    const equipments = await equipmentService.listElectricEquipments(req.user.id);

    res.status(200).json(equipments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateElectric = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await equipmentService.editElectricEquipment(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const type = req.body.type;
    if (!type || !['ELECTRIC', 'WATER'].includes(type)) {
      return { error: 'Tipo de equipamento inválido ou ausente.' };
    }

    await equipmentService.removeEquipment(id, type);
    res.status(204).send();
  } catch (err) {
    console.log("erro aqui: ", err.message,"");
    res.status(400).json({ error: err.message });
  }
};

/**
 * 💧 Hídricos
 */
exports.createWater = async (req, res) => {
  try {
    const { name, flux, time, totalConsum } = req.body;
    const equipment = await equipmentService.addWaterEquipment({ userId: req.user.id, name, flux, time, totalConsum });
    res.status(201).json(equipment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllWater = async (req, res) => {
  try {
    const equipments = await equipmentService.listWaterEquipments(req.user.id);

    res.status(200).json(equipments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateWater = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("aaaaaaaaaaa");
    console.log(req.body);
    const updated = await equipmentService.editWaterEquipment(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

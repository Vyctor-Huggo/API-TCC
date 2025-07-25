const equipmentService = require('../services/equipments.service');

/**
 * 🔌 Elétricos
 */
exports.createElectric = async (req, res) => {
  console.log('🔍 req.body:', req.body);
  console.log('🔐 req.user:', req.user);
  
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
    console.log(req.user)
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

exports.deleteElectric = async (req, res) => {
  try {
    const { id } = req.params;
    await equipmentService.removeElectricEquipment(id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * 💧 Hídricos
 */
exports.createWater = async (req, res) => {
  try {
    const data = { ...req.body, id_usuario: req.userId };
    const equipment = await equipmentService.addWaterEquipment(data);
    res.status(201).json(equipment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllWater = async (req, res) => {
  try {
    const equipments = await equipmentService.listWaterEquipments(req.userId);
    res.status(200).json(equipments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateWater = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await equipmentService.editWaterEquipment(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteWater = async (req, res) => {
  try {
    const { id } = req.params;
    await equipmentService.removeWaterEquipment(id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

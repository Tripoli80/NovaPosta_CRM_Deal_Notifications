const axios = require("axios");
const { ENTITY } = require("../constants");

const dotenv = require("dotenv");

dotenv.config();

const webhookUrl = process.env.B24_WEBHOOK_URL;
const addTTN = async (req, res) => {
  const { ttn = null, id = null } = req.query;

  if (!ttn || !id) {
    return res.status(400).json({
      message: "Требуется параметр ttn & id",
    });
  }
  try {
    response = await axios.post(`${webhookUrl}/crm.${ENTITY.D}.update`, {
      id: id,
      fields: {
        UF_CRM_1553775632: ttn,
      },
      params: { REGISTER_SONET_EVENT: "N" },
    });
    res.status(200).json({
      message: "TTN ADDED",
    });
  } catch (error) {
    return res.status(401).json({ message: "Bad request" });
  }
};

const add1CNumber = async (req, res) => {
  const { order = null, id = null } = req.query;
  if (!order || !id) {
    return res.status(400).json({
      message: "Требуется параметр order & id",
    });
  }
  try {
    response = await axios.post(`${webhookUrl}/crm.${ENTITY.D}.update`, {
      id: id,
      fields: {
        UF_CRM_1693822380246: order,
      },
      params: { REGISTER_SONET_EVENT: "N" },
    });
    return res.status(200).json({
      message: "order added",
    });
  } catch (error) {
    return res.status(401).json({ message: "Bad request" });
  }
};


module.exports = {
  add1CNumber,
  addTTN,
};

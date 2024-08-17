const axios = require("axios");
const { ENTITY } = require("../constants");
const dotenv = require("dotenv");

dotenv.config();

const webhookUrl = process.env.B24_WEBHOOK_URL; // Замените на ваш вебхук

async function updateCrmEntityFields({ dealId, fields }, entity = ENTITY.D) {
  try {
    let response = null;

    switch (entity) {
      case ENTITY.D:
      case ENTITY.L:
      case ENTITY.C:
        response = await axios.post(`${webhookUrl}/crm.${entity}.update`, {
          id: dealId,
          fields,
          params: { REGISTER_SONET_EVENT: "N" },
        });

        break;
      case ENTITY.CO:
        response = await axios.post(`${webhookUrl}/crm.${entity}.update`, {
          id: dealId,
          fields,
          params: { REGISTER_SONET_EVENT: "N" },
        });

        break;

      default:
        response = null;
        break;
    }
    if (response) {
      console.log(entity, " успешно обновлена");
      return true;
    } else {
      console.error("Не удалось обновить ");
      return false;
    }
  } catch (error) {
    console.log("ubdateStage.js", error);
    // console.error("Произошла ошибка при обновлении сделки");
  }
}

async function getCrmEntity({ id }, entity = ENTITY.C) {
  try {
    let response = null;

    switch (entity) {
      case ENTITY.D:
      case ENTITY.L:
      case ENTITY.C:
      case ENTITY.CO:
        response = await axios.get(`${webhookUrl}/crm.${entity}.get?id=${id}`);

        break;
      default:
        response = null;
        break;
    }

    if (response?.data?.result) {
      return response?.data.result;
    } else {
      console.error("Не удалось обновить ");
      return false;
    }
  } catch (error) {
    console.log("ubdateStage.js", error);
    // console.error("Произошла ошибка при обновлении сделки");
  }
}

async function sendMassageB24(chatId, text) {
  console.log("🚀 ~ chatId:", chatId)
  try {
    const response = await axios.post(`${webhookUrl}/im.message.add`, {
      DIALOG_ID: chatId,
      MESSAGE: text,
      ATTACH: "",
      KEYBOARD: "",
      URL_PREVIEW: "Y",
      SYSTEM: "Y",
    });

    if (response?.data?.result) {
      return response?.data.result;
    } else {
      console.error("Не удалось отправить сообщение ");
      return false;
    }
  } catch (error) {
    console.log("ubdateStage.js", error);
    // console.error("Произошла ошибка при обновлении сделки");
  }

}
module.exports = { updateCrmEntityFields, getCrmEntity, sendMassageB24};

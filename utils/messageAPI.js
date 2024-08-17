const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const { sendMassageB24 } = require("./updateStage");
const { B24NameFields } = require("../constants");
dotenv.config();
// const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
console.log("first bot");

// bot.on("message", async (callbackQuery) => {
//   const from = callbackQuery.from;
//   const { id } = callbackQuery.chat;

//   await bot.sendMessage(
//     id,
//     `Your data: ${from?.id} / ${from?.username} | Chat id: ${id}`
//   );
// });

const sendMassage = async ({ dealId, messageText }) => {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 9 || hours >= 18) {
    // return 0;s
  }
  const urlDeal = `${process.env.BASE_URL_CRM}crm/deal/details/${dealId}/`;

  // Define the button markup
  // const opts = {
  //   reply_markup: {
  //     inline_keyboard: [
  //       [
  //         {
  //           text: "Открыть сделку",
  //           url: urlDeal,
  //         },
  //         {
  //           text: "Взял",
  //           callback_data: "button_clicked",
  //         },
  //       ],
  //     ],
  //   },
  // };
  // await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, messageText, opts);
  await sendMassageB24(B24NameFields.chatId, messageText + "\n" + urlDeal)
};

module.exports = { sendMassage };

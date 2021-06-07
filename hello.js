const { Telegraf, Markup } = require("telegraf");

bot = new Telegraf("1351501215:AAG8lVdSM3EZxnzGouODCTRHuOKM_3wbWpQ");

bot.start((msg) => {
  msg.telegram.sendMessage(msg.chat.id, "HI");
});

bot.on("message", (msg) => {
  if (msg.message.reply_markup) {
    msg.telegram.sendMessage(msg.chat.id, msg.message.text);
    msg.telegram.sendMessage(msg.chat.id, msg.message.text, {
      entities: msg.message.entities,
      reply_markup: msg.message.reply_markup,
    });
  } else {
    msg.telegram.sendMessage(msg.chat.id, msg.message.text, {
      entities: msg.message.entities,
    });
  }
});

bot.on("video", (msg) => {
  bot.telegram.sendVideo(msg.chat.id, msg.message.video.file_id);
});

bot.on("photo", (msg) => {
  bot.telegram.sendPhoto(
    msg.chat.id,
    msg.message.photo[msg.message.photo.length - 1].file_id
  );
});

bot.on("document", (msg) => {
  bot.telegram.sendDocument(msg.chat.id, msg.message.document.file_id);
});

bot.on("audio", (msg) => {
  bot.telegram.sendAudio(msg.chat.id, msg.message.audio.file_id);
});

bot.on("voice", (msg) => {
  console.log(msg.message.voice.file_id);
  bot.telegram.sendVoice(msg.chat.id, msg.message.voice.file_id);
});

bot.on("location", (msg) => {
  bot.telegram.sendLocation(
    msg.chat.id,
    msg.message.location.latitude,
    msg.message.location.longitude
  );
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

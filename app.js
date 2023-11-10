import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config({ path: "./config.env" });
import http from "http";
// const TelegramBot = require("node-telegram-bot-api");
import TelegramBot from "node-telegram-bot-api";
let imagesdata;
const bot = new TelegramBot("6468514456:AAFBsZLpkcW-Cce9QvzaIom5eh1IwVXw6n4", {
  polling: true,
});

const images = async (imageName) => {
  const imagedata = await fetch(
    `https://serpapi.com/search.json?api_key=8bd100d7d6257b9d3baf75a8c1f9f17851052a5adea916f9c5163925b7738179&engine=google_images&q=${imageName}&location=Austin,+TX,+Texas,+United+States`
  );
  const jsonData = await imagedata.json();
  const links = jsonData.images_results.map((doc) => doc.original);
  imagesdata = links;

  return links;
};

let message;
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  let image;

  if (msg.text.toLocaleLowerCase() !== message) {
    image = await images(msg.text);
    message = msg.text.toLocaleLowerCase();
  } else {
    image = imagesdata;
  }

  if (msg.text !== "/start") {
    for (let i = 0; i < 5; i++) {
      const random = parseInt(Math.random() * 20);
      bot.sendPhoto(chatId, image[random]);
    }
  } else {
    bot.sendMessage(chatId, "Search for any images😉");
  }
});

const server = http.createServer();

server.listen(process.env.PORT, () => {
  console.log(`Server listening to the server ${process.env.PORT}`);
});

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const http = require("http");
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot("6468514456:AAFBsZLpkcW-Cce9QvzaIom5eh1IwVXw6n4", {
  polling: true,
});

const images = async (imageName) => {
  const imagedata = await fetch(
    `https://serpapi.com/search.json?api_key=12436796465e5f07798ace041c98ae480b7cabfff3b6630f7ec2343fbb57e324&engine=google_images&q=${imageName}&location=Austin,+TX,+Texas,+United+States`
  );
  const jsonData = await imagedata.json();
  const links = jsonData.images_results.map((doc) => doc.original);
  return links;
};


bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const image = await images(msg.text);
  console.log(msg);
  if (msg.text !== "/start") {
    for (let i = 0; i < 5; i++) {
      const random = parseInt(Math.random() * 20);
      bot.sendPhoto(chatId, image[random]);
    }
  } else {
    bot.sendMessage(chatId, "Search for any images😉");
  }
});

const server = http.createServer((req, res) => {
  console.log("hello world");
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening to the server ${process.env.PORT}`);
});

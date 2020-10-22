require("dotenv").config({ path: "variables.env" });
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Bot is ready as ${client.user.tag}`);
  client.user.setStatus("online");
  console.log(client.user.presence.status);
});

client.login(process.env.CONTRA_DISCORD);

client.on("message", (message) => {
  console.log(message.content);
  switch (message.content) {
    case "!saludo":
      message.channel.send(`Hello ${message.author}`);
      break;
    case "!despedida":
      message.reply("Adios :(");
      break;
  }
});

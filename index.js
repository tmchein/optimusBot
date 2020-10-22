const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Bot is ready as ${client.user.tag}`);
  client.user.setStatus("idle");
  console.log(client.user.presence.status);
});

client.login("NzY4OTI1MjA1NzU3ODIwOTU4.X5HjZg.GOUShOPaRfY9kTsVMbcD35dXT3I");

client.on("message", (message) => {
  console.log(message.content);
  switch (message.content) {
    case "!saludo":
      message.channel.send(`Hello ${message.author}`);
      message.channel.send("http://youtube.com/lordchein");
      break;
    case "!despedida":
      message.reply("Adios :(");
      break;
  }
});

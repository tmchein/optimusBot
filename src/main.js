require("dotenv").config({ path: "variables.env" });
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const client = new Discord.Client();

const PREFIX = "!";

let songList = new Map();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, "./commands")).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Bot is ready as ${client.user.tag}`);
  console.log(client.user.presence.status);
});

client.on("message", (message) => {
  if (!message.content.startsWith(PREFIX)) return; //Retorna si el mensaje no inicia con el prefijo indicado
  const args = message.content.substring(PREFIX.length).split(" ");
  const cmd = args.shift().toLowerCase();

  switch (cmd) {
    case "play":
      client.commands.get("play").execute(client, message, args, songList);
      break;
    case "leave":
      client.commands.get("leave").execute(client, message, args, songList);
      break;
    case "pause":
      client.commands.get("pause").execute(client, message, args, songList);
      break;
    default:
      break;
  }
});

client.login(process.env.CONTRA_DISCORD);

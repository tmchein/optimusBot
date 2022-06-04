require("dotenv").config({ path: "variables.env" });
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const client = new Discord.Client();
const PREFIX = process.env.PREFIX;
const COMMANDS = require("./utils/executeCommands");

client.commands = new Discord.Collection();

/* Requiere de forma dinamica los archivos terminados en .js en la carpeta commands */
const commandFiles = fs.readdirSync(path.join(__dirname, "./commands")).filter((file) => file.endsWith(".js"));
let songList = new Map();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Bot is ready as ${client.user.tag}`);
  console.log(client.user.presence.status);
});

client.on("message", async (message) => {
  if (!message.content.startsWith(PREFIX)) return; //Retorna si el mensaje no inicia con el prefijo indicado
  const args = message.content.substring(PREFIX.length).split(" ");
  const cmd = args.shift().toLowerCase();
  const data = { client, message, args, songList };

  COMMANDS[cmd](data, cmd);
});

client.login(process.env.CONTRA_DISCORD);

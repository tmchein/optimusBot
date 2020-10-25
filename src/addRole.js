//Se importan los

require("dotenv").config({ path: "variables.env" });
const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.CONTRA_DISCORD);

client.on("ready", () => {
  console.log(`Bot is ready as ${client.user.tag}`);
});

const Comando = (message, commandName) => message.content.startsWith(process.env.PREFIX + commandName);

const checkRolePersmissions = (role) =>
  role.permissions.has("ADMINISTRATOR") &&
  role.permissions.has("KICK_MEMBERS") &&
  role.permissions.has("BAN_MEMBERS") &&
  role.permissions.has("MANAGE_GUILLD") &&
  role.permissions.has("MANAGE_CHANNELS");

client.on("message", (message) => {
  if (Comando(message, "rol")) {
    let args = message.content.toLowerCase().substring(5);
    let { cache } = message.guild.roles;
    let role = cache.find((role) => role.name.toLowerCase() === args);

    if (role) {
      if (message.member.roles.cache.has(role.id)) {
        message.reply("Ya tienes este rol! 🤖");
        return;
      }
      if (checkRolePersmissions(role)) {
        message.reply("Eres muy debil para tener este rol... (Haz ejercicio)😥");
      } else {
        message.member.roles
          .add(role)
          .then((member) => message.reply(`Se te dio el rol de ${role}! 💪`))
          .catch((err) => {
            console.log(err);
            message.reply("Algo ha salido mal...🤖");
          });
      }
    } else {
      message.reply("No existe este rol ¿enloqueciste? 👻");
    }
  }
});

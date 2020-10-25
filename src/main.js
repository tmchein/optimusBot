require("dotenv").config({ path: "variables.env" });
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const client = new Discord.Client();

/* Libreria de Twitter */
const Twitter = require("twitter");

/* Inicializacion de twitter */
let lector = new Twitter({
  consumer_key: process.env.KEY_TWITTER,
  consumer_secret: process.env.SECRET_KEY_TWITTER,
  access_token_key: process.env.TOKEN_TWITTER,
  access_token_secret: process.env.TOKEN_SECRET_TWITTER
});

/* Funcion que trae los ultimos 20 tweets y publica un tweet random */
function getTweet(message) {
  let random = Math.floor(Math.random() * (20 - 0)) + 0;
  let params = { screen_name: "Johanv65" };
  lector.get("statuses/user_timeline", params, function (error, tweets, response) {
    if (!error) {
      const embed = new Discord.MessageEmbed()
        .setTitle("Twitazo")
        .setDescription(tweets[random].text)
        .setColor(tweets[random].user.profile_background_color)
        .setAuthor(tweets[random].user.name, tweets[random].user.profile_image_url)
        .setFooter(tweets[random].created_at);
      message.channel.send(embed);
    }
  });
}

client.commands = new Discord.Collection();

/* Requiere de forma dinamica los archivos terminados en .js en la carpeta commands */
const commandFiles = fs.readdirSync(path.join(__dirname, "./commands")).filter((file) => file.endsWith(".js"));

/* Prefijo establecido */
const PREFIX = "!";

let songList = new Map();

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
    case "resume":
      client.commands.get("resume").execute(client, message, args, songList);
      break;
    case "skip":
      client.commands.get("skip").execute(client, message, args, songList);
      break;
    case "twitazo":
      getTweet(message);
    default:
      break;
  }
});

client.login(process.env.CONTRA_DISCORD);

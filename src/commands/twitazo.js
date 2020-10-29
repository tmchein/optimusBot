/* Libreria de Twitter */
const Twitter = require("twitter");
const { MessageEmbed } = require("discord.js");

/* Inicializacion de twitter */
let lector = new Twitter({
  consumer_key: process.env.KEY_TWITTER,
  consumer_secret: process.env.SECRET_KEY_TWITTER,
  access_token_key: process.env.TOKEN_TWITTER,
  access_token_secret: process.env.TOKEN_SECRET_TWITTER
});

module.exports = {
  name: "twitazo",
  /* Funcion que trae los ultimos 20 tweets y publica un tweet random */
  execute(client, message, args, songList) {
    let random = Math.floor(Math.random() * (20 - 0)) + 0;
    if (!args[0]) {
      message.channel.send("Debes escribir el usuario que desees ver sus tweets");
    }
    let params = { screen_name: `${args[0]}` };
    lector.get("statuses/user_timeline", params, function (error, tweets, response) {
      if (!error) {
        let date = new Date(tweets[random].created_at);
        let options = { weekday: "short", year: "numeric", month: "long", day: "2-digit" };
        const embed = new MessageEmbed()
          .setTitle("Twitazo")
          .setDescription(tweets[random].text)
          .setColor(tweets[random].user.profile_background_color)
          .setAuthor(tweets[random].user.name, tweets[random].user.profile_image_url)
          .setFooter(date.toLocaleDateString("en-US", options));
        message.channel.send(embed);
      }
    });
  }
};

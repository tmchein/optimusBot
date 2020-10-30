module.exports = {
  name: "pause",
  execute(client, message, args, songList) {
    let data = songList.get(message.guild.id);

    /* Valida si hay una canción reproduciendose */
    if (!data) {
      return message.channel.send("Actualmente no se esta reproduciendo música");
    }
    /* Comprueba si el bot esta en mismo canal del usuario */
    if (message.guild.me.voice.channelID !== message.member.voice.channelID) {
      return message.channel.send("Opps... No estas conectado al mismo canal del bot");
    }
    /* Si hay canciones reproduciendose las pausa */
    if (data.queue) {
      data.connection.dispatcher.pause();
      message.channel.send("Esta bien... ya la pausé 😅");
    }

    return undefined;
  }
};

// exports.run = (client, message, args, ops) => {
//   let fetched = message.guild.id;
//   console.log("fetched", fetched);
//   if (!fetched) return message.channel.send("Actualmente no se esta reproduciendo música");

//   if (message.member.voice.channel !== message.guild.me.voice.channel)
//     return message.channel.send("Perdon, pero no estas en el mismo canal que el bot");

//   if (fetched.dispatcher.paused) return message.channel.send("Pausado");

//   fetched.dispatcher.pause();
// };

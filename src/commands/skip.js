module.exports = {
  name: "skip",
  execute(client, message, args, songlist) {
    let data = songlist.get(message.guild.id);

    /* Comprueba si el usuario esta en un canal */
    if (!message.member.voice.channel) {
      return message.channel.send("Debes estar en un canal de voz para saltar la música");
    }
    /* Valida si hay una canción reproduciendose */
    if (!data) {
      return message.channel.send("Actualmente no se esta reproduciendo música");
    }
    /* salta a la siguiente canción */
    if (data.queue) {
      data.connection.dispatcher.end();
      message.channel.send("Esta bien... ya la salté");
    }
    return undefined;
  }
};

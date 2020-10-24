module.exports = {
  name: "resume",
  execute(cliente, message, args, songList) {
    let data = songList.get(message.guild.id);
    if (!message.member.voice.channel)
      return message.channel.send("Debes estar en un canal de voz para reanudar la música");
    if (!data) {
      return message.channel.send("Actualmente no se esta reproduciendo música");
    }
    /* Reanuda si las canciones estan en pausa */

    if (data.queue) {
      data.connection.dispatcher.resume();
      message.channel.send("He reanudado la música por ti");
    }

    return undefined;
  }
};

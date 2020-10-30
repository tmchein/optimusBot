module.exports = {
  name: "leave",
  execute(client, message, args, songList) {
    let data = songList.get(message.guild.id);

    /* Comprueba si el usuario esta en un canal */
    if (!message.member.voice.channel) {
      return message.channel.send("Por favor conectate a un canal");
    }
    /* Comprueba si el bot esta en canal del usuario */
    if (!message.guild.me.voice.channel) {
      return message.channel.send("El bot no esta conectado al servidor");
    }
    /* Comprueba si el bot esta en mismo canal del usuario */
    if (message.guild.me.voice.channelID !== message.member.voice.channelID) {
      return message.channel.send("Opps... No estas conectado al mismo canal del bot");
    }

    /* Si hay canciones reproduciendose vacia el map y saca el bot del canal */
    if (data.queue) {
      data.queue = [];
      data.connection.dispatcher.end();
      message.guild.voice.channel.leave();
    }

    message.reply(`Adios`);
    message.guild.me.voice.channel.leave();

    return undefined;
  }
};

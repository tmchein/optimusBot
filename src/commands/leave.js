module.exports = {
  name: "leave",
  execute(client, message, args, songList) {
    if (!message.member.voice.channel) {
      return message.channel.send("Por favor conectate a un canal");
    }

    if (!message.guild.me.voice.channel) {
      return message.channel.send("El bot no esta conectado al servidor");
    }
    if (message.guild.me.voice.channelID !== message.member.voice.channelID) {
      return message.channel.send("Opps... No estas conectado al mismo canal del bot");
    }

    message.reply(`Adios`);
    message.guild.me.voice.channel.leave();
  }
};

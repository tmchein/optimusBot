module.exports = {
  name: "dr",
  execute(client, message, args, songList) {
    let cacheRoles = message.guild.roles.cache;
    let cacheChannels = message.guild.channels.cache;
    let role = cacheRoles.find((role) => role.name.toLowerCase() === args[0]);
    let channel = cacheChannels.find((canal) => canal.name === role.name);

    if (role) {
      role.delete().then(message.reply("Rol eliminado satisfactoriamente"));
    } else {
      message.reply("No existe este rol");
    }

    if (channel) {
      channel.delete().then(message.reply("Se ha borrado el canal relacionado al rol"));
    } else {
      message.reply("No existe este canal");
    }
  }
};

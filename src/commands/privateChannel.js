module.exports = {
  name: "pc",
  execute(client, message, args, songlist) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let { cache } = message.guild.roles;

    const createChannel = async (nombre) => {
      await delay(1000);
      let role = cache.find((role) => role.name.toLowerCase() === nombre);
      let everyone = cache.find((role) => role.name.toLowerCase() === "@everyone");

      if (role) {
        message.member.roles.add(role).then(() => message.reply(`Se te dio el rol de ${role}! 💪`));
        message.guild.channels
          .create(nombre, {
            type: "voice",
            parent: "771145603710976000" // Parent del canal donde se añade los nuevos canales
          })
          .then((channel) => {
            channel.updateOverwrite(role.id, {
              CONNECT: true,
              VIEW_CHANNEL: true
            });
            channel.updateOverwrite(everyone.id, {
              CONNECT: false
            });
            message.reply("Canal creado satisfactoriamente");
          });
      }
    };

    if (message.content.startsWith("!pc")) {
      let checkExistentRole = cache.find((role) => role.name.toLowerCase() === args[0]);
      if (checkExistentRole) {
        message.reply("Ya existe un canal con este nombre, intenta con otro nombre 😒");
        return;
      } else {
        message.guild.roles
          .create({
            data: {
              name: args[0],
              color: "BLUE"
            },
            reason: "Canal privado"
          })
          .then(createChannel(args[0]))
          .catch(console.error);
      }
    }
  }
};

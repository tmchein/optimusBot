module.exports = {
  name: "rol",
  execute(client, message, args, songList) {
    const checkRolePersmissions = (role) =>
      role.permissions.has("ADMINISTRATOR") &&
      role.permissions.has("KICK_MEMBERS") &&
      role.permissions.has("BAN_MEMBERS") &&
      role.permissions.has("MANAGE_GUILLD") &&
      role.permissions.has("MANAGE_CHANNELS");

    if (process.env.PREFIX && "rol") {
      let { cache } = message.guild.roles;
      let role = cache.find((role) => role.name.toLowerCase() === args[0]);
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
  }
};

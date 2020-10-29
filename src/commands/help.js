const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "help",
  execute(cliente, message, args, songList) {
    /* Comprueba si el usuario esta en un canal */
    if (!message.member.voice.channel) {
      return message.channel.send("Por favor conectate a un canal");
    }

    let embed = new MessageEmbed().setColor("#0099ff").setTitle(" Estos son todos los comandos de Ains ")
      .setDescription(`**!play o !p [Nombre de la canción o link] : ** Carga la entrada y la añade a la cola. Si no hay ninguna pista en reproducción, comenzará a reproducirse.
      **!pause :** Detiene la canción que esta reproduciendose actualmente.
      **!resume :**Reanuda la canción.
      **!skip :** Salta a la siguiente canción, si no hay Ains dejará el canal.
      **!leave: **Ains deja el canal.
      **!twitazo [Nombre del usuario]:** Trae tweets de forma random. 
      **!rol [Nombre del rol]: ** Asigna un rol para entrar en un canal privado.
      **!pc [Nombre del canal]: ** Crea un nuevo canal privado [Debes tener un rol asignado para entrar]
      **!dc [Nombre del rol]: ** Elimina el rol
    `);

    message.channel.send(embed);
  }
};

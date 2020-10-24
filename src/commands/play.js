const ytdl = require("ytdl-core");

module.exports = {
  name: "play",
  async execute(client, message, args, songList) {
    /* Comprueba que el autor este en un canal */
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send("Necesitas estar en un canal para reproducir la música");
    }

    /* Comprueba si el bot ya esta en el canal */
    /* if (message.guild.me.voice.channel) {
      return message.channel.send("Lo siento, el bot ya esta conectado en este canal");
    } */

    if (!args[0]) {
      return message.channel.send("Por favor ingresa el comando '!' seguido del link");
    }

    /* Valida la información */
    let validate = await ytdl.validateURL(args[0]);

    if (!validate) {
      return message.channel.send(" Escribe una url valida");
    }

    let info = await ytdl.getInfo(args[0]);

    let data = songList.get(message.guild.id) || {};

    if (!data.connection) {
      data.connection = await message.member.voice.channel.join();
    }
    if (!data.queue) {
      data.queue = [];
    }
    data.guildID = message.guild.id;

    /* Añadir a la cola */
    data.queue.push({
      songTitle: info.videoDetails.title,
      requester: message.author.tag,
      url: args[0],
      announceChannel: message.channel.id
    });

    if (!data.dispatcher) {
      play(client, songList, data);
    } else {
      message.channel.send(
        `Añadido a la cola de reproducción: ${info.videoDetails.title} | Añadida por: ${message.author.username}`
      );
    }

    songList.set(message.guild.id, data);
  }
};

async function play(client, songList, data) {
  /* Primero enviamos el mensaje de reproducción */
  client.channels.cache
    .get(data.queue[0].announceChannel)
    .send(`Reproduciendo ahora: ${data.queue[0].songTitle} | Añadida por: ${data.queue[0].requester}`);

  /* luego actualizamos el dispatcher data */
  data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { filter: "audioonly" }));
  data.dispatcher.guildID = data.guildID;

  /* Por último se crea un songListener que funciona cuando termine la canción */
  data.dispatcher.on("finish", () => {
    /* Cuando pase esto, se llama la function finish */
    finish(client, songList, data.dispatcher);
  });
}

function finish(client, songList, dispatcher) {
  /* Obtenemos el objeto guild del map */
  let fecthed = songList.get(dispatcher.guildID);

  /* Quita el primer item en cola */
  fecthed.queue.shift();
  /* Comprobamos si la lista esta vacìa */
  if (fecthed.queue.length > 0) {
    /* Actualiza el map con la nueva cola */
    songList.set(dispatcher.guildID, fecthed);

    /* Por último llamamos la función play  */
    play(client, songList, fecthed);
  } else {
    /* Si la cola esta vacía */
    /* Elimina el objeto guil del map */
    songList.delete(dispatcher.guildID);

    /* Dejar el canal */
    let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
    if (vc) vc.leave();
  }
}

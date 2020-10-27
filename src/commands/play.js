const ytdl = require("ytdl-core");
const search = require("youtube-search");

const { MessageEmbed } = require("discord.js");
const ops = {
  maxResults: 1,
  key: process.env.GOOGLE_API_YOUTUBE,
  type: "video"
};

module.exports = {
  name: "play",
  async execute(client, message, args, songList) {
    /* Comprueba que el autor este en un canal */
    const voiceChannel = message.member.voice.channel;
    let results = await search(args.join(" "), ops).catch((err) => console.log(err));
    let link = results.results[0].link;

    if (!voiceChannel) {
      return message.channel.send("Necesitas estar en un canal para reproducir la música");
    }

    if (!link) {
      return message.channel.send("Por favor ingresa el comando '!' y después escribe la canción que deseas escuchar");
    }

    let title = results.results[0].title;

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
      songTitle: title,
      requester: message.author.username,
      url: link,
      announceChannel: message.channel.id
    });

    if (!data.dispatcher) {
      play(client, songList, data);
    } else {
      let embed = new MessageEmbed()
        .setColor("#73ffdc")
        .setTitle(`** Añadido a la cola de reproducción: ${title} **`)
        .setAuthor(`** Añadida por: [${message.author.username}] **`);

      await message.channel.send(embed);
    }

    songList.set(message.guild.id, data);
  }
};

async function play(client, songList, data) {
  /* Primero enviamos el mensaje de reproducción */
  let msgEmbed = await new MessageEmbed()
    .setColor("#eb0e3e")
    .setTitle(`🎵 Reproduciendo ahora: ${data.queue[0].songTitle} 🎵`)
    .setAuthor(`Añadida por: ${data.queue[0].requester}`);

  client.channels.cache.get(data.queue[0].announceChannel).send(msgEmbed);

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

require("dotenv").config({ path: "variables.env" });
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Bot is ready as ${client.user.tag}`);
    client.user.setStatus("online");
    console.log(client.user.presence.status);
});

client.login(process.env.CONTRA_DISCORD);

client.on("message", (message) => {


    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const createChannel = async (nombre) => {
        await delay(1000);
        let { cache } = message.guild.roles;
        let role = cache.find((role) => role.name.toLowerCase() === nombre);
        let everyone = cache.find((role) => role.name.toLowerCase() === "@everyone")
        console.log(cache);

        if (role) {
            message.member.roles.add(role).then((member) => message.reply(`Se te dio el rol de ${role}! 💪`));
            message.guild.channels
                .create(nombre, {
                    type: "voice",
                    parent: "460070324482867203",

                })
                .then(channel => {

                    channel.updateOverwrite(role.id, {
                        CONNECT: true,
                        VIEW_CHANNEL: true
                    })
                    channel.updateOverwrite(everyone.id, {
                        CONNECT: false
                    })
                    message.reply("Canal creado satisfactoriamente")
                });
        }
    };

    if (message.content.startsWith("!crearCanal")) {

        let nombre = message.content.toLowerCase().substring(12);

        message.guild.roles
            .create({
                data: {
                    name: nombre,
                    color: "BLUE"
                },
                reason: "Canal privado"
            })
            .then(createChannel(nombre))
            .catch(console.error);

    }

    if (message.content.startsWith("!borrarRol")) {
        let nombre = message.content.toLowerCase().substring(11);
        let { cache } = message.guild.roles;
        let role = cache.find((role) => role.name.toLowerCase() === nombre);

        if (role) {
            role.delete().then(message.reply("Rol eliminado satisfactoriamente"));
        } else {
            message.reply("No puedes eliminar un rol inexistente");
        }
    }
});

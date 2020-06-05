const Discord = require("discord.js");
const client = new Discord.Client();

//let myGuild = client.guilds.cache.get('673154881741258752');
module.exports = {
  name: "count",
  description: "count member",
  cooldown: 3,
  aliases: ["c"],
  execute(message, client) {
    const myGuild = message.client.guilds.cache.get(message.guild.id);
    let memberServerHas = myGuild.memberCount;
    return message.channel.send(memberServerHas);
  }
};

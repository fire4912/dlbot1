const Discord = require("discord.js");
const client = new Discord.Client();

//let myGuild = client.guilds.cache.get('673154881741258752');
module.exports = {
  name: "role",
  description: "Ping!",
  cooldown: 3,
  aliases: ["r"],
  execute(message, client) {
    //let myGuild = message.client.guilds.cache.get(message.guild.id);
    // let adminRole = messay.guildMember.roles.cache.get('name','bot');

    if (message.member.roles.cache.some(role => role.name === "owner")) {
      message.channel.send("yes u have that secret role");
    } else {
      message.channel.send("no u dont have role");
    }
  }
};

module.exports = {
  name: "discord",
  description: "Discord Server Link",
  cooldown: 3,
  execute(message, args) {
    const data = [];

    if (!args.length) {
      data.push("\u200B");
      data.push("<:DLdiscord:718071776612974642> **Discord Server**");
      //embed start from here
      const Discord = require("discord.js");
      // inside a command, event listener, etc.
      const DiscordEmbed = new Discord.MessageEmbed()
        .setColor("#7289DA")
        .setDescription("**https://darklord.eu.org/discord**");

      return message.channel.send(data, DiscordEmbed);
    }
  }
};

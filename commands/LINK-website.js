module.exports = {
  name: "website",
  description: "Offical Website Link",
  aliases: ["web", "site"],
  cooldown: 3,
  execute(message, args) {
    const data = [];

    if (!args.length) {
      data.push("\u200B");
      data.push("<:DLurl:718072209217814539> **DarkLord Offical Website**");
      //embed start from here
      const Discord = require("discord.js");
      // inside a command, event listener, etc.
      const webEmbed = new Discord.MessageEmbed()
        .setColor("#6785C4")
        .setDescription("**https://darklord.eu.org/**");

      return message.channel.send(data, webEmbed);
    }
  }
};

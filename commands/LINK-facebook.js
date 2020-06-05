module.exports = {
  name: "facebook",
  description: "Facebook Link",
  aliases: ["fb", "page"],
  cooldown: 3,
  execute(message, args) {
    const data = [];

    if (!args.length) {
      data.push("\u200B");
      data.push("<:DLfb:718091379808665661> **DarkLord Gaming Facebook Page**");
      //embed start from here
      const Discord = require("discord.js");
      // inside a command, event listener, etc.
      const fbEmbed = new Discord.MessageEmbed()
        .setColor("#3B5998")
        .setDescription("**https://www.facebook.com/DARKLORDGamingOP/**");

      return message.channel.send(data, fbEmbed);
    }
  }
};

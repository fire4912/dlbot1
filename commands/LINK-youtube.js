module.exports = {
  name: "youtube",
  description: "Youtube Channel Link",
  aliases: ["yt", "ytube", "utube"],
  cooldown: 3,
  execute(message, args) {
    const data = [];

    if (!args.length) {
      data.push("\u200B");
      data.push(
        "<:DLyoutube:718071727611052044> **DarkLord Gaming Youtube Channel **"
      );
      //embed start from here
      const Discord = require("discord.js");
      // inside a command, event listener, etc.
      const YoutubeEmbed = new Discord.MessageEmbed()
        .setColor("#FF0404")
        .setDescription(
          "**https://www.youtube.com/channel/UCf7sj0Cagq-nY0z5_P2cheQ**"
        );

      return message.channel.send(data, YoutubeEmbed);
    }
  }
};

const Discord = require("discord.js");
const client = new Discord.Client();
const { ownerID, modID, prefix } = require("../config.json");

module.exports = {
  name: "news",
  description: "news post",
  usage: "[Bot will post news on behalf of you]",
  cooldown: 5,
  execute(message, args) {
    if (message.author.id !== ownerID && message.author.id !== modID) {
      message.channel.send("**Sorry!** You do not have access to that command");
    } else {
      // approved user can do this bellow

      //  const myGuild2 = message.client.guilds.cache.get(message.guild.id);
      //	let myUser = myGuild2.client.users.fetch('714781945543786537');
      //  console.log(myUser) // My user's avatar is here!

      const data = [];

      if (!args.length) {
        data.push("@ everyone ");

        //embed start from here
        const Discord = require("discord.js");
        // inside a command, event listener, etc.
        const HelpEmbed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("DarkLord New Notice. Only for demonstration purposes")
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription("description here")
          .setImage(
            "https://via.placeholder.com/500x300/7289DA/FFFFFF/?text=notice%20image%20goes%20here"
          );

        return message.channel.send(data, HelpEmbed);
      }

      // approved user can do this above
    }
    //execute end here
  }
};

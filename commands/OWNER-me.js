const customconfig = require("../config.json");
// at the top of your file

module.exports = {
  name: "say",
  description: "me & Announcement Command",
  usage: "`#MentionChannel`*(optional)* Your Text Message",
  aliases: ["bolo", "me"],
  cooldown: 3,
  execute(message, args) {
    //470843382793633794 myid

    if (message.author.id !== customconfig.ownerID && message.author.id !== customconfig.modID1 && message.author.id !== customconfig.modID2 && message.author.id !== customconfig.modID3 && message.author.id !== customconfig.modID4 && message.author.id !== customconfig.modID5) {
      message.channel.send("**Sorry!** You do not have access to that command");
    } else {
      // approved user can do this bellow

      //if(message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command!")

      let argsresult;
      let mChannel = message.mentions.channels.first();

      message.delete();
      if (mChannel) {
        argsresult = args.slice(1).join(" ");
        mChannel.send(argsresult);
      } else {
        argsresult = args.join(" ");
        message.channel.send(argsresult);
      }

      // approved user can do this above
    }
    //execute end here
  }
};

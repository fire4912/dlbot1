const Discord = require("discord.js");
const client = new Discord.Client();
const { ownerID, modID, prefix } = require("../config.json");

module.exports = {
  name: "demo",
  description: "demo",
  aliases: ["d"],
  usage: "[demo behalf of you]",
  cooldown: 5,
  execute(message, args) {
    if (message.author.id !== ownerID && message.author.id !== modID) {
      message.channel.send("**Sorry!** You do not have access to that command");
    } else {
      // approved user can do this bellow

      message.channel.send(
        "📣 Hello " +
          message.author.username +
          "\nThank you for Always Stay with DARKLORD. We are very proud to help you and take part part to build up a community. As you can see everyone have to maintain some rules so that they could get Help from us. \n\n:regional_indicator_s: :regional_indicator_e: :regional_indicator_r: :regional_indicator_v: :regional_indicator_e: :regional_indicator_r: :small_blue_diamond: :regional_indicator_r: :regional_indicator_u: :regional_indicator_l: :regional_indicator_e: :regional_indicator_s:\n> 🔸 To Apply DARKLORD First Read <#692355415299850270> than apply in <#692355461894111333> with Your stats, IGN IGC and Experience Letter. It will take almost 3 day to join DARKLORD.\n> 🔸Must Respect others.\n> 🔸No Slag, No 18+, You are not be able to send pornography or adult pics.\n> 🔸Don't do spam in chat.\n> 🔸Don't Harass Anyone Specially any girl in the server.\n> 🔸No religion and region attack.\n> 🔸Don't share or promote your server in <#672805897634054164> \n> 🔸You can promote your server in <#691532041455534143>\n> 🔸Must check the <#690110135875403825> channel to know about any event and news.\n> 🔸Listen songs in the restricted Channel. Don't listen any song in General or Time Pass Voice Channel."
      );

      // approved user can do this above
    }
    //execute end here
  }
};

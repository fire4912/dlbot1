const customconfig = require("../config.json");
// at the top of your file

module.exports = {
  name: "delete",
  description: "delete up to 99 messages.",
  cooldown: 5,
  execute(message, args) {
    if (message.author.id !== customconfig.ownerID && message.author.id !== customconfig.modID1 && message.author.id !== customconfig.modID2 && message.author.id !== customconfig.modID3) {
      //if(message.author.id !==ownerID) {
      message.channel.send("**Sorry!** You do not have access to that command");
    } else {
      // approved user can do this bellow
      const deleteamount = parseInt(args[0]) + 1;

      if (isNaN(deleteamount)) {
        return message.reply("that doesn't seem to be a valid number.");
      } else if (deleteamount <= 1 || deleteamount > 100) {
        return message.reply("you need to input a number between 1 and 99.");
      }

      message.channel.bulkDelete(deleteamount, true).catch(err => {
        console.error(err);
        message.channel.send(
          "there was an error trying to delete messages in this channel!"
        );
      });
      // approved user can do this above
    }
    //execute end here
  }
};

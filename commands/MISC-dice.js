module.exports = {
  name: "dice",
  description: "dice!",
  cooldown: 1,
  execute(message, args) {
    //   const deleteamount = Math.round(Math.random() * (parseInt(args[0]) - 1) + 1);
    const deleteamount = Math.round(Math.random() * (6 - 1) + 1);

    message.channel.send(message.author.username + " rolled a " + deleteamount);
  }
};

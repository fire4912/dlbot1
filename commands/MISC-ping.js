module.exports = {
  name: "ping",
  description: "Ping!",
  cooldown: 3,
  aliases: ["p"],
  execute(message) {
    message.channel.send(
      "Pong! Your ping is `" +
        `${Date.now() - message.createdTimestamp}` +
        " ms`"
    );
  }
};

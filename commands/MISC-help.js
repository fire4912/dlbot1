const Discord = require("discord.js");
const customconfig = require("../config.json");
const client = new Discord.Client();
// at the top of your file

module.exports = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  aliases: ["h"],
  usage: "[command name]",
  cooldown: 3,
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      //data.push("this `supports` __a__ **subset** *of* ~~markdown~~ 😃 ```js\nfunction foo(bar) {\n  console.log(bar);\n}\n\nfoo(1);```");
      data.push("");

      //embed start from here

      //  const myGuild2 = message.client.guilds.cache.get(message.guild.id);
      //let UserHridoy = myGuild2.client.users.fetch('470843382793633794');
      // console.log(UserHridoy) // My user's avatar is here!

      const myGuild2 = message.client.guilds.cache.get(message.guild.id);
      let UserHridoy = myGuild2.client.users
        .fetch("470843382793633794")
        .then(myUser => {
          console.log(myUser.displayAvatarURL());
          // My user's avatar is here!
        });

      // inside a command, event listener, etc.
      const HelpEmbed = new Discord.MessageEmbed()

        /*
  	.setColor('#0099ff')
  .setTitle("Here's a list of all my commands")
	.setDescription('Here\'s a list of all my commands:')
	.setThumbnail('https://img.icons8.com/nolan/64/menu.png')
	.addFields(
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
          	)
	.addField('Inline field title', 'Some value here')
	.setTimestamp()
	.setFooter('Made with ❤️', 'https://graph.facebook.com/100005636414019/picture?type=large');
  
  */
        .setColor("#5874E8")
        .setTitle("DARKLORD Help")
        .setDescription(
          "My prefix for commands is ``" + customconfig.prefix + "``" + "\n"
        )

        .addField(
          "Commands",
          "\n> ``" +
            customconfig.prefix +
            "history`` - Story of Darklord" +
            "\n> ``" +
            customconfig.prefix +
            "apply`` - Information about Requirement and Apply" +
            ""
        )

        .addField(
          "Everything else",
          "\n> ``" +
            customconfig.prefix +
            "dice`` - Role Mini Dice Game (1-6)" +
            "\n> ``" +
            customconfig.prefix +
            "ping`` - Check Ping" +
            ""
        )

        .addField(
          "Useful links:",
          "\n> ``" +
            customconfig.prefix +
            "discord`` - Discord Server" +
            "\n> ``" +
            customconfig.prefix +
            "website`` - DarkLord Offical Website" +
            "\n> ``" +
            customconfig.prefix +
            "youtube`` - DarkLord Gaming Youtube Channel" +
            "\n> ``" +
            customconfig.prefix +
            "facebook`` - DarkLord Gaming Facebook Page" +
            ""
        )

        .addField(
          "\u200B",
          "**Mention** DARKLORD Bot for Prefix" +
            "\n``" +
            customconfig.prefix +
            "help`` - Shows this message" +
            ""
        )

        /*.addField('Useful links:',
                  "\n<:DLyoutube:718071727611052044> *[DarkLord Gaming](https://www.youtube.com/channel/UCf7sj0Cagq-nY0z5_P2cheQ)* || <:DLurl:718072209217814539> *[Offical Website](https://darklord.eu.org/)*" +
                  "")
  */

        .setTimestamp()
        .setFooter(
          "Made by Arafat Islam Hridoy",
          "https://cdn.glitch.com/cdb05a94-bfaf-426b-affc-5ae6fcb08d7e%2Fscroll.png?v=1591282531271"
        );

      return message.channel.send(data, HelpEmbed);
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command!");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases)
      data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(
        `**Usage:** ${customconfig.prefix}${command.name} ${command.usage}`
      );

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    message.channel.send(data, { split: true });
  }
};

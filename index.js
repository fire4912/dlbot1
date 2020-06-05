const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token, botID } = require("./config.json");
const Canvas = require("canvas");

const client = new Discord.Client({
  disableEveryone: true
});

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on("ready", () => {
  console.log("Ready!");

  // Set the user presence
  client.user.setActivity("darklord.eu.org | +help", { type: "PLAYING" });

  //guild setup
});

client.on("message", message => {
  //message.content.startsWith(client.user.username)

  //if someone mention bot --- start
  if (message.mentions.has(client.user) && !message.author.bot) {
    //we check, whether the bot is mentioned, client.user returns the user that the client is logged in as
    //this is where you put what you want to do now
    message.channel
      .send(
        "My prefix here is ``" +
          prefix +
          "``\nYou can start with ``" +
          prefix +
          "help``"
      )
      .then(msg => {
        msg.delete({ timeout: 5000 });
      })
      .catch(console.error);
  }
  //if someone mention bot --- end

  //new

  //new

  //main source dont change --- start
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.guildOnly && message.channel.type !== "text") {
    return message.reply("I can't execute that command inside DMs!");
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }

  //main source dont change --- end
}); //client.on end here

client.on("guildMemberAdd", member => {
  member.send(
    "📣 Hello " +
      member.user.tag +
      "\nThank you for Always Stay with DARKLORD. We are very proud to help you and take part part to build up a community. As you can see everyone have to maintain some rules so that they could get Help from us. \n\n:regional_indicator_s: :regional_indicator_e: :regional_indicator_r: :regional_indicator_v: :regional_indicator_e: :regional_indicator_r: :small_blue_diamond: :regional_indicator_r: :regional_indicator_u: :regional_indicator_l: :regional_indicator_e: :regional_indicator_s:\n> 🔸 To Apply DARKLORD First Read <#692355415299850270> than apply in <#692355461894111333> with Your stats, IGN IGC and Experience Letter. It will take almost 3 day to join DARKLORD.\n> 🔸Must Respect others.\n> 🔸No Slag, No 18+, You are not be able to send pornography or adult pics.\n> 🔸Don't do spam in chat.\n> 🔸Don't Harass Anyone Specially any girl in the server.\n> 🔸No religion and region attack.\n> 🔸Don't share or promote your server in <#672805897634054164> \n> 🔸You can promote your server in <#691532041455534143>\n> 🔸Must check the <#690110135875403825> channel to know about any event and news.\n> 🔸Listen songs in the restricted Channel. Don't listen any song in General or Time Pass Voice Channel."
  );
});

const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");
  let fontSize = 35;

  do {
    ctx.font = `900 ${(fontSize -= 10)}px HridoyFont`;
  } while (ctx.measureText(text).width > canvas.width - 300);

  return ctx.font;
};

client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.cache.find(
    ch => ch.name === "🌟〢welcome-leave"
  );
  if (!channel) return;

  Canvas.registerFont(__dirname + "/assets/montserratextrabold.ttf", {
    family: "HridoyFont"
  });
  const canvas = Canvas.createCanvas(800, 400);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(__dirname + "/assets/pubgbg02.png");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = "60px HridoyFont";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText("WELCOME", canvas.width / 2, 255);

  ctx.font = applyText(canvas, `${member.displayName}!`);
  ctx.fillStyle = "#a3ff12";
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.tag}`.toUpperCase(), canvas.width / 2, 290);

  ctx.font = "900 25px HridoyFont";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(
    "TO " + `${member.guild.name}`.toUpperCase(),
    canvas.width / 2,
    320
  );

  ctx.beginPath();
  ctx.arc(400, 140, 60, 0, Math.PI * 2, true);
  ctx.lineWidth = 15;
  ctx.strokeStyle = "black";
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 340, 80, 120, 120);

  const attachmentwelcome = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "Welcome2Darklord.png"
  );

  channel.send(
    `**WELCOME ${member} to ${member.guild.name}.** *The server has now ${member.guild.memberCount} Gamers.* \n*Please Read the Server rules before you have started your journey. Have a Great Day.*`,
    attachmentwelcome
  );
});

/*


client.on('guildMemberAdd', member => {
    let channel = member.guild.channels.cache.find(ch => ch.name === '🌟〢welcome-leave');
    let memberavatar = member.user.displayAvatarURL()
        if (!channel) return;
        let welcomeembed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | name : ', `${member}`)
        .addField(':microphone2: | Welcome!', `Welcome to the server, ${member}`)
        .addField(':id: | User :', "**[" + `${member.id}` + "]**")
        .addField(':family_mwgb: | Your are the member', `${member.guild.memberCount}`)
        .addField("Name", `<@` + `${member.id}` + `>`, true)
        .addField('Server', `${member.guild.name}`, true )
        .setFooter(`**${member.guild.name}**`)
        .setTimestamp()
 
        channel.send(welcomeembed);
});

*/

client.on("guildMemberRemove", async member => {
  const channel = member.guild.channels.cache.find(
    ch => ch.name === "🌟〢welcome-leave"
  );
  if (!channel) return;

  Canvas.registerFont(__dirname + "/assets/montserratextrabold.ttf", {
    family: "HridoyFont"
  });
  const canvas = Canvas.createCanvas(800, 400);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(__dirname + "/assets/pubgbg02.png");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = "60px HridoyFont";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText("GOODBYE", canvas.width / 2, 255);

  ctx.font = applyText(canvas, `${member.displayName}!`);
  ctx.fillStyle = "#a3ff12";
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.tag}`.toUpperCase(), canvas.width / 2, 290);

  ctx.font = "900 25px HridoyFont";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText("We will all miss you!", canvas.width / 2, 320);

  ctx.beginPath();
  ctx.arc(400, 140, 60, 0, Math.PI * 2, true);
  ctx.lineWidth = 15;
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 340, 80, 120, 120);

  const attachmentleave = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "Goodbye4mDarklord.png"
  );

  channel.send(
    `${member} **Has Left the Server. Bye Bye :(** \n*The server has now ${member.guild.memberCount} Gamers.*`,
    attachmentleave
  );
});

client.login(process.env.TOKEN);

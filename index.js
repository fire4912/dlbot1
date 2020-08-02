const Discord = require("discord.js");
const fs = require("fs");
const customconfig = require("./config.json");
const Canvas = require("canvas");

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
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

// sdddddddddddddddddddddddddd

client.on("messageReactionAdd", async (reaction, user) => {
  // If a message gains a reaction and it is uncached, fetch and cache the message.
  // You should account for any errors while fetching, it could return API errors if the resource is missing.
  if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
  if (reaction.partial) await reaction.fetch();

  if (user.bot) return; // If the user was a bot, return.
  if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
  if (reaction.message.guild.id !== customconfig.SERVER_ID) return; // Use this if your bot was only for one server/private server.

  if (reaction.message.channel.id === customconfig.SELF_ROLES_CHANNEL_ID) {
    // This is a #self-roles channel.
    if (reaction.emoji.name === "⚒️") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(customconfig.ROLE_ID1_minecraft); // Minecraft role.
      return user
        .send("Minecraft role was given!")
        .catch(() => console.log("Failed to send DM."));
    }

    if (reaction.emoji.name === "🎮") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(customconfig.ROLE_ID2_GamingZone); // Roblox role.
      return user
        .send("Gaming Zone role was given!")
        .catch(() => console.log("Failed to send DM."));
    }
  } else {
    return; // If the channel was not a #self-roles, ignore them.
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  // We're gonna make a trigger, if the user remove the reaction, the bot will take the role back.
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();

  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.guild.id !== customconfig.SERVER_ID) return;

  if (reaction.message.channel.id === customconfig.SELF_ROLES_CHANNEL_ID) {
    if (reaction.emoji.name === "⚒️") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(customconfig.ROLE_ID1_minecraft); // Minecraft role removed.
      return user
        .send("Minecraft role was taken!")
        .catch(() => console.log("Failed to send DM."));
    }

    if (reaction.emoji.name === "🎮") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(customconfig.ROLE_ID2_GamingZone); // Roblox role removed.
      return user
        .send("Gaming Zone role was taken!")
        .catch(() => console.log("Failed to send DM."));
    }
  } else {
    return;
  }
});

// sdddddddddddddddddddd

client.on("message", message => {
  //message.content.startsWith(client.user.username)

  //if someone mention bot --- start
  if (message.mentions.has(client.user) && !message.author.bot) {
    //we check, whether the bot is mentioned, client.user returns the user that the client is logged in as
    //this is where you put what you want to do now
    message.channel
      .send(
        "My prefix here is ``" +
          customconfig.prefix +
          "``\nYou can start with ``" +
          customconfig.prefix +
          "help``"
      )
      .then(msg => {
        msg.delete({ timeout: 5000 });
      })
      .catch(console.error);
  }
  //if someone mention bot --- end

  // eeeeeeeeeeeeeeeeeeeeee

  let rolemsg = message.content.toLowerCase();

  if (rolemsg.startsWith(customconfig.prefix + "darklordrolelist")) {
    let channel = client.channels.cache.get(customconfig.SELF_ROLES_CHANNEL_ID); // We want to sent the embed, directly to this channel.
    const embedrole = new Discord.MessageEmbed()
      .setColor(0xffffff)
      .setTitle("Pick your roles!")
      .setDescription(`⚒️ Minecraft \n\n🎮 Gaming Zone`); // We're gonna try an unicode emoji. Let's find it on emojipedia.com !
    channel.send(embedrole).then(async rolemsg => {
      await rolemsg.react("⚒️");
      await rolemsg.react("🎮");
      // We're gonna using an await, to make the react are right in order.
    });
  }

  // eeeeeeeeeeeeeeeeeeeeeeeee

  //dm code
  if (message.channel.type === "dm") {
    var argsdm = message.content.split(" ").slice(0);
    var argsdm = argsdm.slice(0).join(" ");
    var BOT_ID = client.user.id;
    var userID = message.author.id;
    if (message.content.startsWith(customconfig.prefix))
      return message.channel.send(
        ":x: Please use commands in real server! :x:"
      );
    if (message.author.bot) return;
    message.channel
      .send("This message has been send to the staff! :incoming_envelope:")
      .then(msg => msg.delete({ timeout: 3000 }));
    if (message.content.startsWith(customconfig.prefix)) return;
    if (argsdm.length > 1024)
      return message.reply(
        "Your message content too many characters (1024 Limit) :/"
      );
    var DMembed = new Discord.MessageEmbed()
      .setColor("#0167DD")
      .setAuthor(
        "New Message",
        "https://cdn.discordapp.com/attachments/502649544622735362/520740243133956138/receive.png"
      )
      // .setDescription("**" + argsdm + "**")
      .addField(`Sent by: ${message.author.tag}`, "**" + argsdm + "**")
      // .setTitle("*Message**:")
      // .setURL(message.author.avatarURL())
      .setFooter(
        "This Message Was Sent By: " + message.author.username + " ",
        message.author.displayAvatarURL()
      )
      .setTimestamp();
    client.guilds.cache
      .get(customconfig.SERVER_ID)
      .channels.cache.get(customconfig.dm_CHANNEL_ID)
      .send(DMembed)
      .catch(
        console.log(
          `Message recieved from ${userID}!(${message.author.username})`
        )
      );
    client.guilds.cache
      .get(customconfig.SERVER_ID)
      .channels.cache.get(customconfig.dm_CHANNEL_ID)
      .send({
        embed: {
          description: `${customconfig.prefix}reply ${message.author.id} <message>`
        }
      });
  } else if (message.content.startsWith(customconfig.prefix + "reply")) {
    if (
      message.author.id !== customconfig.ownerID &&
      message.author.id !== customconfig.modID1 &&
      message.author.id !== customconfig.modID2 &&
      message.author.id !== customconfig.modID3 &&
      message.author.id !== customconfig.modID4 &&
      message.author.id !== customconfig.modID5 
    )
      return message.reply("You cannot use that!");
    var argsdm = message.content.split(" ").slice(0);
    var Rargsdm = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    var userID = argsdm[1];
    if (isNaN(argsdm[1]))
      return message.reply(
        "This is not an ID! Make sure to you the user's ID!"
      );

    /* var replyembed = new Discord.MessageEmbed()
            .setColor('#00ff26')
            .setAuthor("New Message", "https://cdn.discordapp.com/attachments/502649544622735362/520740243133956138/receive.png")
            .setDescription(Rargsdm)
            .setTitle("**Message**:")
            .setFooter("This Message Was Sent By: " + message.author.username + " ", message.author.displayAvatarURL())
        */

    client.users.cache
      .get(userID)
      .send(Rargsdm)
      .catch(console.log(`Message was sent to ${userID}!`));
    if (message.author.bot) return;
    message.channel
      .send("Your Message was Sent!")
      .then(msg => msg.delete({ timeout: 3000 }))
      .catch(console.error);
  }
  //dm code

  //new

  //new

  //main source dont change --- start
  if (!message.content.startsWith(customconfig.prefix) || message.author.bot)
    return;

  const args = message.content.slice(customconfig.prefix.length).split(/ +/);
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
      reply += `\nThe proper usage would be: \`${customconfig.prefix}${command.name} ${command.usage}\``;
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

//
//audit log
const LOGchannel = "📜〢log";
const Auditlog = require("discord-auditlog");
Auditlog(client, {
  "488640051064864768": {
    //main server darklord official
    auditlog: LOGchannel, // Member Nickname Change Member Update Avatar Member Update Discriminator Member Update Username
    // Member Role Changed (require trackrole: true)
    movement: LOGchannel, // Member Join the Server Member Leave the Server Member is Banned Member is Unbanned
    auditmsg: LOGchannel, // Message Deleted Message Updated
    voice: LOGchannel, // Set a Channel name if you want it
    trackroles: true, // Default is False
    excludedroles: ["5421651"] // Member joining a Channel Member leaving a Channel Member switching a Channel
  }
});
//audit log
//

//add role to new member
client.on("guildMemberAdd", member => {
  console.log("User " + member.user.username + " has joined the server!");
  //var role = member.guild.roles.cache.find(role => role.name === 'army');
  var role = member.guild.roles.cache.get("720237874468880590"); //army
  member.roles.add(role);
});
//add role to new member

client.on("guildMemberAdd", member => {
  member.send(
    "📣 Hello " +
      member.user.tag +
      "\nThank you for Always Stay with DARKLORD. We are very proud to help you and take part part to build up a community. As you can see everyone have to maintain some rules so that they could get Help from us. \n\n:regional_indicator_s: :regional_indicator_e: :regional_indicator_r: :regional_indicator_v: :regional_indicator_e: :regional_indicator_r: :small_blue_diamond: :regional_indicator_r: :regional_indicator_u: :regional_indicator_l: :regional_indicator_e: :regional_indicator_s:\n> 🔸 To Apply DARKLORD First Read <#692355415299850270> than apply in <#692355461894111333> with Your stats, IGN IGC and Experience Letter. It will take almost 3 day to join DARKLORD.\n> 🔸Must Respect others.\n> 🔸No Slag, No 18+, You are not be able to send pornography or adult pics.\n> 🔸Don't do spam in chat.\n> 🔸Don't Harass Anyone Specially any girl in the server.\n> 🔸No religion and region attack.\n> 🔸Don't share or promote your server in <#672805897634054164> \n> 🔸You can promote your server in <#718413496613732452>\n> 🔸Listen songs in the restricted Channel. Don't listen any song in General or Time Pass Voice Channel."
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
    ch => ch.name === "☛〣🌟╎welcome-leave"
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
    let channel = member.guild.channels.cache.find(ch => ch.name === '☛〣🌟╎welcome-leave');
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
    ch => ch.name === "☛〣🌟╎welcome-leave"
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

// sdasddsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

// sdasddsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

client.login(process.env.TOKEN);

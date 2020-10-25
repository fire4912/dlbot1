const Discord = require('discord.js');
const MessageEmbed = require('discord.js')

module.exports = {
name: 'social',
aliases: 'links'
description: 'Show all of Links at once',
execute(msg,args) {
const sembed = new Discord.MessageEmbed()
setTitle('Follow DarkLord')
setColor()
setFooter('darklord.pubgmlite@gmail.com')
setDescription(`<:DLdiscord:718071776612974642> - [Discord](https://darklord.eu.org/discord)\n<:DLfb:718091379808665661> - [Facebook Page](https://www.facebook.com/DARKLORDGamingOP)\n<:DLyoutube:718071727611052044> - [Youtube](https://www.youtube.com/channel/UCf7sj0Cagq-nY0z5_P2cheQ)\n<:DLurl:718072209217814539> - [Website](https://darklord.eu.org/)`);

return message.channel.send(sembed);

message.delete();
  }
};

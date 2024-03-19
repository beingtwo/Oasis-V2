const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'commands',
  description: 'List all commands or specific information about each command.',
  execute(message) {
    const commandsEmbed = new EmbedBuilder()
      .setColor(0x3498DB) // Blue color
      .setTitle('**Commands List**')
      .setThumbnail('https://media.discordapp.net/attachments/1211313757431791616/1211524811742912512/mglovmR.png?ex=65ee8368&is=65dc0e68&hm=4cbfe902f37aa093bac287019ebff538eac0e522483fd2f74c20a13381143336&=&format=webp&quality=lossless&width=151&height=151')
      .addFields(
        { name: '**Administrative Commands**', value: '`-ban`\n`-unban`\n`-kick`\n`-vmute`\n`-vunmute`\n`-timeout`\n`-untimeout`' },
        { name: '**Verification Commands**', value: '`-verify`\n`-verifyhelp`' },
        { name: '**Misc Commands**', value: '`-commands`\n`-help`' },
        { name: '**Fun Commands**', value: '`-dumb`\n`-fact`' },
        { name: '**Early Access Commands**', value: 'Stay tuned for updates!' },
        { name: '**Developers**', value: '-uptime\n-refreshbot\n-ping' }
      )
      .setTimestamp()
      .setFooter({ text: 'Use -help to contact staff members if you need any addtional help. (Abusing this command will result in a ban. '});

    // Send the embed in the channel where the command was executed
    message.reply({ embeds: [commandsEmbed] });
  },
};

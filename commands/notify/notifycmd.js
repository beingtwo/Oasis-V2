const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'notifycmd',
  description: 'List all commands or specific information about each command.',
  execute(message) {
    const commandsEmbed = new EmbedBuilder()
      .setColor(0x3498DB) // Blue color
      .setTitle('**Notify Commands List**')
      .setThumbnail('https://media.discordapp.net/attachments/1211313757431791616/1211524811742912512/mglovmR.png?ex=65ee8368&is=65dc0e68&hm=4cbfe902f37aa093bac287019ebff538eac0e522483fd2f74c20a13381143336&=&format=webp&quality=lossless&width=151&height=151')
      .addFields(
        { name: '**Notification Tutorial/Commands**', value: '`-announce`\n`-event`\n`-update`\n\n`h = hour\nm = minute\ns=second`\n\n`Tutorial(Example) : s!announce 5m Woah cool announcement holy`\n' }
      )
      .setTimestamp()
      .setFooter({ text: 'Ping being2 for help'});

    // Send the embed in the channel where the command was executed
    message.reply({ embeds: [commandsEmbed] });
  },
};

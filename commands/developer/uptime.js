const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'uptime',
  description: 'Displays how long the bot has been online.',
  async execute(message) {
    // ID of the required role
    const requiredRoleId = "1219662187862294639";

    // Check if the user has the required role
    if (!message.member.roles.cache.has(requiredRoleId)) {
      return message.reply("You don't have permission to use this command.");
    }

    let totalSeconds = (message.client.uptime / 1000);
    const days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const uptimeEmbed = new EmbedBuilder()
      .setColor(0x3498DB) // Blue color
      .setTitle('🕒 Bot Uptime')
      .setDescription(`The bot has been online for **${days}** days, **${hours}** hours, **${minutes}** minutes, and **${seconds}** seconds.`)
      .setTimestamp();

    await message.reply({ embeds: [uptimeEmbed] });
  },
};

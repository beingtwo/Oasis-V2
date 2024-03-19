const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Displays the bot\'s current ping.',
  async execute(message) {
    // ID of the required role
    const requiredRoleId = "1219662187862294639";

    // Check if the user has the required role
    if (!message.member.roles.cache.has(requiredRoleId)) {
      return message.reply("You don't have permission to use this command.");
    }

    const sent = await message.reply('Pinging...');
    const timestamp = (sent.editedTimestamp || sent.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp);
    const APIPing = message.client.ws.ping;

    const pingEmbed = new EmbedBuilder()
      .setColor(0x3498DB) // Blue color
      .setTitle('🏓 Pong!')
      .addFields(
        { name: 'Round-Trip Latency', value: `${timestamp}ms`, inline: true },
        { name: 'WebSocket Heartbeat', value: `${APIPing}ms`, inline: true }
      )
      .setTimestamp();

    // Edit the original message with the ping information
    await sent.edit({ content: ' ', embeds: [pingEmbed] });
  },
};

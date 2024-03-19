const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'untimeout',
  description: 'Remove the timeout from a user in the server.',
  async execute(message, args) {
    // Check if the message author has the permissions to manage timeouts
    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return message.reply("You don't have permission to manage timeouts.");
    }

    const userId = args[0];

    try {
      const memberToUnmute = await message.guild.members.fetch(userId);
      if (!memberToUnmute) {
        return message.reply("Couldn't find a user with that ID.");
      }

      // Debugging: Log the communicationDisabledUntilTimestamp
      console.log(`Timeout Until: ${new Date(memberToUnmute.communicationDisabledUntilTimestamp).toISOString()}`);

      // Check if the user is currently timed out by ensuring the timestamp is in the future
      if (!memberToUnmute.communicationDisabledUntilTimestamp || memberToUnmute.communicationDisabledUntilTimestamp <= Date.now()) {
        return message.reply("This user is not currently timed out.");
      }

      // Remove the timeout
      await memberToUnmute.timeout(null);

      const untimeoutEmbed = new EmbedBuilder()
        .setColor(0x3498DB) // Blue color
        .setTitle('**Timeout Removed**')
        .setDescription(`${memberToUnmute.user.tag} has been removed from timeout.`)
        .setTimestamp();

      await message.reply({ embeds: [untimeoutEmbed] });
    } catch (error) {
      console.error(error);
      message.reply('Failed to remove the timeout. There might have been an unexpected error.');
    }
  },
};

const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'timeout',
  description: 'Permanently timeout a user in the server.',
  async execute(message, args) {
    // Check if the message author has the permissions to mute members
    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return message.reply("You don't have permission to mute members.");
    }

    const userId = args[0];
    const reason = args.slice(1).join(' ') || 'No reason provided';
    const maxDuration = 28 * 24 * 60 * 60 * 1000; // Maximum duration (28 days in milliseconds)

    try {
      const memberToMute = await message.guild.members.fetch(userId);
      if (!memberToMute) {
        return message.reply("Couldn't find a user with that ID.");
      }

      // Check if the command issuer can actually mute the target user
      if (!memberToMute.moderatable) {
        return message.reply("I can't timeout this user. They might have a higher role than me or the same role as you.");
      }

      // DM the user about the timeout
      const dmEmbed = new EmbedBuilder()
        .setColor(0xFF0000) // Red color for warning
        .setTitle('**Timeout Notice**')
        .setDescription('You have been permanently timed out from the server.')
        .addFields(
          { name: '**Reason**', value: reason }
        )
        .setTimestamp();

      await memberToMute.send({ embeds: [dmEmbed] }).catch(error => console.log(`Could not send DM to user ${memberToMute.user.tag}. Error: ${error}`));

      // Applying the "permanent" mute by setting the timeout to the maximum duration
      await memberToMute.timeout(maxDuration, reason);

      const muteEmbed = new EmbedBuilder()
        .setColor(0x3498DB) // Blue color
        .setTitle('**Timeout Applied**')
        .setDescription(`${memberToMute.user.tag} has been timed out permanently.`)
        .addFields(
          { name: '**Timed Out User**', value: memberToMute.user.tag, inline: true },
          { name: '**Reason**', value: reason, inline: true }
        )
        .setTimestamp();

      await message.reply({ embeds: [muteEmbed] });
    } catch (error) {
      console.error(error);
      message.reply('Failed to apply the timeout. There might have been an unexpected error.');
    }
  },
};

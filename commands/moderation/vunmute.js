const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'vunmute',
  description: 'Unmutes a user in the voice channel.',
  async execute(message, args) {
    // Check if the message author has the permissions to unmute members
    if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
      return message.reply("You don't have permission to unmute members.");
    }

    const userId = args[0];

    try {
      const memberToUnmute = await message.guild.members.fetch(userId);
      if (!memberToUnmute) {
        return message.reply("Couldn't find a user with that ID.");
      }

      // Check if the member is in a voice channel
      if (!memberToUnmute.voice.channel) {
        return message.reply(`${memberToUnmute.user.tag} is not in a voice channel.`);
      }

      // Attempt to unmute the member
      await memberToUnmute.voice.setMute(false, 'Unmuted by command');

      // Confirmation message in the server
      const confirmEmbed = new EmbedBuilder()
        .setColor(0x57F287) // Green color
        .setTitle('**Voice Unmute**')
        .setDescription(`${memberToUnmute.user.tag} has been unmuted in the voice channel.`)
        .setTimestamp();

      await message.reply({ embeds: [confirmEmbed] });
    } catch (error) {
      console.error(error);
      message.reply('Failed to unmute the user. There might have been an unexpected error.');
    }
  },
};

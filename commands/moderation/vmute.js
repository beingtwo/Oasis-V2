const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'vmute',
  description: 'Voice chat mute a user in the server.',
  async execute(message, args) {
    // Check if the message author has the permissions to mute members
    if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
      return message.reply("You don't have permission to mute members in voice channels.");
    }

    const userId = args[0];
    const reason = args.slice(1).join(' ') || 'No reason provided';

    try {
      const memberToMute = await message.guild.members.fetch(userId).catch(() => null);
      if (!memberToMute) {
        return message.reply("Couldn't find a user with that ID in this server.");
      }

      // Check if the member is in a voice channel
      if (!memberToMute.voice.channel) {
        return message.reply(`${memberToMute.user.tag} is not in a voice channel.`);
      }

      // Mute the user in voice channel
      await memberToMute.voice.setMute(true, reason);

      // DM the user about the mute
      const dmEmbed = new EmbedBuilder()
        .setColor(0xFFA500) // Orange color
        .setTitle('Voice Mute Notice')
        .setDescription(`You have been muted in voice chat in ${message.guild.name}.`)
        .addFields(
          { name: 'Reason', value: reason }
        )
        .setTimestamp();

      await memberToMute.send({ embeds: [dmEmbed] }).catch(() => console.log(`Could not send DM to ${memberToMute.user.tag}.`));

      // Confirmation message in the server
      const confirmEmbed = new EmbedBuilder()
        .setColor(0x3498DB) // Blue color
        .setTitle('Voice Mute Executed')
        .setDescription(`${memberToMute.user.tag} has been muted in voice chat.`)
        .addFields(
          { name: 'Reason', value: reason }
        )
        .setTimestamp();

      await message.reply({ embeds: [confirmEmbed] });
    } catch (error) {
      console.error(error);
      message.reply('Failed to voice mute the user. There might have been an unexpected error.');
    }
  },
};

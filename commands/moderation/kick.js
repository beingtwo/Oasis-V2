const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kick a user from the server using their ID.',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return message.reply("You don't have permission to kick members.");
    }

    if (args.length < 1) {
      return message.reply("Please provide the ID of the user you want to kick.");
    }

    const userId = args[0];
    const reason = args.slice(1).join(' ') || 'No reason provided';

    try {

      const memberToKick = await message.guild.members.fetch(userId).catch(() => null);

      if (!memberToKick) {
        return message.reply("Couldn't find a user with that ID in this server.");
      }


      const kickEmbedDM = new EmbedBuilder()
        .setColor(0xFF0000) 
        .setTitle('**Kick Notice**')
        .setDescription('You have been temporarily removed from the server as a warning. However, you will still be able to rejoin back.')
        .addFields(
          { name: '**Reason**', value: reason },
          { name: '**Further Action**', value: 'If you believe this was a mistake, you can contact the server admin.' }
        )
        .setTimestamp();

      await memberToKick.send({ embeds: [kickEmbedDM] }).catch(err => console.log(`Could not DM user ${userId}.`));


      await memberToKick.kick(reason);


      const confirmEmbed = new EmbedBuilder()
        .setColor(0x3498DB)
        .setTitle('**Kick Successful**')
        .setDescription(`${memberToKick.user.tag} has been kicked from the server.`)
        .addFields(
          { name: '**Kicked User**', value: memberToKick.user.tag, inline: true },
          { name: '**Reason**', value: reason, inline: true }
        )
        .setTimestamp();


      await message.reply({ embeds: [confirmEmbed] });
    } catch (error) {
      console.error(error);
      message.reply('Failed to kick the user. They might not be in the guild, or an unexpected error occurred.');
    }
  },
};

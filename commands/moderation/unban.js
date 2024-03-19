const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'unban',
  description: 'Unban a user from the server.',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.reply("You don't have permission to unban members.");
    }

    const userId = args[0];
    if (!userId) {
      return message.reply("Please provide the ID of the user you want to unban.");
    }

    try {
      const ban = await message.guild.bans.fetch(userId);
      await message.guild.bans.remove(userId);

      const confirmEmbed = new EmbedBuilder()
        .setColor(0x3498DB) 
        .setTitle('**Unban Successful**')
        .setDescription(`${ban.user.tag} has been successfully unbanned.`)
        .addFields(
          { name: '**Unbanned User**', value: ban.user.tag, inline: true },
          { name: '**User ID**', value: userId, inline: true }
        )
        .setTimestamp();


      message.reply({ embeds: [confirmEmbed] });
    } catch (error) {
      if (error.code === 10013) {
        message.reply("Couldn't find a user with that ID in the ban list.");
      } else {
        console.error(error);
        message.reply('Failed to unban the user. There might have been an error with the unban process.');
      }
    }
  },
};

const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban a user from the server.',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.reply("**You don't have permission to ban members.**");
    }

    const userId = args[0];
    const reason = args.slice(1).join(' ') || 'No reason provided';

    try {
      const userToBan = await message.client.users.fetch(userId);

      const banEmbedDM = new EmbedBuilder()
        .setColor(0xFF0000) 
        .setTitle('**Ban Notice**')
        .setDescription('You have been permanently blacklisted from Shimo Dynasty for violating our terms of service, and you are no longer part of our community. If you wish to appeal, please appeal through the appeal form.')
        .addFields(
          { name: '**Reason**', value: reason },
          { name: '**Appeal**', value: 'Please fill this form to appeal: Not available until further notice.' }
        )
        .setTimestamp();


      await userToBan.send({ embeds: [banEmbedDM] }).catch(err => console.log(`Could not DM user ${userId}.`));


      await message.guild.members.ban(userToBan, { reason });


      const confirmEmbed = new EmbedBuilder()
        .setColor(0x3498DB) 
        .setTitle('**Ban Successful**')
        .setDescription(`${userToBan.tag} has been permanently banned.`)
        .addFields(
          { name: '**Banned User**', value: userToBan.tag, inline: true },
          { name: '**Reason**', value: reason, inline: true }
        )
        .setTimestamp();


      await message.reply({ embeds: [confirmEmbed] });
    } catch (error) {
      if (error.code === 10013 || error.code === 50035) {
        message.reply("Couldn't find a user with that ID.");
      } else {
        console.error(error);
        message.reply('Error : Failed to ban the user. They might not be in the guild, or an unexpected error occurred. | ID : 404');
      }
    }
  },
};
const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'clearchannel',
  description: 'Clears all messages in a specified channel.',
  async execute(message, args) {
    // Check if the user has the permission to manage messages
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return message.reply("You don't have permission to clear channels.");
    }

    // Check if a channel ID was provided
    if (!args.length) {
      return message.reply('Please provide the ID of the channel you want to clear.');
    }

    const channelId = args[0];
    const channel = message.guild.channels.cache.get(channelId);

    if (!channel) {
      return message.reply('Could not find a channel with that ID.');
    }

    if (!channel.isTextBased()) {
      return message.reply('This command can only be used on text channels.');
    }

    // Confirmation before deleting messages
    message.reply(`Are you sure you want to clear all messages in ${channel.name}? Type 'yes' to confirm.`).then(() => {
      const filter = m => m.author.id === message.author.id;
      message.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] })
        .then(collected => {
          if (collected.first().content.toLowerCase() === 'yes') {
            // Proceed with clearing the channel
            async function clearChannel(channel) {
              let fetched;
              do {
                fetched = await channel.messages.fetch({ limit: 100 });
                channel.bulkDelete(fetched).catch(error => message.channel.send(`Error: ${error}`));
              }
              while (fetched.size >= 2);
              message.channel.send(`Cleared all messages in ${channel.name}.`);
            }

            clearChannel(channel);
          } else {
            message.channel.send('Channel clear canceled.');
          }
        })
        .catch(() => {
          message.channel.send('No confirmation received, canceling channel clear.');
        });
    });
  },
};

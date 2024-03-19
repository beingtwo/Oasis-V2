const { EmbedBuilder, GatewayIntentBits } = require('discord.js');

module.exports = function(client) {
    const CHANNEL_ID = '1212603105120755813'; // The channel where the reaction role message will be sent
    const roleMappings = {
      '📢': '1212619360871518300',
        '🎮': '1212619441632968864',
        '❗': '1212619539146080346',
        '🎁': '1212619602119364709',
    };

    client.on('messageCreate', async message => {
        if (message.content.toLowerCase() === '!setuprr' && message.channel.id === CHANNEL_ID) {
            const embed = new EmbedBuilder()
                .setTitle('🔮 **Self-Assignable Roles**')
                .setDescription('Please select with the according options to give yourself your roles.\n\n' +
                    '📢 - Get notified by news related to this server and more.\n' +
                    '🎮 - Get notified of events hosted by councils or higher in the future.\n' +
                    '❗ - Get notified by updates related to this server.\n' +
                    '🎁 - Get notified by giveaway related to this server.\n\n' +
                    '**If you need any additional help please send s!help in bot commands to contact a staff member in our server.**\n')
                .setColor(0x3498DB)
                .setFooter({ text: 'Shimo Reaction Role Panel' });

            const sentMessage = await message.channel.send({ embeds: [embed] });
            const reactions = ['📢', '🎮', '❗', '🎁'];
            reactions.forEach(emoji => sentMessage.react(emoji));
        }
    });

    async function handleReaction(reaction, user, add) {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;
        if (reaction.message.channel.id !== CHANNEL_ID) return;

        const roleId = roleMappings[reaction.emoji.name];
        if (!roleId) return;

        const member = await reaction.message.guild.members.fetch(user.id).catch(console.error);
        if (!member) return;

        if (add) {
            member.roles.add(roleId).catch(console.error);
        } else {
            member.roles.remove(roleId).catch(console.error);
        }
    }

    client.on('messageReactionAdd', (reaction, user) => handleReaction(reaction, user, true));
    client.on('messageReactionRemove', (reaction, user) => handleReaction(reaction, user, false));
};

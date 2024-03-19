// joinmessage.js
module.exports = (client) => {
  client.on('guildMemberAdd', (member) => {
    const channelId = '1213128303909539921'; // Replace with your actual channel ID
    const channel = member.guild.channels.cache.get(channelId);

    if (!channel) {
      console.error('Could not find channel');
      return;
    }

    const embed = {
      title: `**Welcome to Shimo Dynasty Server!**`,
      description: `👋 Welcome to our server, ${member.user.toString()}! We're a proud clan within the British Army and also a super cool place to chill. Lion_m27 has a lot of love for every single member! Feel free to become part of our Shimo family. We're active every day and sure you'll enjoy your time with us.`,
      color: 0x3498DB,
      timestamp: new Date(),
      footer: {
        text: 'Enjoy your stay!',
      },
      thumbnail: {
        url: member.user.displayAvatarURL({ dynamic: true, size: 256 }),
      },
    };

    channel.send({ embeds: [embed] });
  });
};

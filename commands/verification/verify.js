const { PermissionsBitField, EmbedBuilder } = require('discord.js');

// Verification images and their corresponding answers
const verificationImages = [
  {
    url: 'https://cdn.discordapp.com/attachments/1211313653744279584/1211512923147472917/8xrFRMQ.png',
    answer: '10GFLKKA',
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1211313653744279584/1211512923416035450/mGkJDHv.png',
    answer: 'A1K53LEE',
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1211313653744279584/1211512923630075934/T4SvdrQ.png',
    answer: 'GG8QAPBV',
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1211313653744279584/1211512923894321184/VP1KJ8L.png',
    answer: 'M5LL1AG0',
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1211313653744279584/1211512924187795556/zzZ9AVX.png',
    answer: 'TGJ501LA',
  },

  // Add the rest of your images and answers here
];

module.exports = {
  name: 'verify',
  description: 'Verify a user in the server.',
  async execute(message, args) {
    // ID of the role to give upon successful verification
    const verifiedRoleId = '1207689174572867624';

    // Check if the user already has the verified role
    if (message.member.roles.cache.has(verifiedRoleId)) {
      return message.reply({ content: "You're already verified.", ephemeral: true });
    }

    // Select a random verification image
    const randomImage = verificationImages[Math.floor(Math.random() * verificationImages.length)];

    const sendVerificationDM = async () => {
      try {
        const dmChannel = await message.author.createDM();

        const verificationEmbed = new EmbedBuilder()
          .setTitle('Verification')
          .setDescription('You have exactly 1 minute to complete the verification, or it will time out, and you will have to wait an additional 10 minutes to verify. Once you are done, please send your answer to me in the DMs')
          .setImage(randomImage.url)
          .setColor(0x3498DB); // Example color, adjust as necessary

        await dmChannel.send({ embeds: [verificationEmbed] });

        const filter = response => response.author.id === message.author.id;
        const collector = dmChannel.createMessageCollector({ filter, time: 60000, max: 1 });

        collector.on('collect', m => {
          if (m.content.toUpperCase() === randomImage.answer) {
            // Correct answer, add the verified role
            message.member.roles.add(verifiedRoleId).then(() => {
              m.reply('Verification successful, you may now proceed.');
            }).catch(err => {
              console.error(err);
              m.reply('Failed to assign the verified role, please contact an admin.');
            });
          } else {
            // Incorrect answer
            m.reply('Incorrect, please try again.');
          }
        });

        collector.on('end', collected => {
          if (collected.size === 0) {
            dmChannel.send('Verification timed out, please try again.');
          }
        });

        // Notify the user in the server about the DM
        message.reply('Successfully DM\'ed, please check your DMs.');
      } catch (error) {
        console.error(error);
        message.reply('Cannot DM you, please try again later or adjust your privacy settings.');
      }
    };

    await sendVerificationDM();
  },
};
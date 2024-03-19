const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'fact',
  description: 'Displays a random fact.',
  execute(message) {
    const facts = [
      "Did you know that this bot is made in 2/25/2024",
      "Did you know that lion_m27 is sigma",
      "Did you know that Shimo dynasty have 3 prime ministers",
      "Did you know that there is secret command in this bot (nobody will figure it out)",
      "Did you know that only 1 developer develop the bot and make the bot within 3 days",
      "Did you know that there is 5 bots in our server",
      "Did you know that someone is watching you",
      "Did you know that Lachie joined discord in 13/8/2024",
      "Did you know that Lion joined discord in 14/2/2024",
      "Did you know that Shimo joined discord in 13/5/2024",
      "Did you know that Shimo Dynasty was created in 13/5/2024"
    ];

    // Select a random fact
    const randomFact = facts[Math.floor(Math.random() * facts.length)];

    // Create an embed with the random fact
    const factEmbed = new EmbedBuilder()
      .setColor(0x3498DB) // Blue color
      .setTitle('**Did You Know?**')
      .setDescription(randomFact)
      .setTimestamp();

    // Send the embed in the channel where the command was executed
    message.reply({ embeds: [factEmbed] });
  },
};

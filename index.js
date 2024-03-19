const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const express = require('express'); // Import Express
const app = express(); 
require('dotenv').config();
const { prefix } = require('./prefix.json'); // Make sure to include this line

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildScheduledEvents
  ],
});

client.commands = new Collection();
const commandFolders = fs.readdirSync('./commands');

const startShitposting = require('./events/shitpost');
require('./events/reactionrole')(client);
require('./events/joinmessage')(client); 


for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});

// After setting up the client and commands...

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  startShitposting(client); // This starts the shitposting routine
  // The rest of your ready event code
});




// Existing client.once('ready') and client.on('messageCreate') handlers...


client.login(process.env.Token);

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

// Listen on the port (use process.env.PORT for compatibility with hosting providers)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
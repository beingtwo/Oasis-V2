const axios = require('axios');
const ms = require('ms');

module.exports = {
    name: 'announce',
    description: 'Schedule an announcement.',
    async execute(message, args) {
        // Permissions check (optional, for example, allowing only admins to use this command)
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('You do not have permission to use this command.');
        }

        // Extract delay and check if it's valid
        const delayArg = args.shift(); // Assuming the first argument is the delay
        const delay = ms(delayArg); // Convert to milliseconds
        if (!delay) {
            return message.reply('Please provide a valid delay. Example: `1h30m` for 1 hour and 30 minutes.');
        }

        // The rest of the arguments form the announcement message
        const announcement = args.join(' ');
        if (!announcement) {
            return message.reply('Please provide an announcement message.');
        }

        // Confirm the announcement scheduling
        message.reply(`Scheduling announcement in ${delayArg}: "${announcement}"`);

        // Set timeout to send the announcement after the specified delay
        setTimeout(() => {
            const webhookURL = 'https://discord.com/api/webhooks/1212611564981461012/e5exnXaBd-RzFlzmaiSY-2hhrWoWX23fAJJ7dHylMrhWCKOBpfMw39JZwArPuqMpfZ4X';
            // Including the role mention in the content
            const roleMention = `<@&1212619360871518300>`; // Modify this with your role ID
            axios.post(webhookURL, {
                content: `${roleMention} ${announcement}`, // Concatenate the role mention with the announcement
                username: 'Shimo Notify 🔔', // Optional: customize the webhook's username
                avatar_url: 'https://cdn.discordapp.com/attachments/1211517404161646642/1212639872599465994/announcement2-modified.png', // Optional: customize the webhook's avatar
            }).then(() => {
                console.log('Announcement sent successfully.');
            }).catch(error => {
                console.error('Error sending announcement:', error);
                // Optionally notify in the server that the announcement failed
            });
        }, delay);
    },
};

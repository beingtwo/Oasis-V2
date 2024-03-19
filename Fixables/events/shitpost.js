// shitpost.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function fetchRandomGif() {
    try {
        const response = await fetch(`https://g.tenor.com/v1/search?q=meme&key=LIVDSRZULELA&limit=50`);
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.results.length);
        return data.results[randomIndex].media[0].gif.url;
    } catch (error) {
        console.error('Failed to fetch GIF:', error);
        return 'Could not fetch a GIF at the moment.';
    }
}

function startShitposting(client, GIF_CHANNEL_ID = '1207696449551208479', FETCH_INTERVAL = 10000) {
    console.log('Starting shitpost routine.');
    setInterval(async () => {
        const gifUrl = await fetchRandomGif();
        const channel = await client.channels.fetch(GIF_CHANNEL_ID);
        channel.send(gifUrl);
    }, FETCH_INTERVAL);
}

module.exports = startShitposting;

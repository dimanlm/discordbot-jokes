const fs = require('fs')
const { CHUCK_TOKEN } = require("./data/config.json");
const { Client, Intents, Collection } = require('discord.js');

const chuckBot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//const prefix = '%';

/********************************************************/

chuckBot.commandsCollection = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const requestedCommand = require(`./commands/${file}`);
	chuckBot.commandsCollection.set(requestedCommand.name, requestedCommand);
}

/********************************************************/

chuckBot.on('ready', () => {
    console.log(`Logged in as ${chuckBot.user.tag}!`);
    chuckBot.user.setActivity('Chuck Norris movies', { type: 'WATCHING' }); // set a Status 
});

chuckBot.on('message', function(msg) {

    // find the prefix in prefix.json file
    let prefixes = JSON.parse(fs.readFileSync("./data/prefix.json"));
    // if the prefix.json file is empty, a default prefix will be used (%)
    if (!prefixes.PREFIX) {
        prefixes.PREFIX = '%';
        };
    let prefix = prefixes.PREFIX;
    
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;
  
    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift();

    if (!chuckBot.commandsCollection.has(command)) return;

    try {
        chuckBot.commandsCollection.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});


// login method to start the bot
chuckBot.login(CHUCK_TOKEN);
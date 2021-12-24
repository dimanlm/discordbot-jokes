const fs = require('fs')
const { CHUCK_TOKEN } = require("./data/config.json");
const { Client, Intents, Collection } = require('discord.js');

const chuckBot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const setPrefix = require('./utils/set-prefix.js');
const commands = require('./utils/get-commands.js');

/********************************************************/

// chuckBot.commandsCollection = new Collection();
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const requestedCommand = require(`./commands/${file}`);
// 	chuckBot.commandsCollection.set(requestedCommand.name, requestedCommand);
// }
commandCollection = commands.getAllCommands(chuckBot);
/********************************************************/

chuckBot.on('ready', () => {
    console.log(`Logged in as ${chuckBot.user.tag}!`);
    chuckBot.user.setActivity('Chuck Norris movies', { type: 'WATCHING' }); // set a Status 
});

chuckBot.on('message', function(msg) {
    
    const prefix = setPrefix.findPrefix(msg);

    if (msg.author.bot || !msg.content.startsWith(prefix)) return;
  
    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift();

    if (!commandCollection.has(command)) return;

    try {
        commandCollection.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});


// login method to start the bot
chuckBot.login(CHUCK_TOKEN);
const fs = require('fs')
const config = require("./config.json");

const { Client, Intents, Collection } = require('discord.js');
const chuckBot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const axios = require('axios')

const prefix = '--';

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
});

chuckBot.on('message', function(msg) {

    if (msg.author.bot ) return;
    //if (!msg.content.startsWith(prefix)) return;
  
    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    //console.info(`${command}`);
    if (!chuckBot.commandsCollection.has(command)) return;

    try {
        chuckBot.commandsCollection.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
  
    // if (command === "ping") {
    //     const timeTaken = Date.now() - msg.createdTimestamp;
    //     msg.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    // }

    // else if (command === "joke") {
    //     axios.get('http://api.icndb.com/jokes/random')
    //         .then( response => {console.log(response.data),
    //             msg.reply(response.data.value.joke)
    //         })
    //         .catch( error => console.log(error))
    // }

});



// login method to start the bot
chuckBot.login(config.CHUCK_TOKEN);
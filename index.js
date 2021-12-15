// const { Discord, Client, Intents } = require("discord.js");
const config = require("./config.json");

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const axios = require('axios')

const prefix = '--';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', function(msg) {

    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
  
    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
  
    if (command === "ping") {
        const timeTaken = Date.now() - msg.createdTimestamp;
        msg.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    
    }else if (command === "joke") {
        axios.get('http://api.icndb.com/jokes/random')
            .then( response => {console.log(response.data),
                msg.reply(response.data.value.joke)
            })
            .catch( error => console.log(error))
    }

});



// login method to start the bot
client.login(config.CHUCK_TOKEN);


const fs = require('fs')
const setPrefix = require('./set-prefix.js');
const { Collection } = require('discord.js');

module.exports = {

    getAllCommands: function(bot) {
        bot.commandsCollection = new Collection();
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const requestedCommand = require(`../commands/${file}`);
            bot.commandsCollection.set(requestedCommand.name, requestedCommand);
        }
        return (bot.commandsCollection)
    },

    helpCommand: function (client) {
        let helpMsg = ' ';
        const prefix = setPrefix.findPrefix(client);
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const requestedCommand = require(`../commands/${file}`);
            helpMsg = helpMsg + '**'+ prefix + requestedCommand.name + '** ' + requestedCommand.description + '\n'; 
        }
        return helpMsg;
    }
}
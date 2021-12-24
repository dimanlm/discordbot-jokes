var translate = require('../utils/translate');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'lang',
    description: 'The user can set a language in which he wants to see the jokes.',
    execute(msg, args) {
        // // check if the user has enough permissions to change the prefix
        // if(!msg.member.permissions.has("MANAGE_SERVER")) return msg.reply("You don't have enough permissions to change the prefix");
        if (!args[0]){
            return (translate.getAvailableLanguages(msg));
        }

        let language = JSON.parse(fs.readFileSync("./data/language.json"));

        // modify the old values with the new ones and write them into the json file.
        language[msg.guild.id] = {
            language: args[0]
        };
        // write the new language into the json file.
        fs.writeFile("./data/language.json", JSON.stringify(language), (err) => {
            if (err) console.log(err);
        })
        
        msg.reply(`The language has been set to **${(args[0])}**`)
    }
}
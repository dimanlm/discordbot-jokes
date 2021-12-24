const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'setlang',
    description: 'A user can set a language for the jokes.',
    execute(msg, args) {
        // // check if the user has enough permissions to change the prefix
        // if(!msg.member.permissions.has("MANAGE_SERVER")) return msg.reply("You don't have enough permissions to change the prefix");

        // write the new language into the json file.
        fs.writeFile("./data/language.json", JSON.stringify({ "LANG" : args[0] }), (err) => {
            if (err) console.log(err);
        })

        msg.reply(`The language has been set to **${(args[0])}**`)
    }
}
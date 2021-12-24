const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'prefix',
    description: '**[prefix]** : Lets the server admin to change the prefix.',
    execute(msg, args) {
        // // check if the user has enough permissions to change the prefix
        // if(!msg.member.permissions.has("MANAGE_SERVER")) return msg.reply("You don't have enough permissions to change the prefix");

        // open and read the prefix.json file
        let prefixes = JSON.parse(fs.readFileSync("./data/prefix.json"));

        // modify the old values with the new ones and write them into the json file.
        if (args[0] !== undefined){
            prefixes[msg.guild.id] = {
                prefix: args[0]
            };
            
            fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), (err) => {
                if (err) console.log(err);
            })
            msg.reply(`The prefix has been set to ${(args[0])}`)
        }
    }
}
const fs = require('fs')

module.exports = {

    findPrefix: function (client) {

        // find the prefix in prefix.json file
        let prefixes = JSON.parse(fs.readFileSync("./data/prefix.json"));
        // if the prefix.json file is empty, a default prefix will be used (%)
        if (!prefixes[client.guild.id]){
            prefixes[client.guild.id] = {
                prefix: '%'
            };
        }
        return(prefixes[client.guild.id].prefix);
    }

}
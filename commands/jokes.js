const axios = require('axios')

module.exports = {
    name: 'joke',
    description: 'Fetching a joke',
    execute(msg, args) {

        switch (typeof(args[0])) {

            case 'string':
                const argValue = parseInt(args[0]);
                if (Number.isNaN(argValue)){
                    axios.get('http://api.icndb.com/jokes/random?limitTo=[' +args[0]+ ']')
                        .then( response => {
                            if (response.data.value.joke===undefined){
                                msg.reply('**' + args[0] + '** category does not exist! \nUse `jokeCategories` command to see the list of categories');
                            }else{
                                msg.reply('**' + args[0] + '** joke: ' + response.data.value.joke)}
                        })
                        .catch( error => console.log(error));
                }else{
                    axios.get('http://api.icndb.com/jokes/' + argValue)
                        .then( response => {
                            if (response.data.value.joke===undefined){
                                msg.reply('Joke number **' + args[0] + '** does not exist! \nUse `jokeCount` command to see the how many jokes there are');
                            }else{
                                msg.reply('Joke n**' + args[0] + '**: ' + response.data.value.joke)
                            }
                        })
                        .catch( error => console.log(error));
                }

                break;

            default:
                axios.get('http://api.icndb.com/jokes/random')
                    .then( response => {
                        msg.reply(response.data.value.joke)
                    })
                    .catch( error => console.log(error));
                break;
        }
    }   
    
};
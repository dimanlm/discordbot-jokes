const axios = require('axios')

module.exports = {
    name: 'joke',
    description: 'Fetching a joke',
    execute(msg, args) {

        switch (typeof(args[0])) {

            case 'string':
                axios.get('http://api.icndb.com/jokes/random?limitTo=[' +args[0]+ ']')
                    .then( response => {
                        if (response.data.value.joke===undefined){
                            msg.reply('**' + args[0] + '** category does not exist! \nUse `jokeCategories` command to see the list of categories');
                        }else{
                        msg.reply('**' + args[0] + '** joke: ' + response.data.value.joke)}
                    })
                    .catch( error => console.log(error));
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
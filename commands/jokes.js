var translate = require('../utils/translate');
const axios = require('axios');


module.exports = {
    name: 'joke',
    description: '*(optional category or id)* : Fetching a random joke if no arguments are given',
    execute(msg, args) {

        switch (typeof(args[0])) {

            case 'string':
                const argValue = parseInt(args[0]); // coverts the argument to a number
                var messageReply = 'hi';
                // if the argument equals NaN, then the argument is a category
                if (Number.isNaN(argValue)){
                    axios.get('http://api.icndb.com/jokes/random?limitTo=[' +args[0]+ ']')
                        .then( response => {
                            if (response.data.value.joke===undefined){
                                messageReply = ('**' + args[0] + '** category does not exist! \nUse `jokeCategories` command to see the list of categories');
                            }else{
                                response.data.value.joke.replace(/(&quot\;)/g,"\"")
                                messageReply = '**' + args[0] + ' joke**: ' + response.data.value.joke; // fetches a joke from 'args' category
                            }
                            translate.msgTranslation(msg, messageReply);
                        })
                        .catch( error => console.log(error));
                // if the argument equals an integer, then the argument is a joke's id
                }else{
                    axios.get('http://api.icndb.com/jokes/' + argValue)
                        .then( response => {
                            if (response.data.value.joke===undefined){
                                messageReply = ('Joke number **' + args[0] + '** does not exist! \nUse `jokeCount` command to see the how many jokes there are');
                            }else{
                                response.data.value.joke.replace(/(&quot\;)/g,"\"")
                                messageReply = 'Joke n**' + args[0] + '**: ' + response.data.value.joke; // fetches the joke number 'args' (index)
                            }
                            translate.msgTranslation(msg, messageReply);
                        })
                        .catch( error => console.log(error));
                }
                break;

            default:
                // By default, the command 'joke' without any argument, fetches a random joke from the db
                axios.get('http://api.icndb.com/jokes/random')
                    .then( response => {
                        response.data.value.joke.replace(/(&quot\;)/g,"\"")
                        let messageReply = ("A random joke: " + response.data.value.joke)
                        translate.msgTranslation(msg, messageReply);
                    })
                    .catch( error => console.log(error));
                break;
        }
    }   
    
};
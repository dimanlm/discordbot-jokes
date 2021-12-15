const axios = require('axios')

module.exports = {
    name: 'joke',
    description: 'Fetching a random joke',
    execute(msg, args) {
        axios.get('http://api.icndb.com/jokes/random')
            .then( response => {
                console.log(response.data),
                msg.reply(response.data.value.joke)
            })
            .catch( error => console.log(error))
    }
};
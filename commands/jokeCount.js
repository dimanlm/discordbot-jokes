const axios = require('axios')

module.exports = {
    name: 'jokeCount',
    description: ': Fetches the number of jokes',
    execute(msg, args) {
        axios.get('http://api.icndb.com/jokes/count')
            .then( response => {
                msg.reply('There are ' + response.data.value + ' jokes')
            })
            .catch( error => console.log(error))
    }
};
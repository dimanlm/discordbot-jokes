const axios = require('axios')

module.exports = {
    name: 'jokeCategories',
    description: ': Fetches the list of joke categories',
    execute(msg, args) {
        axios.get('http://api.icndb.com/categories')
            .then( response => {
                console.log(response.data),
                msg.reply('List of joke categories: `' + response.data.value + '`')
            })
            .catch( error => console.log(error))
    }
};